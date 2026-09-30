import { CATS, LOCS } from '../util';
import { ValidationError } from '../errors';

const text = (value, max) => String(value ?? '').trim().slice(0, max);
const isRealDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));

const isHttpsUrl = (value) => {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
};

/** Validates and cleans an event body for create and update. */
export function validateEventInput(body) {
  if (typeof body !== 'object' || body === null) {
    throw new ValidationError({ body: 'Invalid request.' });
  }

  const event = {
    name: text(body.name, 150),
    category: text(body.category, 30),
    date: text(body.date, 10),
    time: text(body.time, 5),
    location: text(body.location, 60),
    venue: text(body.venue, 150),
    price: Number(body.price ?? 0),
    totalSeats: Number(body.totalSeats),
    organizer: text(body.organizer, 100),
    description: text(body.description, 2000),
    featured: Boolean(body.featured),
    imageUrl: text(body.imageUrl, 500),
  };

  const errors = {};
  if (event.name.length < 3) errors.name = 'Event name must be at least 3 characters.';
  if (!(event.category in CATS)) errors.category = 'Choose a valid category.';
  if (!LOCS.includes(event.location)) errors.location = 'Choose a valid location.';
  if (!isRealDate(event.date)) errors.date = 'Enter a valid date.';
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(event.time)) errors.time = 'Enter a valid time.';
  if (!event.venue) errors.venue = 'Venue is required.';
  if (!Number.isInteger(event.price) || event.price < 0 || event.price > 100000) {
    errors.price = 'Price must be a whole number between 0 and 100000.';
  }
  if (!Number.isInteger(event.totalSeats) || event.totalSeats < 1 || event.totalSeats > 100000) {
    errors.totalSeats = 'Seats must be a whole number between 1 and 100000.';
  }
  if (event.imageUrl && !isHttpsUrl(event.imageUrl)) errors.imageUrl = 'Image link must be a valid https URL.';

  if (Object.keys(errors).length) throw new ValidationError(errors);
  return event;
}
