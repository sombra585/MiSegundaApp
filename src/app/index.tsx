import { useRouter } from "expo-router";

import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Image
          source={require("../../assets/img/turismo.jpg")}
          style={styles.imagenHero}
        />
      </View>

      <Text style={styles.saludo}>Hola, viajero 👋</Text>

      <Text style={styles.tituloPrincipal}>
        Descubre Colombia
      </Text>

      <Text style={styles.descripcionPrincipal}>
        Explora destinos, conoce nuevos lugares y planifica tus próximos
        viajes por Colombia.
      </Text>

      <View style={styles.resumen}>
        <View style={styles.dato}>
          <Text style={styles.numero}>5</Text>
          <Text style={styles.etiqueta}>Secciones</Text>
        </View>

        <View style={styles.dato}>
          <Text style={styles.numero}>32</Text>
          <Text style={styles.etiqueta}>Departamentos</Text>
        </View>

        <View style={styles.dato}>
          <Text style={styles.numero}>🇨🇴</Text>
          <Text style={styles.etiqueta}>Colombia</Text>
        </View>
      </View>

      <Text style={styles.tituloSeccion}>
        Explora la aplicación
      </Text>

      <View style={styles.filaBotones}>
        <Pressable
          style={({ pressed }) => [
            styles.boton,
            pressed && styles.botonPresionado,
          ]}
          onPress={() => router.push("/formulario")}
        >
          <Text style={styles.iconoBoton}>📝</Text>
          <Text style={styles.tituloBoton}>Formulario</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.boton,
            pressed && styles.botonPresionado,
          ]}
          onPress={() => router.push("/destinos")}
        >
          <Text style={styles.iconoBoton}>📸</Text>
          <Text style={styles.tituloBoton}>Destinos</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.boton,
            pressed && styles.botonPresionado,
          ]}
          onPress={() => router.push("/contacto")}
        >
          <Text style={styles.iconoBoton}>📍</Text>
          <Text style={styles.tituloBoton}>Contacto</Text>
        </Pressable>
      </View>

      <View style={styles.recomendacion}>
        <Text style={styles.iconoRecomendacion}>🌄</Text>

        <View style={styles.textoRecomendacion}>
          <Text style={styles.tituloRecomendacion}>
            Destino recomendado
          </Text>

          <Text style={styles.descripcionRecomendacion}>
            Colombia te espera con paisajes naturales, cultura y aventura.
          </Text>
        </View>
      </View>

      <Text style={styles.footer}>
        Turismo Colombia · Desarrollo Móvil
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F1F8E9",
    padding: 20,
    paddingTop: 70,
  },

  hero: {
    width: "100%",
    height: 220,
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 5,
  },

  imagenHero: {
    width: "100%",
    height: "100%",
  },

  saludo: {
    fontSize: 16,
    color: "#558B2F",
    marginBottom: 5,
  },

  tituloPrincipal: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1B5E20",
    marginBottom: 8,
  },

  descripcionPrincipal: {
    fontSize: 15,
    color: "#558B2F",
    lineHeight: 22,
    marginBottom: 20,
  },

  resumen: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 25,
    elevation: 3,
  },

  dato: {
    alignItems: "center",
    flex: 1,
  },

  numero: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E7D32",
  },

  etiqueta: {
    fontSize: 12,
    color: "#689F38",
    marginTop: 4,
  },

  tituloSeccion: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#1B5E20",
    marginBottom: 12,
  },

  /* FILA DE BOTONES */
  filaBotones: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 20,
  },

  /* BOTÓN */
  boton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  botonPresionado: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },

  iconoBoton: {
    fontSize: 28,
    marginBottom: 8,
  },

  tituloBoton: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
  },

  recomendacion: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    borderRadius: 18,
    padding: 16,
    marginTop: 12,
  },

  iconoRecomendacion: {
    fontSize: 32,
    marginRight: 14,
  },

  textoRecomendacion: {
    flex: 1,
  },

  tituloRecomendacion: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1B5E20",
    marginBottom: 4,
  },

  descripcionRecomendacion: {
    fontSize: 13,
    color: "#558B2F",
    lineHeight: 18,
  },

  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#81C784",
    marginTop: 25,
    marginBottom: 10,
  },
});
