import { NextResponse as R } from 'next/server';
import { listBookings, createBooking } from '@/lib/db';
export const dynamic = 'force-dynamic';
export async function GET() { return R.json(await listBookings()) }
export async function POST(req) {
    const b = await req.json(), name = (b.name || '').trim(), email = (b.email || '').trim(), phone = String(b.phone || '').replace(/[\s-]/g, '').replace(/^(\+91|0)/, ''), tickets = Number(b.tickets), errors = {};
    if (name.length < 2) errors.name = 'Enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = 'Enter a valid email.';
    if (!/^[6-9]\d{9}$/.test(phone)) errors.phone = 'Enter a 10-digit Indian mobile number.';
    if (!Number.isInteger(tickets) || tickets < 1 || tickets > 10) errors.tickets = 'Choose 1 to 10 tickets.';
    if (Object.keys(errors).length) return R.json({ errors }, { status: 400 });
    const r = await createBooking({ eventId: b.eventId, name, email, phone, tickets });
    if (r.notFound) return R.json({ error: 'Event not found' }, { status: 404 });
    return r.errors ? R.json({ errors: r.errors }, { status: 400 }) : R.json(r.booking, { status: 201 })
}
