-- Run once in the Supabase SQL Editor. Adds event images.
alter table events add column if not exists image_url text;

-- Public bucket (anyone can view images by URL). Uploads go through the server only.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('event-images', 'event-images', true, 3145728, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
  set public = true,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;
