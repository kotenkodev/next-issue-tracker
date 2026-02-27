# Next Issue Tracker

An advanced issue tracker built with [Next.js](https://nextjs.org), Prisma, PostgreSQL, and Sentry for error monitoring.

## Features

- Dashboard with issue summary, chart, and latest issues
- Issue list with filtering, sorting, and pagination
- Assign users to issues
- Authentication with NextAuth.js
- Error monitoring and tracing with Sentry
- Responsive UI using Radix UI and Tailwind CSS

## Getting Started

### 1. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Configure environment variables

Copy `.env.examle` to `.env` and fill in the required values:

```
cp .env.examle .env
```

Set up your database connection, NextAuth, Google OAuth, and Sentry credentials in `.env`.

### 3. Set up the database

Run Prisma migrations:

```
npx prisma migrate deploy
# or for development
npx prisma migrate dev
```

### 4. Start the development server

```
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Sentry Integration

Sentry is configured for error monitoring and tracing on both server and client. See:

- `sentry.server.config.ts`, `sentry.edge.config.ts`, `src/instrumentation.ts`, `src/instrumentation-client.ts`
- Example error page: `/sentry-example-page`
- Example API route: `/api/sentry-example-api`

## Project Structure

```
next-issue-tracker/
├── prisma/                  # Prisma schema and migrations
│   ├── schema.prisma
│   └── migrations/
├── public/                  # Static assets
├── src/
│   ├── app/                 # Main Next.js app, pages, and components
│   │   ├── api/             # API routes (Next.js route handlers)
│   │   ├── issues/          # Issue-related pages and components
│   │   ├── _components/     # Shared UI components
│   │   └── ...
│   ├── instrumentation.ts   # Sentry instrumentation (server/edge)
│   └── instrumentation-client.ts # Sentry instrumentation (client)
├── sentry.server.config.ts  # Sentry server config
├── sentry.edge.config.ts    # Sentry edge config
├── package.json
├── .env.examle
└── README.md
```

- `src/app/page.tsx` - Dashboard page
- `src/app/issues/page.tsx` - Issue list page
- `src/app/global-error.tsx` - Global error handler
- `src/app/sentry-example-page/page.tsx` - Sentry test page

## Scripts

- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server
- `lint` - Run ESLint
