import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#2E7D32",
        },

        headerTintColor: "#FFFFFF",

        headerTitleStyle: {
          fontWeight: "bold",
        },

        contentStyle: {
          backgroundColor: "#F1F8E9",
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
        name="destinos"
        options={{
          title: "Destinos turísticos",
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
    </Stack>
  );
}