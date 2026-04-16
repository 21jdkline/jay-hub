-- Jay Hub schema — uses jay_hub_ prefix on shared howl-pack Supabase project
-- Run against: https://qlksnddlijlwgysovrky.supabase.co

-- Profiles
CREATE TABLE IF NOT EXISTS jay_hub_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT DEFAULT '',
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE jay_hub_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own profile" ON jay_hub_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON jay_hub_profiles FOR UPDATE USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION jay_hub_create_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO jay_hub_profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS jay_hub_on_auth_user_created ON auth.users;
CREATE TRIGGER jay_hub_on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION jay_hub_create_profile();

-- Ventures tracker
CREATE TYPE jay_hub_venture_status AS ENUM ('Idea', 'Building', 'Live', 'Paused', 'Dropped');

CREATE TABLE IF NOT EXISTS jay_hub_ventures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  status jay_hub_venture_status DEFAULT 'Idea',
  description TEXT DEFAULT '',
  next_milestone TEXT DEFAULT '',
  revenue NUMERIC(12,2) DEFAULT 0,
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE jay_hub_ventures ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own ventures" ON jay_hub_ventures FOR ALL USING (auth.uid() = user_id);

-- Tasks
CREATE TABLE IF NOT EXISTS jay_hub_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  project TEXT DEFAULT 'General',
  priority INT DEFAULT 0,
  due_date DATE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE jay_hub_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own tasks" ON jay_hub_tasks FOR ALL USING (auth.uid() = user_id);

-- Activity feed
CREATE TABLE IF NOT EXISTS jay_hub_activity_feed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  project TEXT NOT NULL,
  action_type TEXT NOT NULL,
  summary TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE jay_hub_activity_feed ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own activity" ON jay_hub_activity_feed FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users create own activity" ON jay_hub_activity_feed FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_jay_hub_activity_user_date ON jay_hub_activity_feed (user_id, created_at DESC);

-- Momentum scores
CREATE TABLE IF NOT EXISTS jay_hub_momentum (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  score INT NOT NULL DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  breakdown JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, date)
);

ALTER TABLE jay_hub_momentum ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own momentum" ON jay_hub_momentum FOR ALL USING (auth.uid() = user_id);
