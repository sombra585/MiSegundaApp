import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Destinos() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>
        Destinos turísticos
      </Text>

      <Text style={styles.subtitulo}>
        Descubre algunos de los lugares más representativos
        de Nariño.
      </Text>

      <View style={styles.card}>
        <Image
          source={require("../../assets/img/cocha.jpg")}
          style={styles.imagen}
        />

        <View style={styles.contenido}>
          <Text style={styles.tituloDestino}>
            Laguna de La Cocha
          </Text>

          <Text style={styles.descripcion}>
            Descubre la belleza natural de la Laguna de La Cocha,
            uno de los lugares turísticos más representativos de
            Nariño, rodeado de montañas y paisajes naturales.
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Image
          source={require("../../assets/img/lajas.jpg")}
          style={styles.imagen}
        />

        <View style={styles.contenido}>
          <Text style={styles.tituloDestino}>
            Santuario de Las Lajas
          </Text>

          <Text style={styles.descripcion}>
            Conoce el Santuario de Las Lajas, uno de los lugares
            más emblemáticos de Nariño, reconocido por su
            impresionante arquitectura y su ubicación sobre el
            cañón del río Guáitara.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F1F8E9",
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1B5E20",
    marginBottom: 6,
  },

  subtitulo: {
    textAlign: "center",
    color: "#558B2F",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 22,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 4,
  },

  imagen: {
    width: "100%",
    height: 230,
  },

  contenido: {
    padding: 16,
  },

  tituloDestino: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 8,
  },

  descripcion: {
    fontSize: 14,
    color: "#558B2F",
    lineHeight: 21,
  },
});