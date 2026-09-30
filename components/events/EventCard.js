import Link from 'next/link';
import Fav from '@/components/Fav';
import { fd, ft, inr, left } from '@/lib/util';
import EventBanner from './EventBanner';

function SeatsLeft({ count }) {
  if (count === 0) return <span className="text-sm font-medium text-red-700">Sold out</span>;
  const style = count <= 10 ? 'text-red-700' : 'text-slate-500';
  return <span className={`text-sm font-medium ${style}`}>{count} seats left</span>;
}

export default function EventCard({ event }) {
  return (
    <div className="relative transition hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/events/${event.id}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white"
      >
        <EventBanner event={event} className="flex h-36 items-end p-3">
          <span className="relative rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white">{event.category}</span>
        </EventBanner>
        <div className="flex flex-1 flex-col gap-1 p-4">
          <h3 className="text-lg font-bold leading-tight">{event.name}</h3>
          <p className="text-sm text-slate-600">
            {fd(event.date)}, {ft(event.time)}
            <br />
            {event.venue}, {event.location}
          </p>
          <p className="line-clamp-2 text-sm text-slate-500">{event.description}</p>
          <div className="mt-auto flex justify-between pt-2 font-bold">
            <span>{inr(event.price)}</span>
            <SeatsLeft count={left(event)} />
          </div>
        </div>
      </Link>
      <Fav id={event.id} />
    </div>
  );
}
