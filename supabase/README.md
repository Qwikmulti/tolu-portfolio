# Supabase Setup

1. Go to https://supabase.com/dashboard
2. Open your project > SQL Editor
3. Click "New Query"
4. Paste the contents of `schema.sql`
5. Click "Run"

## Enable Email Auth

1. Go to Authentication > Providers
2. Enable "Email" provider
3. Under "SMTP Settings", configure your email provider or use Supabase Auth defaults

## Create Storage Bucket for Guides

1. Go to Storage > New Bucket
2. Name: `guides`
3. Public: ✅ (checked)
4. Save

## Add Admin User

1. Go to Authentication > Users
2. Click "Add User"
3. Enter email + password
4. Set as confirmed

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Find these in: Supabase Dashboard > Project Settings > API
