# Mumbai Pulse

A full-stack web app for discovering and booking local events in Mumbai: concerts, workshops, sports, food trails, networking, art and community events.

## Features

- **Home:** Marine Drive hero (day and night), search, categories, featured events, popular locations.
- **Events:** search with autocomplete, category / location / date filters, sorting, pagination, skeleton loaders.
- **Event details:** banner, organiser, price, seats left, map, weather forecast, share button.
- **Booking:** validated form, confirmation screen with booking ID and QR code. No payment is taken.
- **Admin:** add, edit and delete events (with image upload), view bookings and totals.
- **Extras:** dark / light theme, saved events, glowing UI, cursor trail, responsive layout.

## Tech stack

Next.js 14 (App Router) · React 18 · JavaScript · Tailwind CSS · Next.js API routes (Node.js) · Supabase (PostgreSQL) · `qrcode`

## Project structure

```
app/
  api/events/route.js, api/events/[id]/route.js, api/bookings/route.js
  page.js, events/, book/, admin/, favorites/      Pages (thin, they compose components)
  layout.js, error.js, not-found.js                Shell and error pages
  globals.css, effects.css                         Styles
components/
  layout/    Navbar, Footer
  effects/   GlowBackground, CursorTrail
  home/      HeroSection, HeroSearch, CategoryGrid, FeaturedEvents, PopularLocations, CtaBanner
  events/    EventCard, EventGrid, FilterBar, Pagination, EventInfo, EventMap, BookingPanel
  booking/   BookingForm, BookingConfirmation
  admin/     StatCards, EventsTable, BookingsList, EventFormModal
  ui/        Field
  Fav, Share, Weather, Qr, ThemeToggle, MarineDrive
lib/
  config/env.js        Environment variables
  errors.js            AppError, ValidationError, NotFoundError
  http.js              handle() try/catch wrapper, ok(), readJson()
  supabase.js          Database client
  mappers.js           Database rows <-> API objects
  validators/          bookingRules (shared with the browser), bookingValidator, eventValidator
  repositories/        eventRepository, bookingRepository (all database access)
  services/            bookingService (business rules)
  client/api.js        Browser fetch wrapper
  db.js, util.js
database/              schema.sql, functions.sql
```

Backend flow: **route** (thin) -> **validator** -> **service** -> **repository** -> database.

## Setup

1. Install Node.js 18+, then run `npm install`.
2. Create a free Supabase project. In the SQL Editor run `database/schema.sql`, `database/functions.sql`, then `database/images.sql`.
3. Create `.env.local` in the project root:

```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_secret_key
```

4. Run `npm run dev` and open http://localhost:3000.

Never commit `.env.local`. The service key gives full database access and is only used on the server.

## API

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/events` | List events. Query: `q`, `category`, `location`, `date` (today/weekend/week/month), `sort` (date/priceAsc/priceDesc/popular) |
| POST | `/api/events` | Create event |
| GET / PUT / DELETE | `/api/events/:id` | Read, update, delete |
| GET | `/api/bookings` | List bookings |
| POST | `/api/bookings` | Create booking |

Errors return `{ "error": "message" }`, plus `{ "errors": { field: "message" } }` for validation problems.

## Validation and error handling

- Booking rules (`bookingRules.js`) run in both the browser and the server, so they cannot drift apart.
- Event input is cleaned and checked (types, lengths, ranges, valid category, location, date and time) before it reaches the database.
- Every API route is wrapped in `handle()`. Known errors return a clear message. Unexpected errors are logged on the server and users see only a generic message, so database details never leak.
- Booking runs in one database transaction with a row lock, so two people cannot take the last seat.
- The browser's `api.js` turns network failures and bad responses into readable messages. `app/error.js` catches page errors.

## Known limitations

- **The admin page and admin API routes have no login.** Add authentication (for example Supabase Auth) before deploying publicly.
- No payment gateway, confirmation emails or image upload.
- The Marine Drive image is an illustration drawn in code, not a photo.

## Troubleshooting

- `Invalid API key`: wrong or truncated `SUPABASE_SERVICE_ROLE_KEY`.
- `supabaseUrl is required`: `.env.local` is misnamed, in the wrong folder, or the server was not restarted.
- `function book_tickets ... does not exist`: run `database/functions.sql`.
