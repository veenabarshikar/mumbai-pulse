'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Qr from '@/components/Qr';
import { inr, fd, ft, left } from '@/lib/util';
export default function Book({ params }) {
    const [e, setE] = useState(null), [f, setF] = useState({ name: '', email: '', phone: '', tickets: 1 }), [er, setEr] = useState({}), [done, setDone] = useState(null), [busy, setBusy] = useState(false);
    useEffect(() => { fetch('/api/events/' + params.id).then(r => r.ok ? r.json() : null).then(x => setE(x || false)) }, [params.id]);
    if (e === null) return
    <p className="p-8">Loading…</p>;
    if (e === false) return
    <p className="p-8">Event not found.
        <Link href="/events" className="underline">Browse events</Link>
    </p>;
    const max = Math.min(10, left(e));
    async function submit(ev) {
        ev.preventDefault(); setBusy(true);
        const r = await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...f, eventId: e.id }) });
        const d = await r.json(); setBusy(false); r.ok ? setDone(d) : setEr(d.errors || { tickets: d.error })
    }
    if (done) return (
        <div className="mx-auto my-10 max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-full bg-emerald-600 text-3xl text-white">✓

            </div>
            <h1 className="text-3xl font-extrabold">You're booked!</h1>
            <p className="text-slate-600">Confirmation would be sent to {done.email}</p>
            <p className="my-4 rounded-xl border-2 border-dashed border-teal-700 py-3 text-3xl font-extrabold tracking-widest">{done.ref}</p>
            <Qr text={done.ref} />
            <p>
                <b>{done.eventName}</b><br />{fd(done.date)}, {ft(done.time)} at {done.venue}<br />{done.tickets} ticket(s) for {done.name}<br />Total: {inr(done.total)}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
                <Link href="/events" className="btn">Find more events</Link>
                <button onClick={() => window.print()} className="btn btn-ghost">Print ticket</button>
            </div>
        </div>);
    const F = ({ k, label, ...p }) =>
        <div>
            <label htmlFor={k} className="mb-1 block text-sm font-bold">{label}</label>
            <input id={k} className="inp" value={f[k]} onChange={x => setF({ ...f, [k]: x.target.value })} {...p} />
            <p className="err">{er[k]}</p>
        </div>;
    return (
        <div className="mx-auto max-w-4xl px-5 pt-6">
            <Link href={`/events/${e.id}`} className="text-slate-600 underline">Back to event</Link>
            <h1 className="my-3 text-3xl font-extrabold">Book tickets</h1>
            <div className="grid gap-6 md:grid-cols-[1fr_300px]">
                <form onSubmit={submit} noValidate className="space-y-1 rounded-2xl border border-slate-200 bg-white p-5">
                    <F k="name" label="Full name" autoComplete="name" />
                    <F k="email" label="Email" type="email" autoComplete="email" />
                    <div className="grid gap-3 sm:grid-cols-2"><F k="phone" label="Phone (10 digits)" type="tel" inputMode="numeric" />
                        <F k="tickets" label="Tickets" type="number" min="1" max={max} />
                    </div>
                    <button disabled={busy} className="btn btn-acc w-full">{busy ? 'Booking…' : 'Confirm booking'}</button>
                    <p className="text-sm text-slate-500">No payment is taken. Demo booking only.</p>
                </form>
                <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5">
                    <h3 className="font-bold">{e.name}</h3>
                    <p className="text-sm text-slate-600">{fd(e.date)}, {ft(e.time)}<br />
                        {e.venue}, {e.location}</p>
                    <p className="mt-3 border-t pt-3">Total:
                        <b>{inr(e.price * (Number(f.tickets) || 0))}</b>
                    </p>
                </aside>
            </div>
        </div>)
}
