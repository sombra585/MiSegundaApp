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