import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function Contacto() {
  return (
    <View style={styles.container}>
      <Text style={styles.icono}>📍</Text>

      <Text style={styles.titulo}>Contáctanos</Text>

      <Text style={styles.subtitulo}>
        Información sobre nuestra aplicación de turismo.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Universidad</Text>
        <Text style={styles.valor}>Universidad CESMAG</Text>

        <Text style={styles.label}>Programa</Text>
        <Text style={styles.valor}>Ingeniería de Sistemas</Text>

        <Text style={styles.label}>Asignatura</Text>
        <Text style={styles.valor}>Desarrollo Móvil</Text>

        <Text style={styles.label}>Aplicación</Text>
        <Text style={styles.valor}>Turismo Colombia</Text>

        <Text style={styles.label}>Ciudad</Text>
        <Text style={styles.valor}>Pasto, Nariño</Text>
      </View>
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
    fontSize: 42,
    textAlign: "center",
    marginBottom: 5,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1B5E20",
  },

  subtitulo: {
    textAlign: "center",
    color: "#558B2F",
    marginBottom: 22,
    lineHeight: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#C8E6C9",
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
});