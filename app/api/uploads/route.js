import { handle, ok } from '@/lib/http';
import { AppError } from '@/lib/errors';
import { validateImageFile } from '@/lib/validators/imageValidator';
import { uploadEventImage } from '@/lib/repositories/imageRepository';

export const dynamic = 'force-dynamic';

export const POST = handle(async (request) => {
  let form;
  try {
    form = await request.formData();
  } catch {
    throw new AppError('Upload must be a form with a file.', 400);
  }

  const image = await validateImageFile(form.get('file'));
  return ok({ url: await uploadEventImage(image) }, 201);
});
