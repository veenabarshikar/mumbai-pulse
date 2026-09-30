import Field from '@/components/ui/Field';
import ImageUpload from './ImageUpload';
import { CATS, LOCS } from '@/lib/util';

function Select({ label, value, options, onChange }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-bold">{label}</label>
      <select className="inp" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </div>
  );
}

export default function EventFormModal({ form, errors, formError, busy, onChange, onSubmit, onCancel }) {
  const bind = (name) => ({
    id: name,
    value: form[name],
    error: errors[name],
    onChange: (e) => onChange(name, e.target.value),
  });

  return (
    <div className="fixed inset-0 z-30 grid place-items-center overflow-y-auto bg-black/60 p-4">
      <form onSubmit={onSubmit} noValidate className="w-full max-w-lg space-y-2 rounded-2xl bg-white p-5">
        <h2 className="text-xl font-bold">{form.id ? 'Edit event' : 'Add event'}</h2>
        <Field label="Event name" {...bind('name')} />
        <div className="grid gap-3 sm:grid-cols-2">
          <Select label="Category" value={form.category} options={Object.keys(CATS)} onChange={(v) => onChange('category', v)} />
          <Select label="Location" value={form.location} options={LOCS} onChange={(v) => onChange('location', v)} />
          <Field label="Date" type="date" {...bind('date')} />
          <Field label="Time" type="time" {...bind('time')} />
          <Field label="Price (₹)" type="number" min="0" {...bind('price')} />
          <Field label="Total seats" type="number" min="1" {...bind('totalSeats')} />
        </div>
        <Field label="Venue" {...bind('venue')} />
        <Field label="Organizer" {...bind('organizer')} />
        <ImageUpload value={form.imageUrl} onChange={(url) => onChange('imageUrl', url)} />
        <div>
          <label className="mb-1 block text-sm font-bold">Description</label>
          <textarea rows="3" className="inp" value={form.description} onChange={(e) => onChange('description', e.target.value)} />
        </div>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.featured} onChange={(e) => onChange('featured', e.target.checked)} />
          Featured
        </label>
        {formError && <p className="err" role="alert">{formError}</p>}
        <div className="flex justify-end gap-2">
          <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="btn" disabled={busy}>{busy ? 'Saving…' : 'Save event'}</button>
        </div>
      </form>
    </div>
  );
}
