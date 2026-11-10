import { StyleSheet, Text, View } from "react-native";

export default function Detalle() {
  return (
    <View style={styles.container}>
      <Text style={styles.etiqueta}>TURISMO COLOMBIA</Text>
      <Text style={styles.titulo}>Detalle</Text>
      <Text style={styles.descripcion}>
        Aquí encontrarás información detallada sobre tu selección.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F7F4EE",
    padding: 24,
  },
  etiqueta: {
    color: "#A06C4B",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1.6,
    marginBottom: 8,
  },
  titulo: {
    color: "#143C32",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  descripcion: {
    color: "#5F7067",
    fontSize: 15,
    lineHeight: 23,
  },
});