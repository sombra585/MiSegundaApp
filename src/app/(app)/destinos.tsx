import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Destinos() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.etiqueta}>RUTAS DE NARIÑO</Text>
      <Text style={styles.titulo}>Destinos turísticos</Text>

      <Text style={styles.subtitulo}>
        Descubre algunos de los lugares más representativos de Nariño.
      </Text>

      <View style={styles.card}>
        <View style={styles.imagenContenedor}>
          <Image source={require("../../../assets/img/cocha.jpg")} style={styles.imagen} resizeMode="cover" />
          <View style={styles.imagenCapa} />
          <Text style={styles.numeroDestino}>01</Text>
        </View>
        <View style={styles.contenido}>
          <Text style={styles.tituloDestino}>Laguna de La Cocha</Text>
          <Text style={styles.descripcion}>
            Descubre la belleza natural de la Laguna de La Cocha, uno de los
            lugares turísticos más representativos de Nariño, rodeado de
            montañas y paisajes naturales.
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.imagenContenedor}>
          <Image source={require("../../../assets/img/lajas.jpg")} style={styles.imagen} resizeMode="cover" />
          <View style={styles.imagenCapa} />
          <Text style={styles.numeroDestino}>02</Text>
        </View>
        <View style={styles.contenido}>
          <Text style={styles.tituloDestino}>Santuario de Las Lajas</Text>
          <Text style={styles.descripcion}>
            Conoce el Santuario de Las Lajas, uno de los lugares más
            emblemáticos de Nariño, reconocido por su impresionante
            arquitectura y su ubicación sobre el cañón del río Guáitara.
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.imagenContenedor}>
          <Image source={require("../../../assets/img/lagunaVerde.jpg")} style={styles.imagen} resizeMode="cover" />
          <View style={styles.imagenCapa} />
          <Text style={styles.numeroDestino}>03</Text>
        </View>
        <View style={styles.contenido}>
          <Text style={styles.tituloDestino}>Laguna Verde</Text>
          <Text style={styles.descripcion}>
            Admira los tonos intensos de la Laguna Verde, un paisaje natural
            de Nariño que reúne tranquilidad, montaña y una belleza única.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F7F4EE",
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#143C32",
    marginBottom: 6,
  },

  etiqueta: {
    color: "#A06C4B",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1.6,
    marginBottom: 8,
  },

  subtitulo: {
    textAlign: "center",
    color: "#5F7067",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 22,
  },

  card: {
    backgroundColor: "#FFFDF9",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E6DED2",
    elevation: 2,
  },

  imagen: {
    width: "100%",
    height: 230,
  },

  imagenContenedor: {
    height: 230,
    position: "relative",
  },

  imagenCapa: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(20, 60, 50, 0.18)",
  },

  numeroDestino: {
    position: "absolute",
    top: 14,
    left: 16,
    color: "#FFFDF9",
    fontSize: 16,
    fontWeight: "bold",
  },

  contenido: {
    padding: 16,
  },

  tituloDestino: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#143C32",
    marginBottom: 8,
  },

  descripcion: {
    fontSize: 14,
    color: "#5F7067",
    lineHeight: 21,
  },
});