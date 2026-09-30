import Link from 'next/link'; import Fav from './Fav'; import { inr, fd, ft, left, grad } from '@/lib/util';
export default function EventCard({ e }) {
    const l = left(e); return (
        <div className="relative transition hover:-translate-y-1 hover:shadow-lg">
            <Link href={`/events/${e.id}`} className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="flex h-36 items-end p-3" style={{ background: grad(e.category) }}>
                <span className="rounded-full bg-black/50 px-3 py-1 text-xs font-bold text-white">{e.category}</span>
            </div>
            <div className="flex flex-1 flex-col gap-1 p-4">
                <h3 className="text-lg font-bold leading-tight">{e.name}</h3>
                <p className="text-sm text-slate-600">{fd(e.date)}, {ft(e.time)}<br />{e.venue}, {e.location}</p>
                <p className="line-clamp-2 text-sm text-slate-500">{e.description}</p>
                <div className="mt-auto flex justify-between pt-2 font-bold">
                        <span>{inr(e.price)}</span>
                        <span className={l <= 10 ? 'text-sm font-medium text-red-700' : 'text-sm font-medium text-slate-500'}>{l ? `${l} seats left` : 'Sold out'}
                        </span>
                        </div>
                        </div>
                        </Link>
                        <Fav id={e.id} />
                </div>)
}
