import { createClient } from '@supabase/supabase-js';
const sb = globalThis._sb || (globalThis._sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false }, global: { fetch: (u, o) => fetch(u, { ...o, cache: 'no-store' }) } }));
const day = n => { const d = new Date(); d.setDate(d.getDate() + n); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10) };
const ok = ({ data, error }) => { if (error) throw new Error(error.message); return data };
const ev = r => r && ({ id: r.id, name: r.name, category: r.category, date: r.date, time: String(r.time).slice(0, 5), location: r.location, venue: r.venue, price: r.price, totalSeats: r.total_seats, booked: r.booked, organizer: r.organizer, description: r.description, featured: r.featured });
const bk = r => ({ ref: r.ref, eventId: r.event_id, eventName: r.event_name, date: r.date, time: String(r.time).slice(0, 5), venue: r.venue, name: r.name, email: r.email, phone: r.phone, tickets: r.tickets, total: r.total, createdAt: r.created_at });
const row = b => ({ name: b.name.trim(), category: b.category, date: b.date, time: b.time, location: b.location, venue: b.venue.trim(), price: +b.price || 0, total_seats: +b.totalSeats, organizer: b.organizer || '', description: b.description || '', featured: !!b.featured });
const SORT = { date: (a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time), priceAsc: (a, b) => a.price - b.price, priceDesc: (a, b) => b.price - a.price, popular: (a, b) => b.booked - a.booked };
export async function listEvents(p = {}) {
    let q = sb.from('events').select('*');
    if (p.upcoming !== '0') q = q.gte('date', day(0));
    if (p.q) { const s = p.q.replace(/[%,()*]/g, ' '); q = q.or(['name', 'description', 'venue', 'location', 'category', 'organizer'].map(c => `${c}.ilike.%${s}%`).join(',')) }
    if (p.category) q = q.eq('category', p.category); if (p.location) q = q.eq('location', p.location);
    if (p.date === 'today') q = q.eq('date', day(0)); if (p.date === 'week') q = q.lte('date', day(7)); if (p.date === 'month') q = q.lte('date', day(30));
    let r = ok(await q).map(ev);
    if (p.date === 'weekend') r = r.filter(e => [0, 6].includes(new Date(e.date + 'T00:00').getDay()) && e.date <= day(7));
    return r.sort(SORT[p.sort] || SORT.date)
}
export async function getEvent(id) { return ev(ok(await sb.from('events').select('*').eq('id', id).maybeSingle())) }
export async function createEvent(b) { return ev(ok(await sb.from('events').insert(row(b)).select().single())) }
export async function updateEvent(id, b) {
    const e = await getEvent(id); if (!e) return null;
    if (+b.totalSeats < e.booked) return { error: `Total seats can't be below the ${e.booked} already booked.` };
    return ev(ok(await sb.from('events').update(row(b)).eq('id', id).select().single()))
}
export async function deleteEvent(id) { ok(await sb.from('events').delete().eq('id', id)) }
export async function listBookings() { return ok(await sb.from('bookings').select('*').order('created_at', { ascending: false })).map(bk) }
export async function createBooking(b) {
    const d = ok(await sb.rpc('book_tickets', { p_event: b.eventId, p_name: b.name, p_email: b.email, p_phone: b.phone, p_tickets: b.tickets, p_ref: 'MP-' + Math.random().toString(36).slice(2, 8).toUpperCase() }));
    if (d.notFound) return { notFound: true }; if (d.error) return { errors: { tickets: d.error } }; return { booking: bk(d.booking) }
}