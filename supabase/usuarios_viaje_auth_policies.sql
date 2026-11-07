-- Ejecuta este script en el SQL Editor de Supabase.
-- Permite que usuarios autenticados registren viajeros y consulten la lista existente.
-- No borra ni modifica los registros actuales de public.usuarios_viaje.

alter table public.usuarios_viaje enable row level security;

grant select, insert on table public.usuarios_viaje to authenticated;

drop policy if exists "Viajeros autenticados pueden registrarse"
  on public.usuarios_viaje;

create policy "Viajeros autenticados pueden registrarse"
  on public.usuarios_viaje
  for insert
  to authenticated
  with check (true);

drop policy if exists "Usuarios autenticados pueden consultar viajeros"
  on public.usuarios_viaje;

create policy "Usuarios autenticados pueden consultar viajeros"
  on public.usuarios_viaje
  for select
  to authenticated
  using (true);
