-- Tolu Portfolio Admin Panel Schema
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard
-- Navigate to: SQL Editor > New Query > paste this schema > Run

-- Subscribers (newsletter)
create table if not exists subscribers (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  subscribed_at timestamptz default now(),
  source text default 'newsletter'
);

-- Contact messages
create table if not exists messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  role text,
  message text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- Community join applications
create table if not exists community_members (
  id uuid default gen_random_uuid() primary key,
  first_name text not null,
  last_name text not null,
  email text not null,
  role text not null,
  challenge text,
  is_approved boolean default false,
  created_at timestamptz default now()
);

-- Blog articles
create table if not exists blog_articles (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  excerpt text,
  content text not null,
  date text,
  read_time text,
  category text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Downloadable guides
create table if not exists guides (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  storage_path text not null,
  file_name text not null,
  file_size bigint,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table subscribers enable row level security;
alter table messages enable row level security;
alter table community_members enable row level security;
alter table blog_articles enable row level security;
alter table guides enable row level security;

-- Admin policy: only authenticated users can manage data
create policy "Admin full access" on subscribers for all using (auth.role() = 'authenticated');
create policy "Admin full access" on messages for all using (auth.role() = 'authenticated');
create policy "Admin full access" on community_members for all using (auth.role() = 'authenticated');
create policy "Admin full access" on blog_articles for all using (auth.role() = 'authenticated');
create policy "Admin full access" on guides for all using (auth.role() = 'authenticated');
