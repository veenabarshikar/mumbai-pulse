'use client';

import { useState } from 'react';
import { api } from '@/lib/client/api';

const MAX_BYTES = 3 * 1024 * 1024;
const TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function ImageUpload({ value, onChange }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [link, setLink] = useState('');

  async function handleFile(changeEvent) {
    const file = changeEvent.target.files?.[0];
    changeEvent.target.value = '';
    if (!file) return;

    setError('');
    if (!TYPES.includes(file.type)) return setError('Use a JPG, PNG or WebP image.');
    if (file.size > MAX_BYTES) return setError('Image must be 3 MB or smaller.');

    setBusy(true);
    try {
      const body = new FormData();
      body.append('file', file);
      const { url } = await api.upload('/api/uploads', body);
      onChange(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <label htmlFor="event-image" className="mb-1 block text-sm font-bold">Event image (optional)</label>
      {value && (
        <div className="mb-2 flex items-center gap-3">
          <img src={value} alt="Event preview" className="h-20 w-32 rounded-lg object-cover" />
          <button type="button" className="btn btn-ghost !px-3 !py-1" onClick={() => onChange('')}>Remove</button>
        </div>
      )}
      <input
        id="event-image"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFile}
        disabled={busy}
        className="inp"
      />
      <div className="mt-2 flex gap-2">
        <input
          type="url"
          className="inp"
          placeholder="…or paste an image link (https)"
          aria-label="Image link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-ghost"
          disabled={!link.trim()}
          onClick={() => {
            onChange(link.trim());
            setLink('');
          }}
        >
          Use link
        </button>
      </div>
      {busy && <p className="text-sm text-slate-500">Uploading…</p>}
      <p className="err" role="alert">{error}</p>
    </div>
  );
}
