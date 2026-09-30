/** Converts between database rows (snake_case) and API objects (camelCase). */
const shortTime = (time) => String(time).slice(0, 5);

export const eventFromRow = (row) =>
  row && {
    id: row.id,
    name: row.name,
    category: row.category,
    date: row.date,
    time: shortTime(row.time),
    location: row.location,
    venue: row.venue,
    price: row.price,
    totalSeats: row.total_seats,
    booked: row.booked,
    organizer: row.organizer,
    description: row.description,
    featured: row.featured,
    imageUrl: row.image_url ?? '',
  };

export const eventToRow = (event) => ({
  name: event.name,
  category: event.category,
  date: event.date,
  time: event.time,
  location: event.location,
  venue: event.venue,
  price: event.price,
  total_seats: event.totalSeats,
  organizer: event.organizer,
  description: event.description,
  featured: event.featured,
  image_url: event.imageUrl || null,
});

export const bookingFromRow = (row) => ({
  ref: row.ref,
  eventId: row.event_id,
  eventName: row.event_name,
  date: row.date,
  time: shortTime(row.time),
  venue: row.venue,
  name: row.name,
  email: row.email,
  phone: row.phone,
  tickets: row.tickets,
  total: row.total,
  createdAt: row.created_at,
});
