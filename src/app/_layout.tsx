import { Stack } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AuthProvider, useAuth } from "../context/AuthContext";

function RootNavigator() {
  const { session, cargando, error, recargarSesion } = useAuth();

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#286052" />
        <Text style={styles.textoCarga}>Preparando tu sesión...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centro}>
        <Text style={styles.tituloError}>No pudimos recuperar tu sesión</Text>
        <Text style={styles.mensajeError}>{error}</Text>
        <Pressable style={styles.botonReintentar} onPress={recargarSesion}>
          <Text style={styles.textoBoton}>Intentar de nuevo</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#F7F4EE",
  },
  textoCarga: {
    color: "#5F7067",
    marginTop: 12,
  },
  tituloError: {
    color: "#143C32",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  mensajeError: {
    color: "#5F7067",
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 18,
  },
  botonReintentar: {
    backgroundColor: "#286052",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 13,
  },
  textoBoton: {
    color: "#FFFDF9",
    fontWeight: "bold",
  },
});
