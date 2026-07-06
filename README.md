# VORTX Studio Booking Platform

A comprehensive, production-ready full-stack application built for VORTX Studios to manage bookings, studio availability, and customer marketing. 

Built with **Next.js 15 (App Router)** and **NestJS (Node.js)**, backed by **PostgreSQL** and **Prisma**.

## Architecture Overview
This repository uses a clean monorepo structure.
- `apps/web`: The frontend application (Marketing Website + Admin Dashboard + Booking Flow).
- `apps/api`: The backend application (RESTful API).

## Tech Stack
- **Frontend**: Next.js 15, React 19, Tailwind CSS v4, `shadcn/ui`, Framer Motion, TanStack Query, React Hook Form, Zod.
- **Backend**: NestJS 11, Prisma ORM, PostgreSQL, Passport JWT, bcrypt, Helmet, Throttler (Rate Limiting).

---

## Local Development Setup

### 1. Prerequisites
- Node.js >= 20.x
- PostgreSQL database (Local or Cloud like Neon/Supabase)

### 2. Environment Configuration
Copy the `.env.example` templates in both `apps/web` and `apps/api` to create your local `.env` and `.env.local` files.

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

### 3. Database Initialization (Backend)
Navigate into the `apps/api` directory to setup your database.
```bash
cd apps/api
npm install
npx prisma db push
npm run build
npx prisma db seed
```
*Note: The seed script requires `ADMIN_EMAIL` and `ADMIN_PASSWORD` in your `.env` to create the initial root user.*

### 4. Running the Application

**Run Backend (Port 3001)**
```bash
cd apps/api
npm run start:dev
```

**Run Frontend (Port 3000)**
```bash
cd apps/web
npm install
npm run dev
```

---

## Deployment Guide

The application is completely decoupled and optimized for modern serverless and containerized deployment environments.

### Frontend Deployment (Vercel)
1. Import the repository into Vercel.
2. Set the Root Directory to `apps/web`.
3. Set the Framework Preset to `Next.js`.
4. Ensure the Environment Variable `NEXT_PUBLIC_API_URL` is configured to point to your live backend domain.
5. Deploy.

### Backend Deployment (Railway or Render)
1. Import the repository.
2. Set the Root Directory to `apps/api`.
3. Set the Build Command to `npm run build`.
4. Set the Start Command to `npm run start:prod`.
5. Add the necessary Environment Variables (see `apps/api/.env.example`).
6. Deploy.

---

## Security & Performance
- **Rate Limiting**: Configured at `100 requests / minute` via `@nestjs/throttler`.
- **Payload Compression**: Enabled globally via `compression` middleware to optimize JSON transfer times.
- **Helmet**: Secures Express apps by setting various HTTP headers.
- **Global Error Handling**: Standardized error responses and sanitized internal stack traces using `HttpExceptionFilter`.
- **SEO Ready**: Metadata, sitemaps, and `robots.txt` dynamically configured in Next.js.
- **Frontend Code Splitting**: Heavy charting dependencies (`recharts`) are dynamically loaded via `next/dynamic` to dramatically reduce initial bundle size and boost Time-to-Interactive (TTI).
- **Type Safety**: Strictly enforced `@typescript-eslint` rules across the entire monorepo, replacing dangerous `any` types with `unknown` and interface guards.
- **Database Indexing**: Prisma models are optimized with composite indexes (e.g. `[bookingDate, status]`) for fast analytics and dashboard queries.
