'use client';

import { useCallback, useEffect, useState } from 'react';
import { api } from '@/lib/client/api';
import { LOCS } from '@/lib/util';
import StatCards from '@/components/admin/StatCards';
import EventsTable from '@/components/admin/EventsTable';
import BookingsList from '@/components/admin/BookingsList';
import EventFormModal from '@/components/admin/EventFormModal';

const BLANK_EVENT = {
  name: '', category: 'Music', date: '', time: '18:00', location: LOCS[0], venue: '',
  price: 0, totalSeats: 100, organizer: '', description: '', featured: false, imageUrl: '',
};

export default function AdminPage() {
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [tab, setTab] = useState('events');
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [pageError, setPageError] = useState('');
  const [busy, setBusy] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const load = useCallback(async () => {
    try {
      const [eventList, bookingList] = await Promise.all([
        api.get('/api/events?upcoming=0'),
        api.get('/api/bookings'),
      ]);
      setEvents(eventList);
      setBookings(bookingList);
      setPageError('');
    } catch (error) {
      setPageError(error.message);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const closeForm = () => {
    setForm(null);
    setErrors({});
    setFormError('');
  };

  async function handleSave(submitEvent) {
    submitEvent.preventDefault();
    setBusy(true);
    setErrors({});
    setFormError('');
    try {
      if (form.id) await api.put(`/api/events/${form.id}`, form);
      else await api.post('/api/events', form);
      closeForm();
      await load();
    } catch (error) {
      setFormError(error.message);
      setErrors(error.fieldErrors || {});
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id) {
    if (confirmDeleteId !== id) {
      setConfirmDeleteId(id);
      return;
    }
    try {
      await api.delete(`/api/events/${id}`);
      setConfirmDeleteId(null);
      await load();
    } catch (error) {
      setPageError(error.message);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-extrabold">Admin dashboard</h1>
        <button className="btn btn-acc" onClick={() => setForm(BLANK_EVENT)}>Add event</button>
      </div>
      {pageError && <p role="alert" className="mt-3 text-red-700">{pageError}</p>}
      <StatCards events={events} bookings={bookings} />
      <div className="mb-3 flex gap-2">
        {['events', 'bookings'].map((name) => (
          <button key={name} onClick={() => setTab(name)} className={`btn capitalize ${tab === name ? '' : 'btn-ghost'}`}>
            {name}
          </button>
        ))}
      </div>
      {tab === 'events' ? (
        <EventsTable events={events} confirmDeleteId={confirmDeleteId} onEdit={setForm} onDelete={handleDelete} />
      ) : (
        <BookingsList bookings={bookings} />
      )}
      {form && (
        <EventFormModal
          form={form}
          errors={errors}
          formError={formError}
          busy={busy}
          onChange={(name, value) => setForm((current) => ({ ...current, [name]: value }))}
          onSubmit={handleSave}
          onCancel={closeForm}
        />
      )}
    </div>
  );
}
