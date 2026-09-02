import type { APIRoute } from 'astro';
import { CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL, RESEND_API_KEY } from 'astro:env/server';
import { Resend } from 'resend';

export const prerender = false;

interface ContactPayload {
	name?: unknown;
	email?: unknown;
	whatsapp?: unknown;
	country?: unknown;
	travelStyle?: unknown;
	travelMonth?: unknown;
	travelers?: unknown;
	interests?: unknown;
	message?: unknown;
	consent?: unknown;
	company?: unknown;
}

function json(body: Record<string, unknown>, status = 200) {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Cache-Control': 'no-store',
		},
	});
}

function isText(value: unknown, min = 1, max = 200): value is string {
	return typeof value === 'string' && value.trim().length >= min && value.trim().length <= max;
}

function escapeHtml(value: string) {
	return value.replace(/[&<>'"]/g, (character) => ({
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		"'": '&#39;',
		'"': '&quot;',
	})[character] ?? character);
}

export const POST: APIRoute = async ({ request }) => {
	const contentLength = Number(request.headers.get('content-length') ?? 0);
	if (contentLength > 25_000) return json({ ok: false, code: 'PAYLOAD_TOO_LARGE' }, 413);

	let payload: ContactPayload;
	try {
		payload = await request.json();
	} catch {
		return json({ ok: false, code: 'INVALID_JSON' }, 400);
	}

	// Honeypot: return a neutral success response so automated senders receive no signal.
	if (isText(payload.company)) return json({ ok: true });

	const validEmail = typeof payload.email === 'string' && /^\S+@\S+\.\S+$/.test(payload.email);
	const validPhone = typeof payload.whatsapp === 'string' && payload.whatsapp.replace(/\D/g, '').length >= 7;
	const travelerCount = Number(payload.travelers);
	const validInterests = Array.isArray(payload.interests)
		&& payload.interests.length <= 10
		&& payload.interests.every((interest) => isText(interest, 1, 80));

	if (
		!isText(payload.name, 2, 100)
		|| !validEmail
		|| !validPhone
		|| (payload.country !== '' && !isText(payload.country, 1, 100))
		|| !isText(payload.travelStyle, 2, 100)
		|| typeof payload.travelMonth !== 'string'
		|| !/^\d{4}-\d{2}$/.test(payload.travelMonth)
		|| !Number.isInteger(travelerCount)
		|| travelerCount < 1
		|| travelerCount > 30
		|| !validInterests
		|| !isText(payload.message, 20, 4_000)
		|| payload.consent !== true
	) {
		return json({ ok: false, code: 'VALIDATION_ERROR' }, 400);
	}

	if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL || !CONTACT_TO_EMAIL) {
		return json({ ok: false, code: 'EMAIL_NOT_CONFIGURED' }, 503);
	}

	const name = payload.name.trim();
	const email = String(payload.email).trim();
	const whatsapp = String(payload.whatsapp).trim();
	const country = typeof payload.country === 'string' ? payload.country.trim() : '';
	const travelStyle = payload.travelStyle.trim();
	const travelMonth = payload.travelMonth;
	const interests = payload.interests as string[];
	const message = payload.message.trim();

	const plainText = [
		'New Peru trip request',
		'',
		`Name: ${name}`,
		`Email: ${email}`,
		`WhatsApp: ${whatsapp}`,
		country ? `Country: ${country}` : null,
		`Travel style: ${travelStyle}`,
		`Travel month: ${travelMonth}`,
		`Travelers: ${travelerCount}`,
		interests.length ? `Interests: ${interests.join(', ')}` : null,
		'',
		message,
	].filter((line): line is string => line !== null).join('\n');

	const detailRows = [
		['Name', name],
		['Email', email],
		['WhatsApp', whatsapp],
		['Country', country || 'Not provided'],
		['Travel style', travelStyle],
		['Travel month', travelMonth],
		['Travelers', String(travelerCount)],
		['Interests', interests.length ? interests.join(', ') : 'Not selected'],
	];

	const html = `
		<!doctype html>
		<html lang="en">
			<body style="margin:0;background:#f4f4f2;color:#151916;font-family:Arial,sans-serif;padding:32px 16px;">
				<div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e5e5e1;border-radius:20px;overflow:hidden;">
					<div style="background:#151916;color:#ffffff;padding:28px 32px;">
						<p style="margin:0 0 8px;color:#ff6a59;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">New trip brief</p>
						<h1 style="margin:0;font-size:28px;line-height:1.15;">A new traveler is ready to explore Peru.</h1>
					</div>
					<div style="padding:28px 32px;">
						<table role="presentation" style="width:100%;border-collapse:collapse;">
							${detailRows.map(([label, value]) => `<tr><td style="width:130px;padding:10px 0;border-bottom:1px solid #eeeeea;color:#777b78;font-size:12px;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:10px 0;border-bottom:1px solid #eeeeea;font-size:13px;font-weight:700;vertical-align:top;">${escapeHtml(value)}</td></tr>`).join('')}
						</table>
						<div style="margin-top:24px;padding:22px;background:#f4f4f2;border-radius:14px;">
							<p style="margin:0 0 10px;color:#777b78;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Their trip idea</p>
							<p style="margin:0;white-space:pre-wrap;font-size:14px;line-height:1.7;">${escapeHtml(message)}</p>
						</div>
					</div>
				</div>
			</body>
		</html>
	`;

	try {
		const resend = new Resend(RESEND_API_KEY);
		const { data, error } = await resend.emails.send({
			from: CONTACT_FROM_EMAIL,
			to: [CONTACT_TO_EMAIL],
			replyTo: email,
			subject: `New Peru trip request from ${name}`,
			text: plainText,
			html,
		});

		if (error) {
			console.error('[contact] Resend rejected the message:', error.name, error.message);
			return json({ ok: false, code: 'DELIVERY_ERROR' }, 502);
		}

		return json({ ok: true, id: data?.id });
	} catch (error) {
		console.error('[contact] Unexpected email delivery error:', error instanceof Error ? error.message : 'Unknown error');
		return json({ ok: false, code: 'DELIVERY_ERROR' }, 502);
	}
};
