-- Table: groups
create table groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  created_at timestamptz default now()
);

-- Table: members (relazione utenti-gruppi)
create table members (
  user_id uuid references users(id) on delete cascade,
  group_id uuid references groups(id) on delete cascade,
  joined_at timestamptz default now(),
  primary key (user_id, group_id)
);

-- Table: expenses
create table expenses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  amount numeric(10,2) not null check (amount >= 0),
  paid_by uuid references users(id) on delete set null,
  group_id uuid references groups(id) on delete cascade,
  created_at timestamptz default now(),
  description text
);

-- Table: categories (statiche o personalizzate per utente)
create table categories (
  id serial primary key,
  name text not null,
  user_id uuid references users(id) on delete cascade, -- nullable per categorie globali
  group_id uuid references groups(id) on delete cascade, -- nullable per categorie globali
  unique (name, user_id, group_id) -- una categoria può essere globale o per utente/gruppo
);

-- Table: expense_categories (relazione spesa-categoria)
create table expense_categories (
  expense_id uuid references expenses(id) on delete cascade,
  category_id int references categories(id) on delete cascade,
  primary key (expense_id, category_id)
);

-- Insert default categories (categorie predefinite globali)
insert into categories (name, user_id, group_id) values
  ('Cibo', null, null),    -- Categoria globale
  ('Trasporti', null, null),
  ('Alloggio', null, null),
  ('Divertimento', null, null),
  ('Shopping', null, null),
  ('Altro', null, null)
on conflict do nothing;
