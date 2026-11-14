import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

type Destino = {
  codigo: string | number;
  titulo: string | null;
  descripcion: string | null;
  detalle: string | null;
  precio: number | string | null;
};

const formatoPrecio = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

function mostrarPrecio(precio: Destino["precio"]) {
  if (precio === null || precio === "") {
    return null;
  }

  const valor = Number(precio);
  return Number.isFinite(valor) ? formatoPrecio.format(valor) : null;
}

function mensajeDeError(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "object" && error !== null && "message" in error) {
    return String(error.message);
  }
  return "Ocurrió un error inesperado.";
}

export default function DetalleItem() {
  const router = useRouter();
  const { codigo } = useLocalSearchParams<{ codigo?: string }>();
  const codigoTexto = typeof codigo === "string" ? codigo.trim() : "";
  const [destino, setDestino] = useState<Destino | null>(null);
  const [cargando, setCargando] = useState(true);
  const [errorTexto, setErrorTexto] = useState("");
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let activo = true;

    const cargarDestino = async () => {
      setCargando(true);
      setErrorTexto("");
      setDestino(null);

      if (!codigoTexto) {
        setErrorTexto("No recibimos el código del destino.");
        setCargando(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("destinos")
          .select("codigo, titulo, descripcion, detalle, precio")
          .eq("codigo", codigoTexto)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (activo) {
          if (data) {
            setDestino(data as Destino);
          } else {
            setErrorTexto(`No encontramos un destino con el código ${codigoTexto}.`);
          }
        }
      } catch (error: unknown) {
        console.error("Error al consultar el destino:", error);
        if (activo) {
          setErrorTexto(`No se pudo consultar el destino. ${mensajeDeError(error)}`);
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    void cargarDestino();
    return () => {
      activo = false;
    };
  }, [codigoTexto, intento]);

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#286052" />
        <Text style={styles.textoCarga}>Buscando la ficha del destino...</Text>
      </View>
    );
  }

  if (errorTexto || !destino) {
    return (
      <View style={styles.centro}>
        <Text style={styles.iconoEstado}>🧭</Text>
        <Text style={styles.tituloEstado}>No encontramos ese destino</Text>
        <Text style={styles.mensajeEstado}>
          {errorTexto || "Intenta de nuevo desde el catálogo."}
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => setIntento((actual) => actual + 1)}
          style={({ pressed }) => [
            styles.boton,
            pressed && styles.botonPresionado,
          ]}
        >
          <Text style={styles.textoBoton}>Reintentar consulta</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.replace("/catalogo")}
          style={styles.botonSecundario}
        >
          <Text style={styles.textoBotonSecundario}>Volver al catálogo</Text>
        </Pressable>
      </View>
    );
  }

  const precio = mostrarPrecio(destino.precio);

  return (
    <ScrollView contentContainerStyle={styles.contenido}>
      <View style={styles.portada}>
        <View style={styles.portadaIcono}>
          <Text style={styles.icono}>🧭</Text>
        </View>
        <Text style={styles.etiqueta}>TURISMO COLOMBIA</Text>
        <Text style={styles.titulo}>
          {destino.titulo || "Destino por descubrir"}
        </Text>
        <Text style={styles.codigo}>CÓDIGO {destino.codigo}</Text>
      </View>

      {destino.descripcion ? (
        <View style={styles.tarjeta}>
          <Text style={styles.etiquetaSeccion}>EL LUGAR</Text>
          <Text style={styles.descripcion}>{destino.descripcion}</Text>
        </View>
      ) : null}

      <View style={styles.tarjeta}>
        <Text style={styles.etiquetaSeccion}>DETALLES DE LA EXPERIENCIA</Text>
        <Text style={styles.detalle}>
          {destino.detalle || "Aún no hay información adicional para este destino."}
        </Text>
      </View>

      <View style={styles.tarjetaPrecio}>
        <View style={styles.precioIcono}>
          <Text style={styles.iconoPrecio}>$</Text>
        </View>
        <View style={styles.infoPrecio}>
          <Text style={styles.etiquetaSeccion}>PRECIO</Text>
          <Text style={styles.precio}>
            {precio || "Consulta disponibilidad"}
          </Text>
          <Text style={styles.notaPrecio}>
            {precio
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
  centro: {
    alignItems: "center",
    backgroundColor: "#F7F4EE",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  textoCarga: {
    color: "#5F7067",
    marginTop: 12,
  },
  iconoEstado: {
    fontSize: 42,
    marginBottom: 10,
  },
  tituloEstado: {
    color: "#143C32",
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  mensajeEstado: {
    color: "#5F7067",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 18,
    textAlign: "center",
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
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  botonPresionado: {
    opacity: 0.8,
  },
  textoBoton: {
    color: "#FFFDF9",
    fontSize: 14,
    fontWeight: "bold",
  },
  botonSecundario: {
    marginTop: 14,
    padding: 10,
  },
  textoBotonSecundario: {
    color: "#286052",
    fontWeight: "bold",
  },
});
