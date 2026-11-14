import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const formatoPrecio = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export default function Detalle() {
  const router = useRouter();
  const { codigo, titulo, descripcion, detalle, precio } =
    useLocalSearchParams<{
      codigo?: string;
      titulo?: string;
      descripcion?: string;
      detalle?: string;
      precio?: string;
    }>();

  const valorPrecio =
    precio && Number.isFinite(Number(precio))
      ? formatoPrecio.format(Number(precio))
      : null;

  return (
    <ScrollView contentContainerStyle={styles.contenido}>
      <View style={styles.portada}>
        <View style={styles.portadaIcono}>
          <Text style={styles.icono}>🧭</Text>
        </View>
        <Text style={styles.etiqueta}>TURISMO COLOMBIA</Text>
        <Text style={styles.titulo}>{titulo || "Destino por descubrir"}</Text>
        {codigo ? (
          <Text style={styles.codigo}>DESTINO {codigo}</Text>
        ) : null}
      </View>

      {descripcion ? (
        <View style={styles.tarjeta}>
          <Text style={styles.etiquetaSeccion}>EL LUGAR</Text>
          <Text style={styles.descripcion}>{descripcion}</Text>
        </View>
      ) : null}

      <View style={styles.tarjeta}>
        <Text style={styles.etiquetaSeccion}>DETALLES DE LA EXPERIENCIA</Text>
        <Text style={styles.detalle}>
          {detalle || "Aún no hay información adicional para este destino."}
        </Text>
      </View>

      <View style={styles.tarjetaPrecio}>
        <View style={styles.precioIcono}>
          <Text style={styles.iconoPrecio}>$</Text>
        </View>
        <View style={styles.infoPrecio}>
          <Text style={styles.etiquetaSeccion}>PRECIO</Text>
          <Text style={styles.precio}>
            {valorPrecio || "Consulta disponibilidad"}
          </Text>
          <Text style={styles.notaPrecio}>
            {valorPrecio
              ? "Valor registrado para esta experiencia."
              : "El precio puede variar según la experiencia."}
          </Text>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.back()}
        style={({ pressed }) => [
          styles.boton,
          pressed && styles.botonPresionado,
        ]}
      >
        <Text style={styles.textoBoton}>Volver al catálogo</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: "#F7F4EE",
    flexGrow: 1,
    padding: 20,
    paddingBottom: 30,
  },
  portada: {
    alignItems: "center",
    backgroundColor: "#143C32",
    borderColor: "#B08B57",
    borderRadius: 23,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 22,
    paddingVertical: 25,
  },
  portadaIcono: {
    alignItems: "center",
    backgroundColor: "rgba(255, 253, 249, 0.12)",
    borderRadius: 20,
    height: 62,
    justifyContent: "center",
    marginBottom: 15,
    width: 62,
  },
  icono: {
    fontSize: 32,
  },
  etiqueta: {
    color: "#EFCF8B",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1.6,
    marginBottom: 7,
  },
  titulo: {
    color: "#FFFDF9",
    fontSize: 27,
    fontWeight: "bold",
    lineHeight: 34,
    textAlign: "center",
  },
  codigo: {
    color: "#E8D8B8",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1,
    marginTop: 9,
  },
  tarjeta: {
    backgroundColor: "#FFFDF9",
    borderColor: "#E6DED2",
    borderRadius: 18,
    borderWidth: 1,
    elevation: 2,
    marginBottom: 14,
    padding: 18,
  },
  etiquetaSeccion: {
    color: "#A06C4B",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1.3,
    marginBottom: 9,
  },
  descripcion: {
    color: "#5F7067",
    fontSize: 15,
    lineHeight: 23,
  },
  detalle: {
    color: "#143C32",
    fontSize: 15,
    lineHeight: 23,
  },
  tarjetaPrecio: {
    alignItems: "center",
    backgroundColor: "#E8EEE6",
    borderRadius: 18,
    flexDirection: "row",
    marginBottom: 20,
    padding: 17,
  },
  precioIcono: {
    alignItems: "center",
    backgroundColor: "#FFFDF9",
    borderRadius: 14,
    height: 46,
    justifyContent: "center",
    marginRight: 13,
    width: 46,
  },
  iconoPrecio: {
    color: "#286052",
    fontSize: 23,
    fontWeight: "bold",
  },
  infoPrecio: {
    flex: 1,
  },
  precio: {
    color: "#143C32",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 3,
  },
  notaPrecio: {
    color: "#5F7067",
    fontSize: 12,
    lineHeight: 17,
  },
  boton: {
    alignItems: "center",
    backgroundColor: "#286052",
    borderRadius: 13,
    paddingVertical: 14,
  },
  botonPresionado: {
    opacity: 0.8,
  },
  textoBoton: {
    color: "#FFFDF9",
    fontSize: 15,
    fontWeight: "bold",
  },
});
