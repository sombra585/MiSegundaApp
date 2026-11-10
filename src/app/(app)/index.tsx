import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { getAuthErrorMessage } from "../../lib/auth-validation";
import { supabase } from "../../lib/supabase";

function OpcionMenu({
  titulo,
  descripcion,
  numero,
  onPress,
}: {
  titulo: string;
  descripcion: string;
  numero: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [styles.opcion, pressed && styles.opcionPresionada]}
      onPress={onPress}
    >
      <View style={styles.icono}>
        <Text style={styles.numeroIcono}>{numero}</Text>
      </View>

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
  const [cerrandoSesion, setCerrandoSesion] = useState(false);

  const cerrarSesion = async () => {
    setCerrandoSesion(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        Alert.alert("No se pudo cerrar sesión", getAuthErrorMessage(error, "logout"));
      }
    } catch (error) {
      Alert.alert("No se pudo cerrar sesión", getAuthErrorMessage(error, "logout"));
    } finally {
      setCerrandoSesion(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Image
          source={require("../../../assets/img/turismo.jpg")}
          style={styles.imagenHero}
          resizeMode="cover"
        />
        <View style={styles.heroSombra} />
        <View style={styles.heroContenido}>
          <Text style={styles.heroEtiqueta}>TURISMO COLOMBIA</Text>
          <Text style={styles.heroTitulo}>Descubre nuevos caminos</Text>
          <Text style={styles.heroTexto}>Nariño y sus paisajes te esperan.</Text>
        </View>
      </View>

      <Text style={styles.saludo}>Hola, viajero</Text>

      <Text style={styles.tituloPrincipal}>
        Descubre Colombia
      </Text>

      <Text style={styles.descripcionPrincipal}>
        Explora destinos, conoce nuevos lugares y planifica tus próximos viajes
        por Colombia.
      </Text>

      <View style={styles.resumen}>
        <View style={styles.dato}>
          <Text style={styles.numero}>4</Text>
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

      <View style={styles.encabezadoSeccion}>
        <View>
          <Text style={styles.kickerSeccion}>EXPLORA LA APLICACIÓN</Text>
          <Text style={styles.tituloSeccion}>Planifica tu experiencia</Text>
        </View>
        <Text style={styles.indicadorSeccion}>04</Text>
      </View>

      <OpcionMenu
        numero="01"
        titulo="Formulario"
        descripcion="Planifica tu viaje y registra tus preferencias."
        onPress={() => router.push("/formulario")}
      />

      <OpcionMenu
        numero="02"
        titulo="Destinos turísticos"
        descripcion="Descubre lugares increíbles de Nariño y Colombia."
        onPress={() => router.push("/destinos")}
      />

      <OpcionMenu
        numero="03"
        titulo="Contacto"
        descripcion="Encuentra información para comunicarte con nosotros."
        onPress={() => router.push("/contacto")}
      />

      <OpcionMenu
        numero="04"
        titulo="Viajeros registrados"
        descripcion="Consulta las personas que ya están planeando su viaje."
        onPress={() => router.push("/registros")}
      />

      <OpcionMenu
        numero="05"
        titulo="Detalle"
        descripcion="Consulta el detalle."
        onPress={() => router.push("./detalle")}
      />

      <OpcionMenu
        numero="06"
        titulo="Catálogo"
        descripcion="Explora el catálogo."
        onPress={() => router.push("/catalogo")}
      />

      <Text style={styles.footer}>
        Turismo Colombia · Desarrollo Móvil
      </Text>

      <Pressable
        style={[styles.botonCerrar, cerrandoSesion && styles.botonDeshabilitado]}
        onPress={cerrarSesion}
        disabled={cerrandoSesion}
      >
        {cerrandoSesion ? (
          <ActivityIndicator color="#FFFDF9" />
        ) : (
          <Text style={styles.textoCerrar}>Cerrar sesión</Text>
        )}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F7F4EE",
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 28,
  },

  hero: {
    width: "100%",
    height: 246,
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 24,
    elevation: 6,
  },

  imagenHero: {
    width: "100%",
    height: "100%",
  },

  heroSombra: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(12, 39, 32, 0.42)",
  },

  heroContenido: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
  },

  heroEtiqueta: {
    color: "#F2E8D6",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1.6,
    marginBottom: 8,
  },

  heroTitulo: {
    color: "#FFFDF9",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },

  heroTexto: {
    color: "#F2E8D6",
    fontSize: 14,
  },

  saludo: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#A06C4B",
    letterSpacing: 1.5,
    marginBottom: 8,
  },

  tituloPrincipal: {
    fontSize: 31,
    fontWeight: "bold",
    color: "#143C32",
    lineHeight: 37,
    marginBottom: 9,
  },

  descripcionPrincipal: {
    fontSize: 15,
    color: "#5F7067",
    lineHeight: 23,
    marginBottom: 22,
  },

  resumen: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFDF9",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 8,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#E6DED2",
    elevation: 2,
  },

  dato: {
    alignItems: "center",
    flex: 1,
  },

  numero: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#143C32",
  },

  etiqueta: {
    fontSize: 11,
    color: "#7A887D",
    marginTop: 5,
  },

  encabezadoSeccion: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  kickerSeccion: {
    color: "#A06C4B",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1.4,
    marginBottom: 5,
  },

  tituloSeccion: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#143C32",
  },

  indicadorSeccion: {
    color: "#B08B57",
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  opcion: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFDF9",
    borderRadius: 17,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E6DED2",
    elevation: 2,
  },

  opcionPresionada: {
    opacity: 0.78,
    transform: [{ scale: 0.985 }],
  },

  icono: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#EEF1EA",
    marginRight: 13,
  },

  numeroIcono: {
    color: "#A06C4B",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },

  infoOpcion: {
    flex: 1,
  },

  tituloOpcion: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#286052",
    marginBottom: 3,
  },

  descripcionOpcion: {
    fontSize: 13,
    color: "#6E7F74",
    lineHeight: 19,
  },

  flecha: {
    fontSize: 27,
    color: "#B08B57",
    marginLeft: 8,
  },

  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#879A8B",
    letterSpacing: 0.5,
    marginTop: 25,
    marginBottom: 10,
  },
  botonCerrar: {
    backgroundColor: "#8A3D32",
    paddingVertical: 14,
    borderRadius: 13,
    alignItems: "center",
    marginTop: 8,
  },
  botonDeshabilitado: {
    opacity: 0.7,
  },
  textoCerrar: {
    color: "#FFFDF9",
    fontWeight: "bold",
  },
});