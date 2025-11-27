# 🔐 Supabase Authentication Setup

## 📋 Prerequisites

1. Create a Supabase account at [https://supabase.com](https://supabase.com)
2. Create a new project

## 🚀 Setup Steps

### 1. Get your Supabase credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings** > **API**
3. Copy the following values:
    - **Project URL** (under "Project API keys")
    - **anon/public key** (under "Project API keys")

### 2. Configure environment variables

1. Copy `.env.example` to `.env`:

    ```bash
    cp .env.example .env
    ```

2. Fill in your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=https://your-project.supabase.co
    VITE_SUPABASE_ANON_KEY=your-anon-key-here
    ```

### 3. Enable Email Authentication (Optional)

By default, Supabase requires email confirmation. To disable it for development:

1. Go to **Authentication** > **Providers** > **Email**
2. Toggle off **Confirm email**
3. Save

### 4. Create the Demo User

You have two options:

#### Option A: Using Supabase Dashboard (Recommended for demo)

1. Go to **Authentication** > **Users**
2. Click **Add user** > **Create new user**
3. Enter:
    - **Email**: `demo@example.com`
    - **Password**: `demo123`
    - **Auto Confirm User**: ✅ Enable this
4. Click **Create user**

#### Option B: Sign up through the app

1. Run the application: `pnpm dev`
2. Go to `/register`
3. Create user with:
    - **Email**: `demo@example.com`
    - **Password**: `demo123`

### 5. Run the application

```bash
pnpm dev
```

## 📝 Usage

### Register a new account

- Navigate to `/register`
- Enter email and password
- If email confirmation is enabled, check your email

### Login

- Navigate to `/login`
- Enter your credentials

### Logout

- Click on your avatar in the header
- Select "Logout"

## 🔒 Protected Routes

All routes except `/login` and `/register` are protected and require authentication.

## 🎨 Features

- ✅ Email/Password authentication
- ✅ Session persistence
- ✅ Protected routes
- ✅ User menu with logout
- ✅ Loading states
- ✅ Error handling
- ✅ Toast notifications

## 🔄 Next Steps (Optional)

### Add OAuth Providers

1. Go to **Authentication** > **Providers**
2. Enable providers (Google, GitHub, etc.)
3. Configure redirect URLs

### Add User Profiles

Create a `profiles` table:

```sql
create table profiles (
  id uuid references auth.users on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (id)
);
```

### Add Row Level Security (RLS)

```sql
alter table profiles enable row level security;

create policy "Users can view their own profile"
  on profiles for select
  using (auth.uid() = id);
```

## 🐛 Troubleshooting

### "Missing Supabase environment variables" error

- Make sure you created the `.env` file
- Verify the environment variable names match exactly (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`)
- Restart the dev server after creating/updating `.env`

### Email not sending

- Check your Supabase email quota (free tier has limits)
- Configure a custom SMTP provider in **Settings** > **Auth** > **Email Templates**

### Session not persisting

- Check browser console for errors
- Clear localStorage and cookies
- Verify your Supabase URL is correct
