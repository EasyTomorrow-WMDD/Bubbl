-- This file contains the SQL commands to create database objects related to parent stories.

-- Enumeration type for parent story types
CREATE TYPE parent_story_type_enum AS ENUM (
  'essentials',
  'bullying',
  'hygiene',
  'sex_ed',
  'habit_building'
);

-- Table to store parent stories
CREATE TABLE ref_parent_story (
  parent_story_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_story_number INTEGER NOT NULL,
  parent_story_title TEXT NOT NULL,
  parent_story_type parent_story_type_enum NOT NULL,
  parent_story_featured_image_url TEXT,
  parent_story_summary TEXT,
  parent_story_details TEXT, -- stores markdown content
  parent_story_author TEXT,
  parent_story_published_date TIMESTAMP,
  parent_story_external_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table to store user read status for parent stories
CREATE TABLE user_read_status (
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  parent_story_id UUID NOT NULL REFERENCES ref_parent_story(parent_story_id) ON DELETE CASCADE,
  user_parent_story_read BOOLEAN DEFAULT FALSE,
  user_parent_story_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, parent_story_id)
);

CREATE INDEX idx_story_type ON ref_parent_story(parent_story_type);
CREATE INDEX idx_user_read ON user_read_status(user_id, user_parent_story_read);

-- Add trigger to update 'updated_at' for ref_parent_story table
CREATE TRIGGER set_updated_at_story
BEFORE UPDATE ON ref_parent_story
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

-- Add trigger to update 'updated_at' for user_read_status table
CREATE TRIGGER set_updated_at_user_read_status
BEFORE UPDATE ON user_read_status
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

-- Enable row-level security
ALTER TABLE ref_parent_story ENABLE ROW LEVEL SECURITY;

-- Allow all signed-in users to read parent stories
CREATE POLICY "Authenticated users can read parent stories"
  ON ref_parent_story
  FOR SELECT
  USING (
    auth.uid() IS NOT NULL
  );

-- Enable RLS
ALTER TABLE user_read_status ENABLE ROW LEVEL SECURITY;

-- Full access to a user’s own data (based on account matching)
CREATE POLICY "Can access user_read_status of same account"
  ON user_read_status
  FOR ALL
  USING (
    EXISTS (
      SELECT 1
      FROM public.user AS parent
      WHERE parent.user_auth_id = auth.uid()
        AND parent.account_id = (
          SELECT u.account_id FROM public.user AS u WHERE u.user_id = user_read_status.user_id
        )
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.user AS parent
      WHERE parent.user_auth_id = auth.uid()
        AND parent.account_id = (
          SELECT u.account_id FROM public.user AS u WHERE u.user_id = user_read_status.user_id
        )
    )
  );
