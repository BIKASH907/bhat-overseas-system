# Bhat Overseas — Recruitment Website

A modern, multilingual recruitment website for **Bhat Overseas Pvt Ltd**, a government-licensed Nepali recruitment agency placing workers in **Turkey, Romania, and Austria**.

Built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS + MongoDB**.

## Features

- Mobile-responsive, SEO-optimized public site (Home, Jobs, Apply, Countries, About, Contact)
- Job listings with filters: country, type, salary
- Application form with CV upload
- Inquiry form on Contact page
- WhatsApp floating chat button
- Multilingual: **English, Turkish, German** (toggle in header)
- Password-protected admin panel
  - Add / edit / delete jobs
  - View all applications + inquiries
  - View uploaded CVs
- MongoDB-backed (with seed-data fallback so the site works even before DB is configured)

## Local development

### Prerequisites

- Node.js 18.17+ (or 20+)
- A MongoDB database — easiest path is a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Copy env template and fill in values
cp .env.example .env.local
# then edit .env.local and set MONGODB_URI, ADMIN_PASSWORD, JWT_SECRET, etc.

# 3. (Optional) Seed the database with the sample jobs
npm run seed

# 4. Run the dev server
npm run dev
```

The site is now at **http://localhost:3000**.
The admin panel is at **http://localhost:3000/admin** — log in with the credentials from `.env.local`.

> ⚠️ Without MONGODB_URI set, the site will still work and show seed jobs from `lib/seed-jobs.ts`, but **applications will not be stored** (they are only logged to the server console).

## Environment variables

See `.env.example` for the full list. Key variables:

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string (Atlas SRV URI is fine) |
| `ADMIN_EMAIL` | Email used to log into `/admin` |
| `ADMIN_PASSWORD` | Password used to log into `/admin` — **change before deploying** |
| `JWT_SECRET` | Random string ≥ 32 chars used to sign admin auth cookies |
| `NEXT_PUBLIC_WHATSAPP` | WhatsApp number (international, no `+`) — used by the floating button |
| `NEXT_PUBLIC_PHONE` | Public phone number shown in header/footer/contact |
| `NEXT_PUBLIC_EMAIL` | Public email shown on the site |
| `NEXT_PUBLIC_ADDRESS` | Office address shown on the site |
| `NEXT_PUBLIC_SITE_URL` | Your live domain (used for SEO and OG tags) |

## Deploy to Vercel (recommended)

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com), click **Add New → Project**, and import your GitHub repo.
3. In the Vercel project's **Environment Variables** tab, add every variable from `.env.example` (use real values from your MongoDB Atlas account and a strong admin password).
4. Click **Deploy**. Vercel handles build, hosting, SSL, and global CDN automatically.
5. After deploy, visit `https://your-app.vercel.app/admin` and log in.

### MongoDB Atlas setup (one-time, free)

1. Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas/register).
2. Database Access → add a user with read/write privileges.
3. Network Access → add `0.0.0.0/0` (allow from anywhere) — required for Vercel.
4. Database → Connect → Drivers → copy the connection string. Replace `<password>` with the user password and append `/bhat_overseas` as the database name.
5. Paste this string as `MONGODB_URI` in Vercel's environment variables.

## Project structure

```
.
├── app/
│   ├── layout.tsx           Root layout, header, footer
│   ├── page.tsx             Home
│   ├── jobs/                Jobs list + dynamic detail [id]
│   ├── apply/               Application form
│   ├── countries/           Country info
│   ├── about/
│   ├── contact/
│   ├── admin/               Login + dashboard
│   └── api/
│       ├── jobs/            GET (list) + POST (admin create) + [id]
│       ├── applications/    POST (public submit) + GET (admin list)
│       └── admin/auth/      POST login + DELETE logout, GET /me
├── components/              Header, Footer, JobCard, WhatsAppButton
├── lib/
│   ├── i18n.tsx             React context for language
│   ├── translations.ts      EN / TR / DE strings
│   ├── seed-jobs.ts         Sample job data + country info
│   ├── mongodb.ts           Cached mongoose connection
│   ├── models.ts            Job + Application schemas
│   └── auth.ts              Admin JWT helpers
├── scripts/seed.ts          npm run seed — populate DB with sample jobs
├── public/uploads/          Uploaded CV files (created at runtime)
└── ...
```

## Customizing

- **Branding / colors** — edit `tailwind.config.js` (the `brand` and `accent` palettes) and the logo block in `components/Header.tsx`.
- **Translations** — edit `lib/translations.ts`. All three languages share the same keys.
- **Adding a country** — extend `countryInfo` in `lib/seed-jobs.ts` and the country list in `components/JobCard.tsx` (flag map) and `app/countries/page.tsx`.
- **Email notifications on new applications** — drop in a `nodemailer` or Resend call inside `app/api/applications/route.ts` after `await ApplicationModel.create(payload)`.

## CV file storage in production

The current implementation stores uploaded CVs in `public/uploads/`. **This works locally but is ephemeral on Vercel** (the filesystem resets on each deploy).

For production, replace the file-write in `app/api/applications/route.ts` with an upload to:
- **Vercel Blob** (`@vercel/blob`) — easiest for Vercel deployments
- **Cloudflare R2** / **AWS S3** — cheap, durable
- **Firebase Storage**

The `cvFilename` field on the Application model just stores a URL, so swapping the storage layer only changes that one function (`saveUploadedCV`).

## Admin login defaults

Out of the box (if you don't set `.env`), admin login is:

```
email:    admin@bhatoverseas.com
password: admin123
```

**Change `ADMIN_PASSWORD` and `JWT_SECRET` before deploying to production.**

## License

Proprietary — © Bhat Overseas Pvt Ltd. All rights reserved.
