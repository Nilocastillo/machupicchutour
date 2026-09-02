# Machu Picchu Tours

Astro 7 website deployed as a hybrid Cloudflare Worker:

- Home, contact, blog and tour pages are prerendered as static assets.
- The custom 404 and `/api/contact` are rendered by Cloudflare Workers.
- The contact form is a Preact island and sends email through Resend.

## Local setup

```sh
bun install
cp .env.example .dev.vars
```

Replace the example values in `.dev.vars`. The sender address must use a domain verified in Resend.

## Commands

| Command | Action |
| :-- | :-- |
| `bun run dev` | Start Astro development using the Cloudflare runtime |
| `bun run check` | Run Astro and TypeScript diagnostics |
| `bun run build` | Check and build the static assets and Worker |
| `bun run preview` | Preview the production build with `workerd` |
| `bun run cf-typegen` | Regenerate Cloudflare binding and runtime types |
| `bun run deploy` | Deploy the latest build with Wrangler |

## Cloudflare secrets

The site can be deployed before Resend is configured. To enable email delivery from the contact form, add these production secrets:

```sh
bunx wrangler secret put RESEND_API_KEY
bunx wrangler secret put CONTACT_FROM_EMAIL
bunx wrangler secret put CONTACT_TO_EMAIL
```

Build and deploy at any time with:

```sh
bun run build
bun run deploy
```

For Cloudflare Workers Builds, use:

- Build command: `bun run build`
- Deploy command: `bun run deploy`
- Production branch: `main`
- Optional build variable: `BUN_VERSION=1.4.0`

The Worker configuration lives in `wrangler.jsonc`. Do not commit `.dev.vars`, `.env` files or `.wrangler` deployment metadata.
