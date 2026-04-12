ALTER TABLE profile
  ADD COLUMN IF NOT EXISTS availability_status TEXT NOT NULL DEFAULT 'open_to_work';
