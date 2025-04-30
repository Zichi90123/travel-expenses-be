alter table groups
  add column owner uuid references users(id) on delete set null;