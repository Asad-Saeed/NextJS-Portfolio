-- Contact form messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_messages_user_id ON messages(user_id);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Anyone can send a message (insert)
CREATE POLICY "Public insert" ON messages FOR INSERT WITH CHECK (true);

-- Only the portfolio owner can read their messages
CREATE POLICY "Owner read" ON messages FOR SELECT USING (auth.uid() = user_id);

-- Owner can update (mark as read) and delete
CREATE POLICY "Owner update" ON messages FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Owner delete" ON messages FOR DELETE USING (auth.uid() = user_id);
