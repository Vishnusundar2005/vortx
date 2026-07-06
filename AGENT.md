# AGENT.md

# VORTX Studio Booking Platform

## Project Vision

VORTX Studio is a premium studio booking platform for VORTX Studios, Chennai.

The platform allows customers to reserve studio slots without creating an account. Customers simply choose an available date and time, enter their details, and submit a booking request. Once submitted, they are redirected to WhatsApp with a pre-filled booking message for confirmation.

Only administrators have access to the dashboard to manage bookings, availability, and business settings.

The application should be fast, modern, responsive, secure, scalable, and production-ready.

---

# Tech Stack

## Frontend

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- TanStack Query
- Axios
- Lucide Icons

## Backend

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Passport
- bcrypt
- Class Validator
- Class Transformer

## Database

- Neon PostgreSQL
- Prisma ORM

---

# Development Environment

Development should NOT use Docker.

The project must connect directly to Neon PostgreSQL during development.

Local Development

Frontend
http://localhost:3000

↓

Backend
http://localhost:5000

↓

Neon PostgreSQL

No Docker.
No Docker Compose.
No Local PostgreSQL container.

---

# Authentication

Only administrators can log in.

Customers never create an account.

Authentication

JWT

Password hashing

bcrypt

Protected Admin APIs

---

# Customer Booking Flow

Landing Page

↓

Book Now

↓

Select Booking Date

↓

Select Duration

↓

Display Available Time Slots

↓

Select Time Slot

↓

Enter Personal Details

↓

Booking Summary

↓

Submit Booking

↓

Booking Status = Pending

↓

Redirect to WhatsApp

↓

Admin Reviews Booking

↓

Admin Confirms Booking

---

# Booking Rules

Minimum Booking

2 Hours

Maximum Booking

12 Hours

Bookings cannot overlap.

Past dates cannot be booked.

Blocked slots cannot be booked.

Cancelled bookings free their time slot.

Completed bookings remain available for reporting.

---

# Booking Status

Pending

Confirmed

Completed

Cancelled

Rejected

---

# Booking Fields

Booking ID

Customer Name

Phone Number

Email

Company Name

Booking Purpose

Booking Date

Start Time

End Time

Duration

Number Of People

Additional Notes

Status

Created At

Updated At

---

# Booking Purposes

Podcast Recording

Video Podcast

Photography

Videography

Music Video

Dance Video

Live Streaming

Community Event

Corporate Meeting

Workshop

Interview

Product Shoot

Other

---

# Admin Dashboard

Dashboard

Today's Bookings

Upcoming Bookings

Pending Requests

Completed Bookings

Cancelled Bookings

Calendar View

Booking Details

Booking Status

Booking History

---

# Admin Features

Dashboard

Manage Bookings

Edit Booking

Cancel Booking

Complete Booking

Delete Booking

Block Time Slots

Manage Business Settings

Manage Pricing

View Analytics (Future)

---

# Availability Management

Admin can

Block Entire Day

Block Specific Time Slot

Holiday

Maintenance Block

Manual Availability Override

---

# Business Settings

Studio Name

Owner Name

Phone Number

WhatsApp Number

Email Address

Studio Address

Google Maps URL

Instagram URL

YouTube URL

Facebook URL

Working Days

Opening Time

Closing Time

Hourly Price

Minimum Booking Hours

Maximum Booking Hours

Advance Payment Percentage

---

# Website Pages

Home

About

Services

Studio Spaces

Equipment

Pricing

Gallery

Booking

FAQ

Contact

Privacy Policy

Terms & Conditions

Admin Login

---

# Database Tables

admins

bookings

blocked_slots

business_settings

Future

gallery

services

pricing

notifications

---

# API Design

REST API

Global Prefix

/api/v1

Standard Responses

Success

{
  success,
  message,
  data
}

Error

{
  success,
  message,
  errors
}

Validation

Global Validation Pipes

Whitelist

Transform

forbidNonWhitelisted

---

# Security

JWT Authentication

bcrypt Password Hashing

Helmet

CORS

Rate Limiting

Validation Pipes

Input Sanitization

Environment Variables

Never expose secrets

---

# Coding Standards

Strict TypeScript

Feature-based Architecture

Reusable Components

Reusable Services

Reusable Hooks

Reusable Schemas

Reusable Types

Reusable Utilities

No duplicated code

Meaningful variable names

Small focused functions

Proper error handling

Clean folder structure

Consistent formatting

ESLint

Prettier

---

# Frontend Structure

src/

app/

components/

features/

hooks/

lib/

schemas/

services/

types/

utils/

assets/

styles/

---

# Backend Structure

src/

auth/

booking/

availability/

dashboard/

settings/

common/

config/

prisma/

database/

shared/

---

# Performance

Server Components where applicable

Lazy Loading

Code Splitting

Optimized Images

Database Indexes

Efficient Prisma Queries

Pagination

Minimal Client Components

---

# SEO

Metadata

Open Graph

Twitter Cards

Structured Data

robots.txt

sitemap.xml

Semantic HTML

Accessible Components

---

# UI Design Principles

Premium

Modern

Minimal

Dark Theme

Responsive

Accessible

Fast

Clean Animations

Professional Typography

Consistent Spacing

---

# Notifications

Customer

Redirect to WhatsApp after booking.

Admin

Manage booking confirmations from dashboard.

No email or SMS notifications in Version 1.

---

# Deployment

Frontend

Vercel

Backend

Railway

Database

Neon PostgreSQL

Development

No Docker

Production

Environment Variables

---

# Future Roadmap

Google Calendar Sync

Razorpay Integration

Email Notifications

WhatsApp API Integration

Invoices

Coupon Codes

CMS

Gallery Management

Analytics Dashboard

Customer Portal

Multiple Studios

Staff Accounts

Booking Reports

Recurring Bookings

Online Payments

AI Assistant

---

# Agent Rules

Always follow AGENT.md before implementing any feature.

Build one feature at a time.

Do not skip validation.

Do not introduce unnecessary dependencies.

Prefer reusable code over duplication.

Write production-ready code only.

Keep the project modular and scalable.

Every feature should be easy to extend.

Never hardcode secrets.

Never break existing functionality.

Always maintain clean architecture.

Prioritize readability, maintainability, and performance.