import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Resultado() {
  const router = useRouter();

  const { id, nombre, correo, telefono, ciudad, destinoFavorito, tipoPreparacion } =
    useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.icono}>🧳</Text>

      <Text style={styles.titulo}>¡Todo listo!</Text>

      <Text style={styles.subtitulo}>
        Estos son los datos registrados para tu experiencia turística.
      </Text>

      <View style={styles.card}>
        <Text style={styles.registro}>Registro #{String(id ?? "")}</Text>

        <Text style={styles.label}>Viajero</Text>
        <Text style={styles.valor}>{nombre}</Text>

        <Text style={styles.label}>Correo electrónico</Text>
        <Text style={styles.valor}>{correo}</Text>

        <Text style={styles.label}>Teléfono</Text>
        <Text style={styles.valor}>{telefono}</Text>

        <Text style={styles.label}>Ciudad de origen</Text>
        <Text style={styles.valor}>{ciudad}</Text>

        <Text style={styles.label}>Destino favorito</Text>
        <Text style={styles.valor}>{destinoFavorito}</Text>

        <Text style={styles.label}>Tipo de preparación</Text>
        <Text style={styles.valor}>{tipoPreparacion}</Text>
      </View>

      <Pressable
        style={styles.boton}
        onPress={() => router.push("/registros")}
      >
        <Text style={styles.botonTexto}>Ver viajeros registrados</Text>
      </Pressable>

      <Pressable
        style={styles.botonSecundario}
        onPress={() => router.replace("/(app)")}
      >
        <Text style={styles.botonSecundarioTexto}>Volver al inicio</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F4EE",
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
    color: "#143C32",
    textAlign: "center",
  },

  subtitulo: {
    color: "#5F7067",
    textAlign: "center",
    marginBottom: 22,
    lineHeight: 20,
  },

  card: {
    backgroundColor: "#FFFDF9",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E6DED2",
    marginBottom: 18,
    elevation: 3,
  },

  registro: {
    color: "#A06C4B",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 8,
  },

  label: {
    color: "#A06C4B",
    fontSize: 13,
    marginTop: 8,
  },

  valor: {
    color: "#143C32",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 8,
  },

  boton: {
    backgroundColor: "#286052",
    padding: 14,
    borderRadius: 13,
    alignItems: "center",
  },

  botonTexto: {
    color: "#FFFDF9",
    fontWeight: "bold",
  },

  botonSecundario: {
    alignItems: "center",
    marginTop: 14,
  },

  botonSecundarioTexto: {
    color: "#286052",
    fontWeight: "bold",
  },
});