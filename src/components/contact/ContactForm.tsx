import { useState } from 'preact/hooks';
import type { TargetedSubmitEvent } from 'preact';

const interests = [
	'Machu Picchu',
	'Inca Trail',
	'Sacred Valley',
	'Local culture',
	'Amazon',
	'Custom journey',
];

const travelStyles = [
	'Private journey',
	'Small group tour',
	'Trekking adventure',
	'Family trip',
	'Honeymoon',
	'Not sure yet',
];

const labelClass = 'mb-2 block text-[0.62rem] font-extrabold tracking-[0.035em] text-ink/75 [&>span]:text-sun';
const inputClass = 'min-h-[3.25rem] w-full rounded-[0.9rem] border border-ink/12 bg-white/[0.54] px-4 py-[0.9rem] font-sans text-[0.78rem] text-ink outline-none transition-[border-color,background-color,box-shadow] duration-200 placeholder:text-ink/35 focus:border-sun focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,26,0,0.08)] aria-invalid:border-sun motion-reduce:transition-none';
const errorClass = 'mt-2 text-[0.58rem] font-bold leading-[1.4] text-[#c91603]';

interface FormState {
	name: string;
	email: string;
	whatsapp: string;
	country: string;
	travelStyle: string;
	travelMonth: string;
	travelers: string;
	interests: string[];
	message: string;
	consent: boolean;
	company: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;
type SubmissionState = 'idle' | 'sending' | 'sent' | 'error' | 'not-configured';

const initialForm: FormState = {
	name: '',
	email: '',
	whatsapp: '',
	country: '',
	travelStyle: '',
	travelMonth: '',
	travelers: '2',
	interests: [],
	message: '',
	consent: false,
	company: '',
};

export default function ContactForm() {
	const [form, setForm] = useState<FormState>(initialForm);
	const [errors, setErrors] = useState<FormErrors>({});
	const [submission, setSubmission] = useState<SubmissionState>('idle');
	const [fallbackUrl, setFallbackUrl] = useState('');

	function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
		setForm((current) => ({ ...current, [key]: value }));
		if (submission !== 'idle') setSubmission('idle');
		if (!errors[key]) return;
		setErrors((current) => {
			const next = { ...current };
			delete next[key];
			return next;
		});
	}

	function toggleInterest(interest: string) {
		const next = form.interests.includes(interest)
			? form.interests.filter((item) => item !== interest)
			: [...form.interests, interest];
		updateField('interests', next);
	}

	function validate() {
		const nextErrors: FormErrors = {};
		if (form.name.trim().length < 2) nextErrors.name = 'Please enter your full name.';
		if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Enter a valid email address.';
		if (form.whatsapp.replace(/\D/g, '').length < 7) nextErrors.whatsapp = 'Include a valid WhatsApp number.';
		if (!form.travelStyle) nextErrors.travelStyle = 'Choose the kind of trip you have in mind.';
		if (!form.travelMonth) nextErrors.travelMonth = 'Tell us when you would like to travel.';
		const travelers = Number(form.travelers);
		if (!Number.isInteger(travelers) || travelers < 1 || travelers > 30) nextErrors.travelers = 'Enter between 1 and 30 travelers.';
		if (form.message.trim().length < 20) nextErrors.message = 'Share at least a few details about your ideal trip.';
		if (!form.consent) nextErrors.consent = 'Please confirm that we may contact you about this request.';
		return nextErrors;
	}

	async function handleSubmit(event: TargetedSubmitEvent<HTMLFormElement>) {
		event.preventDefault();
		setSubmission('idle');
		const nextErrors = validate();

		if (Object.keys(nextErrors).length > 0) {
			setErrors(nextErrors);
			const firstField = Object.keys(nextErrors)[0];
			requestAnimationFrame(() => {
				document.getElementById(`contact-${firstField}`)?.focus();
			});
			return;
		}

		const lines = [
			'Hello Machu Picchu Tours! I would like help planning my Peru journey.',
			'',
			`Name: ${form.name.trim()}`,
			`Email: ${form.email.trim()}`,
			`WhatsApp: ${form.whatsapp.trim()}`,
			form.country.trim() ? `Country: ${form.country.trim()}` : null,
			`Travel style: ${form.travelStyle}`,
			`When: ${form.travelMonth}`,
			`Travelers: ${form.travelers}`,
			form.interests.length ? `Interests: ${form.interests.join(', ')}` : null,
			'',
			`Trip idea: ${form.message.trim()}`,
		].filter((line): line is string => line !== null);

		const url = `https://wa.me/51925422602?text=${encodeURIComponent(lines.join('\n'))}`;
		setFallbackUrl(url);
		setSubmission('sending');

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					...form,
					name: form.name.trim(),
					email: form.email.trim(),
					whatsapp: form.whatsapp.trim(),
					country: form.country.trim(),
					message: form.message.trim(),
					travelers: Number(form.travelers),
				}),
			});
			const result = await response.json().catch(() => ({})) as { code?: string };

			if (response.ok) {
				setSubmission('sent');
				return;
			}

			setSubmission(result.code === 'EMAIL_NOT_CONFIGURED' ? 'not-configured' : 'error');
		} catch {
			setSubmission('error');
		}
	}

	const showStatus = submission !== 'idle' && submission !== 'sending';
	const failed = submission === 'error' || submission === 'not-configured';

	return (
		<div class="overflow-hidden rounded-[2rem] border border-ink/10 bg-paper text-ink shadow-[0_34px_90px_rgba(0,0,0,0.2)]">
			<div class="flex flex-col items-start gap-4 border-b border-ink/10 px-5 py-6 min-[421px]:flex-row min-[421px]:items-end min-[421px]:justify-between sm:px-8 sm:pt-8 sm:pb-6">
				<div>
					<p class="text-[0.58rem] font-extrabold tracking-[0.17em] text-ink/48 uppercase">Your trip brief</p>
					<h2 class="mt-2 font-display text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[0.95] tracking-[-0.045em]">Let’s shape your route.</h2>
				</div>
				<span class="shrink-0 rounded-full border border-ink/12 px-3.5 py-2.5 text-[0.54rem] font-extrabold tracking-[0.12em] text-ink/48 uppercase">About 3 min</span>
			</div>

			<form class="relative p-5 sm:p-8" onSubmit={handleSubmit} noValidate aria-busy={submission === 'sending'}>
				<div class="absolute -left-[9999px] size-px overflow-hidden" aria-hidden="true">
					<label for="contact-company">Company website</label>
					<input id="contact-company" name="company" type="text" value={form.company} onInput={(event) => updateField('company', event.currentTarget.value)} tabindex={-1} autocomplete="off" />
				</div>

				<div class="grid grid-cols-1 gap-x-4 gap-y-6 min-[701px]:grid-cols-2">
					<div class="min-w-0">
						<label class={labelClass} for="contact-name">Full name <span aria-hidden="true">*</span></label>
						<input
							class={inputClass}
							id="contact-name"
							name="name"
							type="text"
							value={form.name}
							onInput={(event) => updateField('name', event.currentTarget.value)}
							autocomplete="name"
							placeholder="Your name"
							aria-invalid={Boolean(errors.name)}
							aria-describedby={errors.name ? 'contact-name-error' : undefined}
						/>
						{errors.name && <p class={errorClass} id="contact-name-error">{errors.name}</p>}
					</div>

					<div class="min-w-0">
						<label class={labelClass} for="contact-email">Email <span aria-hidden="true">*</span></label>
						<input
							class={inputClass}
							id="contact-email"
							name="email"
							type="email"
							value={form.email}
							onInput={(event) => updateField('email', event.currentTarget.value)}
							autocomplete="email"
							inputMode="email"
							placeholder="you@example.com"
							aria-invalid={Boolean(errors.email)}
							aria-describedby={errors.email ? 'contact-email-error' : undefined}
						/>
						{errors.email && <p class={errorClass} id="contact-email-error">{errors.email}</p>}
					</div>

					<div class="min-w-0">
						<label class={labelClass} for="contact-whatsapp">WhatsApp <span aria-hidden="true">*</span></label>
						<input
							class={inputClass}
							id="contact-whatsapp"
							name="whatsapp"
							type="tel"
							value={form.whatsapp}
							onInput={(event) => updateField('whatsapp', event.currentTarget.value)}
							autocomplete="tel"
							inputMode="tel"
							placeholder="+1 234 567 890"
							aria-invalid={Boolean(errors.whatsapp)}
							aria-describedby={errors.whatsapp ? 'contact-whatsapp-error' : undefined}
						/>
						{errors.whatsapp && <p class={errorClass} id="contact-whatsapp-error">{errors.whatsapp}</p>}
					</div>

					<div class="min-w-0">
						<label class={labelClass} for="contact-country">Country</label>
						<input
							class={inputClass}
							id="contact-country"
							name="country"
							type="text"
							value={form.country}
							onInput={(event) => updateField('country', event.currentTarget.value)}
							autocomplete="country-name"
							placeholder="Where are you traveling from?"
						/>
					</div>

					<div class="min-w-0">
						<label class={labelClass} for="contact-travelStyle">Travel style <span aria-hidden="true">*</span></label>
						<div class="relative">
							<select
								class={`${inputClass} appearance-none pr-11`}
								id="contact-travelStyle"
								name="travelStyle"
								value={form.travelStyle}
								onChange={(event) => updateField('travelStyle', event.currentTarget.value)}
								aria-invalid={Boolean(errors.travelStyle)}
								aria-describedby={errors.travelStyle ? 'contact-travelStyle-error' : undefined}
							>
								<option value="">Choose one</option>
								{travelStyles.map((style) => <option value={style}>{style}</option>)}
							</select>
							<span class="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink/44" aria-hidden="true">⌄</span>
						</div>
						{errors.travelStyle && <p class={errorClass} id="contact-travelStyle-error">{errors.travelStyle}</p>}
					</div>

					<div class="grid min-w-0 grid-cols-1 gap-3 min-[421px]:grid-cols-[minmax(0,1.35fr)_minmax(6rem,0.65fr)]">
						<div class="min-w-0">
							<label class={labelClass} for="contact-travelMonth">Travel month <span aria-hidden="true">*</span></label>
							<input
								class={inputClass}
								id="contact-travelMonth"
								name="travelMonth"
								type="month"
								value={form.travelMonth}
								onInput={(event) => updateField('travelMonth', event.currentTarget.value)}
								aria-invalid={Boolean(errors.travelMonth)}
								aria-describedby={errors.travelMonth ? 'contact-travelMonth-error' : undefined}
							/>
							{errors.travelMonth && <p class={errorClass} id="contact-travelMonth-error">{errors.travelMonth}</p>}
						</div>
						<div class="min-w-0">
							<label class={labelClass} for="contact-travelers">Travelers <span aria-hidden="true">*</span></label>
							<input
								class={inputClass}
								id="contact-travelers"
								name="travelers"
								type="number"
								min="1"
								max="30"
								value={form.travelers}
								onInput={(event) => updateField('travelers', event.currentTarget.value)}
								aria-invalid={Boolean(errors.travelers)}
								aria-describedby={errors.travelers ? 'contact-travelers-error' : undefined}
							/>
							{errors.travelers && <p class={errorClass} id="contact-travelers-error">{errors.travelers}</p>}
						</div>
					</div>
				</div>

				<fieldset class="mt-7 border-0 border-t border-ink/10 pt-6">
					<legend class="text-[0.62rem] font-extrabold tracking-[0.035em] text-ink/75">What would you love to experience?</legend>
					<p class="mt-1 text-[0.62rem] text-ink/45">Select as many as you like.</p>
					<div class="mt-4 flex flex-wrap gap-2">
						{interests.map((interest) => {
							const selected = form.interests.includes(interest);
							return (
								<button
									type="button"
									class={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-3 font-sans text-[0.59rem] font-[750] transition duration-200 motion-reduce:transition-none ${selected ? 'border-ink bg-ink text-white' : 'border-ink/12 bg-transparent text-ink/68 hover:border-ink/35 hover:text-ink focus-visible:border-ink/35 focus-visible:text-ink'}`}
									onClick={() => toggleInterest(interest)}
									aria-pressed={selected}
								>
									<span class={`grid size-4 place-items-center rounded-full text-[0.6rem] ${selected ? 'bg-sun text-white' : 'bg-ink/7'}`} aria-hidden="true">{selected ? '✓' : '+'}</span>
									{interest}
								</button>
							);
						})}
					</div>
				</fieldset>

				<div class="mt-6 min-w-0">
					<label class={labelClass} for="contact-message">Tell us about your ideal trip <span aria-hidden="true">*</span></label>
					<textarea
						class={`${inputClass} min-h-[9.5rem] resize-y leading-[1.65]`}
						id="contact-message"
						name="message"
						rows={5}
						value={form.message}
						onInput={(event) => updateField('message', event.currentTarget.value)}
						placeholder="Places on your list, pace, hotel style, special occasions or anything else we should know..."
						aria-invalid={Boolean(errors.message)}
						aria-describedby={errors.message ? 'contact-message-error' : 'contact-message-help'}
					/>
					<div class="mt-2 flex flex-col items-start gap-1 text-[0.54rem] leading-[1.45] text-ink/42 min-[421px]:flex-row min-[421px]:justify-between min-[421px]:gap-4">
						{errors.message ? <p class="font-bold text-[#c91603]" id="contact-message-error">{errors.message}</p> : <p id="contact-message-help">A little context helps us give you a more useful first reply.</p>}
						<span class="shrink-0">{form.message.length} characters</span>
					</div>
				</div>

				<label class="mt-5 flex cursor-pointer items-start gap-3 text-[0.61rem] font-semibold leading-[1.55] text-ink/56" for="contact-consent">
					<input
						class="peer sr-only"
						id="contact-consent"
						name="consent"
						type="checkbox"
						checked={form.consent}
						onChange={(event) => updateField('consent', event.currentTarget.checked)}
						aria-invalid={Boolean(errors.consent)}
						aria-describedby={errors.consent ? 'contact-consent-error' : undefined}
					/>
					<span class="grid size-5 shrink-0 place-items-center rounded-[0.35rem] border border-ink/20 bg-white text-[0.65rem] text-transparent transition duration-200 peer-checked:border-sun peer-checked:bg-sun peer-checked:text-white peer-focus-visible:ring-3 peer-focus-visible:ring-sun/15 motion-reduce:transition-none" aria-hidden="true">✓</span>
					<span>I agree that Machu Picchu Tours may contact me about this trip request.</span>
				</label>
				{errors.consent && <p class={`${errorClass} ml-8`} id="contact-consent-error">{errors.consent}</p>}

				<div class="mt-7 flex flex-col items-stretch gap-4 border-t border-ink/10 pt-6 min-[701px]:flex-row min-[701px]:items-center min-[701px]:gap-5">
					<button class="group inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-4 rounded-full border-0 bg-sun py-4 pr-5 pl-6 font-sans text-[0.62rem] font-extrabold tracking-[0.11em] text-white uppercase shadow-[0_14px_34px_rgba(255,26,0,0.2)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(255,26,0,0.3)] disabled:cursor-wait disabled:opacity-70 disabled:shadow-none disabled:hover:translate-y-0 min-[701px]:w-auto motion-reduce:transition-none" type="submit" disabled={submission === 'sending'}>
						<span>{submission === 'sending' ? 'Sending your request…' : 'Send my trip request'}</span>
						<svg class="size-[1.1rem] transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" viewBox="0 0 18 18" fill="none">
							<path d="M3.5 9h10M9.8 5.2 13.6 9l-3.8 3.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</button>
					<p class="text-center text-[0.53rem] leading-[1.55] text-ink/40 min-[701px]:max-w-56 min-[701px]:text-left">Your request is sent securely to our local team. We never publish or sell your details.</p>
				</div>

				<div class={showStatus ? `mt-4 flex items-start gap-3 rounded-[0.9rem] border p-4 text-[0.62rem] leading-[1.55] ${failed ? 'border-[#a04b1d]/15 bg-[#f7eadc] text-[#8a431d]' : 'border-[#3f6f30]/15 bg-[#eaf4e5] text-[#315c26]'}` : 'hidden'} aria-live="polite">
					{submission === 'sent' && (
						<>
							<span class="grid size-5 shrink-0 place-items-center rounded-full bg-[#3f6f30] text-[0.58rem] text-white" aria-hidden="true">✓</span>
							<p>Your request is on its way. A local travel expert will reply to <strong>{form.email}</strong>.</p>
						</>
					)}
					{submission === 'not-configured' && (
						<>
							<span class="grid size-5 shrink-0 place-items-center rounded-full bg-[#a04b1d] text-[0.58rem] text-white" aria-hidden="true">!</span>
							<p>Email delivery is not configured yet. You can still <a class="font-extrabold underline underline-offset-2" href={fallbackUrl} target="_blank" rel="noreferrer">send this trip brief through WhatsApp</a>.</p>
						</>
					)}
					{submission === 'error' && (
						<>
							<span class="grid size-5 shrink-0 place-items-center rounded-full bg-[#a04b1d] text-[0.58rem] text-white" aria-hidden="true">!</span>
							<p>We could not send the email right now. Please try again or <a class="font-extrabold underline underline-offset-2" href={fallbackUrl} target="_blank" rel="noreferrer">continue through WhatsApp</a>.</p>
						</>
					)}
				</div>
			</form>
		</div>
	);
}
