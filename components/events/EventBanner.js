'use client';

import { useState } from 'react';
import { CATEGORY_ICONS, grad } from '@/lib/util';

/** Event photo with the category gradient as the fallback (no image, or the image fails to load). */
export default function EventBanner({ event, alt = '', className = '', children }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: grad(event.category) }}>
      {event.imageUrl && !failed ? (
        <img
          src={event.imageUrl}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <span aria-hidden="true" className="absolute inset-0 grid select-none place-items-center text-6xl opacity-40">
          {CATEGORY_ICONS[event.category]}
        </span>
      )}
      {children}
    </div>
  );
}
