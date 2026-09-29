# Sheetal Electrotech — Web Platform

Next.js website for Sheetal Electrotech Private Limited.

## Local development

```bash
npm install
npm run dev
```

## Production RFQ configuration

The RFQ workflow uses Neon Postgres for submissions, Vercel Blob for optional drawings/CAD attachments, and Resend for email notifications.

Set these variables in the deployment environment:

```text
DATABASE_URL=
RESEND_API_KEY=
BLOB_READ_WRITE_TOKEN=
RFQ_SALES_EMAIL=info@sheetalelectrotech.com
RFQ_FROM_EMAIL=info@sheetalelectrotech.com
```

Run `database/schema.sql` once against the Neon database before enabling the RFQ pipeline.

`RFQ_SALES_EMAIL` and `RFQ_FROM_EMAIL` default to the company's official `info@sheetalelectrotech.com` address when omitted.

## Canonical routes

Public pages use locale-prefixed canonical URLs:

- `/en/*`
- `/hi/*`

Legacy unlocalized routes are permanently redirected to their English equivalents by `src/proxy.ts`.

## Build

```bash
npm run build
```
