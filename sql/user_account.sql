-- Create enum types
CREATE TYPE user_access_type_enum AS ENUM ('user', 'sub');
CREATE TYPE user_type_enum AS ENUM ('parent', 'kid');

-- Create account table
CREATE TABLE account (
  account_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_name TEXT NOT NULL,
  account_owner UUID, -- Temporarily set without foreign key to user table
  account_invitation TEXT UNIQUE NOT NULL,
  account_invitation_expiry DATE DEFAULT now(),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create user table
CREATE TABLE "user" (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_auth_id UUID, -- Supabase Auth UUID
  account_id UUID REFERENCES account(account_id), -- Account the user belongs to
  user_access_type user_access_type_enum NOT NULL, -- User access type (user or sub)
  user_type user_type_enum NOT NULL, -- User type (parent or kid)
  user_nickname TEXT NOT NULL,
  user_dob DATE,
  avatar_id TEXT,
  user_xp INTEGER DEFAULT 0 CHECK (user_xp >= 0),
  user_star INTEGER DEFAULT 0 CHECK (user_star >= 0),
  user_energy INTEGER DEFAULT 3,
  user_energy_last_lost DATE,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Adding constraint to account.account_owner
ALTER TABLE account
ADD CONSTRAINT fk_account_owner
FOREIGN KEY (account_owner) REFERENCES "user"(user_id);

-- Trigger function to auto-update 'updated_at' on row modification
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to account and user tables
CREATE TRIGGER set_updated_at_account
BEFORE UPDATE ON "account"
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER set_updated_at_user
BEFORE UPDATE ON "user"
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();
