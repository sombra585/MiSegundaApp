import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

function OpcionMenu({
  icono,
  titulo,
  descripcion,
  onPress,
}: {
  icono: string;
  titulo: string;
  descripcion: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.opcion} onPress={onPress}>
      <Text style={styles.icono}>{icono}</Text>

      <View style={styles.infoOpcion}>
        <Text style={styles.tituloOpcion}>{titulo}</Text>
        <Text style={styles.descripcionOpcion}>{descripcion}</Text>
      </View>

      <Text style={styles.flecha}>›</Text>
    </Pressable>
  );
}

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

      <OpcionMenu
        icono="📝"
        titulo="Formulario"
        descripcion="Planifica tu viaje y registra tus preferencias."
        onPress={() => router.push("/formulario")}
      />

      <OpcionMenu
        icono="📸"
        titulo="Destinos turísticos"
        descripcion="Descubre lugares increíbles de Nariño y Colombia."
        onPress={() => router.push("/destinos")}
      />

      <OpcionMenu
        icono="📍"
        titulo="Contacto"
        descripcion="Encuentra información para comunicarte con nosotros."
        onPress={() => router.push("/contacto")}
      />

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

  opcion: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },

  icono: {
    fontSize: 30,
    marginRight: 14,
  },

  infoOpcion: {
    flex: 1,
  },

  tituloOpcion: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 3,
  },

  descripcionOpcion: {
    fontSize: 13,
    color: "#689F38",
    lineHeight: 18,
  },

  flecha: {
    fontSize: 28,
    color: "#81C784",
    marginLeft: 8,
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