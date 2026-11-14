import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#143C32",
        },

        headerTintColor: "#FFFDF9",

        headerShadowVisible: false,

        headerTitleAlign: "center",

        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 17,
        },

        contentStyle: {
          backgroundColor: "#F7F4EE",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Turismo Colombia",
        }}
      />

      <Stack.Screen
        name="formulario"
        options={{
          title: "Planifica tu viaje",
        }}
      />

      <Stack.Screen
        name="resultado"
        options={{
          title: "Datos del viaje",
        }}
      />

      <Stack.Screen
        name="registros"
        options={{
          title: "Viajeros registrados",
        }}
      />

      <Stack.Screen
        name="imagenes"
        options={{
          title: "Galería",
        }}
      />

      <Stack.Screen
        name="contacto"
        options={{
          title: "Contáctanos",
        }}
      />

      <Stack.Screen
        name="detalle"
        options={{
          title: "Detalle del destino",
        }}
      />

      <Stack.Screen
        name="detalle-item"
        options={{
          title: "Ficha del destino",
        }}
      />

      <Stack.Screen
        name="catalogo"
        options={{
          title: "Catálogo de destinos",
        }}
      />

      <Stack.Screen
        name="escanear"
        options={{
          title: "Escanear código QR",
        }}
      />
    </Stack>
  );
}