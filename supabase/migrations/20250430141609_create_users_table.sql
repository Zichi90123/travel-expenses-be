create table if not exists public.users (
    id uuid primary key references auth.users (id) on delete cascade,
    email text not null,
    created_at timestamptz default now()
);