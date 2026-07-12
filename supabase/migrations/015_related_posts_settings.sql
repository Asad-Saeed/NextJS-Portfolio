-- Add related posts section settings to profile
alter table profile
  add column if not exists show_related_posts boolean default true,
  add column if not exists related_posts_eyebrow text,
  add column if not exists related_posts_heading text;
