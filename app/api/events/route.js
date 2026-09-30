import {NextResponse as R} from 'next/server';import {listEvents,createEvent} from '@/lib/db';
export const dynamic='force-dynamic';
export async function GET(req){try{return R.json(await listEvents(Object.fromEntries(new URL(req.url).searchParams)))}catch(e){return R.json({error:'Database error: '+e.message},{status:500})}}
export async function POST(req){const b=await req.json();
if(!b.name?.trim()||!b.date||!b.time||!b.venue?.trim()||!(+b.totalSeats>=1)||!(+b.price>=0))return R.json({error:'Fill in name, date, time, venue, seats and a valid price.'},{status:400});
return R.json(await createEvent(b),{status:201})}
