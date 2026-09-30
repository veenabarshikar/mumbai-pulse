'use client'; import { useEffect, useState } from 'react';
export const getFavs = () => { try { return JSON.parse(localStorage.getItem('mp_fav') || '[]') } catch { return [] } };
export default function Fav({ id }) {
    const [on, setOn] = useState(false);
    useEffect(() => setOn(getFavs().includes(id)), [id]);
    const tg = e => { e.preventDefault(); e.stopPropagation(); const f = getFavs(), n = f.includes(id) ? f.filter(x => x !== id) : [...f, id]; localStorage.setItem('mp_fav', JSON.stringify(n)); setOn(n.includes(id)) };
    return <button onClick={tg} aria-label={on ? 'Remove from saved' : 'Save event'} aria-pressed={on} className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-lg text-red-600 shadow">{on ? '♥' : '♡'}</button>
}
