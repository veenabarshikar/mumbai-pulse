import crypto from 'crypto';
import { getClient } from '../supabase';
import { AppError } from '../errors';

const BUCKET = 'event-images';

/** Stores the image under a random name and returns its public URL. */
export async function uploadEventImage({ buffer, contentType, extension }) {
  const path = `${crypto.randomUUID()}.${extension}`;
  const storage = getClient().storage.from(BUCKET);

  const { error } = await storage.upload(path, buffer, { contentType, upsert: false });
  if (error) {
    console.error('[storage]', error.message);
    throw new AppError('Could not upload the image. Please try again.', 500);
  }
  return storage.getPublicUrl(path).data.publicUrl;
}
