'use client';
import { useEffect, useState, Suspense } from 'react'; import { useSearchParams } from 'next/navigation'; import EventCard from '@/components/EventCard'; import { CATS, LOCS } from '@/lib/util';
function List() {
    const sp = useSearchParams();
    const [f, setF] = useState({ q: sp.get('q') || '', category: sp.get('category') || '', location: sp.get('location') || '', date: '', sort: 'date' });
    const [ev, setEv] = useState(null), [pg, setPg] = useState(1), [names, setNames] = useState([]);
    useEffect(() => setPg(1), [f]); useEffect(() => { fetch('/api/events').then(r => r.json()).then(a => Array.isArray(a) && setNames(a.map(e => e.name))) }, []); const set = k => e => setF({ ...f, [k]: e.target.value });
    useEffect(() => { const p = new URLSearchParams(Object.entries(f).filter(([, v]) => v)); const t = setTimeout(() => fetch('/api/events?' + p).then(r => r.json()).then(setEv), 200); return () => clearTimeout(t) }, [f]);
    const S = ({ k, label, children }) =>
        <select aria-label={label} value={f[k]} onChange={set(k)} className="inp">{children}</select>;
    return (<div className="mx-auto max-w-6xl px-5 pt-8">
        <h1 className="text-3xl font-extrabold">All events</h1>
        <div className="my-5 grid gap-2 rounded-2xl border border-slate-200 bg-white p-3 sm:grid-cols-2 lg:grid-cols-5">
            <input className="inp sm:col-span-2 lg:col-span-1" type="search" placeholder="Search events" aria-label="Search" list="sug" value={f.q} onChange={set('q')} />
            <datalist id="sug">{names.map(n => <option key={n} value={n} />)}</datalist>
            <S k="category" label="Category">
                <option value="">All categories</option>
                {Object.keys(CATS).map(c => <option key={c}>{c}</option>)}</S>
            <S k="location" label="Location">
                <option value="">All locations</option>
                {LOCS.map(c => <option key={c}>{c}</option>)}
            </S>
            <S k="date" label="Date">
                <option value="">Any date</option>
                <option value="today">Today</option>
                <option value="weekend">This weekend</option>
                <option value="week">Next 7 days</option>
                <option value="month">Next 30 days</option>
            </S>
            <S k="sort" label="Sort">
                <option value="date">Soonest first</option>
                <option value="priceAsc">Price: low to high</option>
                <option value="priceDesc">Price: high to low</option>
                <option value="popular">Most popular</option>
            </S>
        </div>
        {ev &&
            <p className="mb-3 text-sm text-slate-600">{ev.length} events found</p>}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{ev ? ev.slice((pg - 1) * 6, pg * 6).map(e =>
            <EventCard key={e.id} e={e} />) : [...Array(6)].map((_, i) => <div key={i} className="h-72 animate-pulse rounded-2xl bg-slate-200" />)}
        </div>
        {ev && ev.length > 6 &&
            <div className="mt-6 flex items-center justify-center gap-3">
                <button className="btn btn-ghost" disabled={pg === 1} onClick={() => setPg(pg - 1)}>Previous</button>
                <span className="text-sm">Page {pg} of {Math.ceil(ev.length / 6)}</span>
                <button className="btn btn-ghost" disabled={pg >= Math.ceil(ev.length / 6)} onClick={() => setPg(pg + 1)}>Next</button>
            </div>}
        {ev && !ev.length &&
            <div className="py-16 text-center text-slate-500">
                <h3 className="text-lg font-bold">No events match</h3>Try clearing a filter or a different search word.</div>}
    </div>)
}
export default function P() { return <Suspense><List /></Suspense> }
