import Link from 'next/link'; import { listEvents } from '@/lib/db'; import EventCard from '@/components/EventCard'; import MarineDrive from '@/components/MarineDrive'; import { CATS, LOCS } from '@/lib/util';
export const dynamic = 'force-dynamic';
const ICON = { Music: '🎵', Workshops: '🛠️', Sports: '🏃', Food: '🍜', Networking: '🤝', Art: '🎨', Community: '🌿' };
const PAL = [['#8b35f5', '#fff'], ['#ff9a1c', '#1d1200'], ['#3ee800', '#0a2200'], ['#ff5cf0', '#2a0027']];
export default async function Home() {
    const ev = await listEvents({});
    const feat = (ev.filter(e => e.featured).length ? ev.filter(e => e.featured) : ev).slice(0, 4);
    return (<>
        <section className="relative isolate flex min-h-[540px] items-center overflow-hidden px-5 py-16 hero-copy md:min-h-[620px]"><MarineDrive />
            <div className="hero-shade absolute inset-0" />
            <div className="relative mx-auto w-full max-w-6xl">
                <h1 className="max-w-2xl text-4xl font-extrabold leading-tight md:text-6xl">Find your next night out in Mumbai</h1>
                <p className="mt-4 max-w-xl text-lg">Live music, food trails, workshops and community days across the city. Switch the theme to see Marine Drive by day or night.</p>
                <form action="/events" className="mt-6 flex max-w-xl flex-col gap-2 rounded-3xl bg-white/95 p-2 shadow-[0_0_40px_-6px_#8b35f5] sm:flex-row sm:rounded-full">
                <input name="q" placeholder="Search events, venues or areas" className="flex-1 bg-transparent px-4 py-2 text-slate-900 outline-none" aria-label="Search" />
                <button className="btn btn-acc">Search</button>
                </form>
                </div>
                </section>
        <div className="mx-auto max-w-6xl space-y-14 px-5 pt-12">
            <section>
                <h2 className="mb-4 text-2xl font-bold">Browse by category</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{Object.keys(CATS).map((c, i) => {
                const [bg, fg] = PAL[i % 4]; const n = ev.filter(e => e.category === c).length; return (
                    <Link key={c} href={`/events?category=${c}`} className="cat-tile flex h-40 flex-col justify-between rounded-2xl p-4 font-bold" style={{ background: bg, color: fg, '--g': bg }}><span className="text-3xl">{ICON[c]}</span>
                        <span><span className="block text-lg">{c}</span>
                        <span className="mt-1 flex items-center justify-between">
                        <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-medium">{n} events</span>
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-black">→
                        </span>
                        </span>
                        </span>
                    </Link>)
                })}</div>
            </section>
            <section>
                <div className="mb-4 flex items-end justify-between">
                    <h2 className="text-2xl font-bold">Featured events</h2>
                    <Link href="/events" className="text-teal-800 underline">See all</Link>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{feat.map(e => <EventCard key={e.id} e={e} />)}</div>
            </section>
            <section>
                <h2 className="mb-4 text-2xl font-bold">Popular locations</h2>
                <div className="flex flex-wrap gap-2">{LOCS.map(l => <Link key={l} href={`/events?location=${l}`} className="rounded-full border border-slate-300 bg-white px-4 py-2 hover:border-[#8b35f5] hover:shadow-[0_0_16px_-2px_#8b35f5]">{l} 
                <span className="text-slate-500">{ev.filter(e => e.location === l).length}</span></Link>)}
                </div>
            </section>
            <section className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-[#8b35f5] p-8 text-white shadow-[0_0_44px_-8px_#8b35f5] sm:flex-row sm:items-center">
                <h2 className="max-w-xs text-2xl font-extrabold">Hosting something in Mumbai?</h2>
                <Link href="/admin" className="btn btn-green">List your event</Link>
            </section>
                </div></>)
}
