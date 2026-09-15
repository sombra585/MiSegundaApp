import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Imagenes() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>
        Galería de imágenes
      </Text>

      <Text style={styles.subtitulo}>
        Disfruta de algunos paisajes y lugares turísticos de Colombia.
      </Text>

      <View style={styles.galeria}>
        <View style={styles.imagenContainer}>
          <Image
            source={require("../../assets/img/turismo.jpg")}
            style={styles.imagen}
          />
        </View>

        <View style={styles.imagenContainer}>
          <Image
            source={require("../../assets/img/cocha.jpg")}
            style={styles.imagen}
          />
        </View>

        <View style={styles.imagenContainer}>
          <Image
            source={require("../../assets/img/lajas.jpg")}
            style={styles.imagen}
          />
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
    marginBottom: 8,
  },

  subtitulo: {
    textAlign: "center",
    color: "#558B2F",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 25,
  },

  galeria: {
    gap: 18,
  },

  imagenContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 4,
  },

  imagen: {
    width: "100%",
    height: 230,
  },
});