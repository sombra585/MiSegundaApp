# Turismo Colombia

Aplicación móvil y web para explorar destinos turísticos de Nariño, planificar
viajes y consultar viajeros registrados. Está construida con Expo SDK 57,
React Native, TypeScript, Expo Router y Supabase.

## Estructura

```text
src/
  app/
    _layout.tsx
    (auth)/
      _layout.tsx
      login.tsx
      registro.tsx
    (app)/
      _layout.tsx
      index.tsx
      formulario.tsx
      resultado.tsx
      registros.tsx
      destinos.tsx
      imagenes.tsx
      contacto.tsx
  context/
    AuthContext.tsx
  lib/
    auth-validation.ts
    supabase.ts
  components/
  constants/
  hooks/
assets/
supabase/
```

`src/app/` contiene las rutas de Expo Router. `src/context/` y `src/lib/`
contienen el estado de autenticación, el cliente de Supabase y validaciones
compartidas. Los componentes, tema y hooks reutilizables también están en `src/`.

## Desarrollo

Instala las dependencias y arranca Expo:

```bash
npm install
npx expo start
```

También están disponibles `npm run android`, `npm run ios`, `npm run web` y
`npm run lint`.

## Supabase

La autenticación y los registros de viajeros usan Supabase. Los scripts
`supabase/auth_profiles.sql` y
`supabase/usuarios_viaje_auth_policies.sql` documentan la configuración de
perfiles y políticas RLS; el segundo presupone que la tabla
`public.usuarios_viaje` ya existe. Ejecútalos desde el SQL Editor del proyecto
Supabase correspondiente cuando aplique.
