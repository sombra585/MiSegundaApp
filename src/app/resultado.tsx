import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

export default function Resultado() {
  const router = useRouter();

  const { nombre, correo, telefono, ciudad } =
    useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.icono}>🧳</Text>

      <Text style={styles.titulo}>¡Todo listo!</Text>

      <Text style={styles.subtitulo}>
        Estos son los datos registrados para tu experiencia turística.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Viajero</Text>
        <Text style={styles.valor}>{nombre}</Text>

        <Text style={styles.label}>Correo electrónico</Text>
        <Text style={styles.valor}>{correo}</Text>

        <Text style={styles.label}>Teléfono</Text>
        <Text style={styles.valor}>{telefono}</Text>

        <Text style={styles.label}>Ciudad de origen</Text>
        <Text style={styles.valor}>{ciudad}</Text>
      </View>

      <Pressable
        style={styles.boton}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.botonTexto}>Volver al inicio</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F8E9",
    justifyContent: "center",
    padding: 20,
  },

  icono: {
    fontSize: 45,
    textAlign: "center",
    marginBottom: 5,
  },

  titulo: {
    fontSize: 29,
    fontWeight: "bold",
    color: "#1B5E20",
    textAlign: "center",
  },

  subtitulo: {
    color: "#558B2F",
    textAlign: "center",
    marginBottom: 22,
    lineHeight: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#C8E6C9",
    marginBottom: 18,
    elevation: 3,
  },

  label: {
    color: "#689F38",
    fontSize: 13,
    marginTop: 8,
  },

  valor: {
    color: "#1B5E20",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 8,
  },

  boton: {
    backgroundColor: "#2E7D32",
    padding: 14,
    borderRadius: 13,
    alignItems: "center",
  },

  botonTexto: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});