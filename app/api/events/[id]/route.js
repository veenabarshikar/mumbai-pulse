import { NextResponse as R } from 'next/server'; import { getEvent, updateEvent, deleteEvent } from '@/lib/db';
export const dynamic = 'force-dynamic';
export async function GET(_, { params }) { const e = await getEvent(params.id); return e ? R.json(e) : R.json({ error: 'Not found' }, { status: 404 }) }
export async function PUT(req, { params }) { const r = await updateEvent(params.id, await req.json()); if (!r) return R.json({ error: 'Not found' }, { status: 404 }); return r.error ? R.json(r, { status: 400 }) : R.json(r) }
export async function DELETE(_, { params }) { await deleteEvent(params.id); return R.json({ ok: true }) }
