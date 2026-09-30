import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEvent } from '@/lib/db';
import EventBanner from '@/components/events/EventBanner';
import EventInfo from '@/components/events/EventInfo';
import BookingPanel from '@/components/events/BookingPanel';

export const dynamic = 'force-dynamic';

export default async function EventDetailsPage({ params }) {
  const event = await getEvent(params.id); // errors are caught by app/error.js
  if (!event) notFound();

  return (
    <div className="mx-auto max-w-6xl px-5 pt-6">
      <Link href="/events" className="text-slate-600 underline">Back to events</Link>
      <EventBanner event={event} alt={event.name} className="mt-3 h-44 rounded-3xl sm:h-72" />
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
        <EventInfo event={event} />
        <BookingPanel event={event} />
      </div>
    </div>
  );
}
