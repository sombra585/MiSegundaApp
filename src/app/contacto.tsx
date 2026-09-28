import {
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function Contacto() {
  return (
    <View style={styles.container}>
      <View style={styles.marca}>
        <Text style={styles.marcaTexto}>TC</Text>
      </View>

      <Text style={styles.etiqueta}>TURISMO COLOMBIA</Text>

      <Text style={styles.titulo}>Contáctanos</Text>

      <Text style={styles.subtitulo}>
        Información sobre nuestra aplicación de turismo.
      </Text>

      <View style={styles.card}>
        <View style={styles.acento} />
        <Text style={styles.tituloCard}>Información del proyecto</Text>

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
    backgroundColor: "#F7F4EE",
    justifyContent: "center",
    padding: 20,
  },

  marca: {
    width: 68,
    height: 68,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#143C32",
    borderWidth: 1,
    borderColor: "#B08B57",
    marginBottom: 15,
  },

  marcaTexto: {
    color: "#EFCF8B",
    fontSize: 21,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  etiqueta: {
    color: "#A06C4B",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1.7,
    textAlign: "center",
    marginBottom: 8,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#143C32",
  },

  subtitulo: {
    textAlign: "center",
    color: "#5F7067",
    marginBottom: 22,
    lineHeight: 20,
  },

  card: {
    backgroundColor: "#FFFDF9",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E6DED2",
    elevation: 3,
  },

  acento: {
    width: 42,
    height: 3,
    backgroundColor: "#EFCF8B",
    borderRadius: 3,
    marginBottom: 15,
  },

  tituloCard: {
    color: "#143C32",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
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
});