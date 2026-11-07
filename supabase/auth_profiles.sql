-- Ejecuta este script una sola vez en el SQL Editor de Supabase.
-- Supabase Auth gestiona contrasenas y sesiones; esta tabla guarda solo el perfil basico.
create table if not exists public.perfiles_usuario (
  id uuid primary key references auth.users (id) on delete cascade,
  correo text not null,
  creado_en timestamptz not null default now()
);

alter table public.perfiles_usuario enable row level security;
grant select on table public.perfiles_usuario to authenticated;

drop policy if exists "Cada usuario consulta su perfil"
  on public.perfiles_usuario;

create policy "Cada usuario consulta su perfil"
  on public.perfiles_usuario
  for select
  to authenticated
  using (auth.uid() = id);

create or replace function public.crear_perfil_usuario()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.perfiles_usuario (id, correo)
  values (new.id, new.email);

  return new;
end;
$$;

drop trigger if exists crear_perfil_al_registrar
  on auth.users;

create trigger crear_perfil_al_registrar
  after insert on auth.users
  for each row
  execute function public.crear_perfil_usuario();
