import { ValidationError } from '../errors';

export const MAX_IMAGE_BYTES = 3 * 1024 * 1024;
const EXTENSIONS = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const ascii = (bytes) => String.fromCharCode(...bytes);

/** Reads the first bytes of the file, so a renamed file cannot pass as an image. */
function detectType(bytes) {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg';
  if (PNG_SIGNATURE.every((byte, i) => bytes[i] === byte)) return 'image/png';
  if (ascii(bytes.slice(0, 4)) === 'RIFF' && ascii(bytes.slice(8, 12)) === 'WEBP') return 'image/webp';
  return null;
}

/** Validates an uploaded file and returns what the storage layer needs. */
export async function validateImageFile(file) {
  if (!file || typeof file.arrayBuffer !== 'function') {
    throw new ValidationError({ file: 'Choose an image to upload.' });
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new ValidationError({ file: 'Image must be 3 MB or smaller.' });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const contentType = detectType(buffer);
  if (!contentType) throw new ValidationError({ file: 'Use a JPG, PNG or WebP image.' });

  return { buffer, contentType, extension: EXTENSIONS[contentType] };
}
