'use client';import {useEffect,useState} from 'react';import Link from 'next/link';import EventCard from '@/components/EventCard';import {getFavs} from '@/components/Fav';
export default function Favs(){const [ev,setEv]=useState(null);
useEffect(()=>{const f=getFavs();fetch('/api/events').then(r=>r.json()).then(a=>setEv(Array.isArray(a)?a.filter(e=>f.includes(e.id)):[]))},[]);
return(<div className="mx-auto max-w-6xl px-5 pt-8"><h1 className="text-3xl font-extrabold">Saved events</h1>
{ev&&!ev.length&&<p className="py-16 text-center text-slate-500">No saved events yet. Tap the heart on any event to save it. <Link href="/events" className="underline">Browse events</Link></p>}
<div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{ev?.map(e=><EventCard key={e.id} e={e}/>)}</div></div>)}
