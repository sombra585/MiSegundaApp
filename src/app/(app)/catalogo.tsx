import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

type Destino = {
  codigo: string | number | null;
  titulo: string | null;
  descripcion: string | null;
  detalle: string | null;
};

export default function Catalogo() {
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorTexto, setErrorTexto] = useState("");
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let activo = true;

    const obtenerDestinos = async () => {
      try {
        setCargando(true);
        setErrorTexto("");

        const { data, error } = await supabase
          .from("destinos")
          .select("codigo, titulo, descripcion, detalle")
          .order("codigo", { ascending: true });

        if (error) {
          throw error;
        }

        if (activo) {
          setDestinos(data ?? []);
        }
      } catch (error: unknown) {
        console.error("Error al cargar destinos:", error);
        if (activo) {
          const mensaje =
            error instanceof Error ? error.message : "Error desconocido";
          setErrorTexto(`No se pudieron cargar los destinos. ${mensaje}`);
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    void obtenerDestinos();

    return () => {
      activo = false;
    };
  }, [intento]);

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#143C32" />
        <Text style={styles.textoCarga}>Cargando destinos...</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.lista}
      contentContainerStyle={styles.container}
      data={destinos}
      keyExtractor={(item, index) => String(item.codigo ?? index)}
      ListHeaderComponent={
        <View>
          <Text style={styles.etiqueta}>TURISMO COLOMBIA</Text>
          <Text style={styles.titulo}>Catálogo de destinos</Text>
          <Text style={styles.subtitulo}>
            Explora la información de nuestros destinos turísticos.
          </Text>
        </View>
      }
      ListEmptyComponent={
        <View style={styles.mensajeVacio}>
          <Text style={styles.mensaje}>
            {errorTexto || "Todavía no hay destinos para mostrar."}
          </Text>
          {errorTexto ? (
            <Pressable
              accessibilityRole="button"
              onPress={() => setIntento((actual) => actual + 1)}
              style={styles.botonReintentar}
            >
              <Text style={styles.textoBoton}>Reintentar</Text>
            </Pressable>
          ) : null}
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          {item.codigo !== null ? (
            <Text style={styles.codigo}>DESTINO {item.codigo}</Text>
          ) : null}
          <Text style={styles.tituloDestino}>
            {item.titulo || "Destino sin título"}
          </Text>
          {item.descripcion ? (
            <Text style={styles.descripcion}>{item.descripcion}</Text>
          ) : null}
          {item.detalle ? (
            <View style={styles.detalleContenedor}>
              <Text style={styles.etiquetaDetalle}>DETALLE</Text>
              <Text style={styles.detalle}>{item.detalle}</Text>
            </View>
          ) : null}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    flex: 1,
    backgroundColor: "#F7F4EE",
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F4EE",
    padding: 20,
  },
  textoCarga: {
    color: "#5F7067",
    fontSize: 14,
    marginTop: 12,
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
    textAlign: "center",
    marginBottom: 6,
  },
  subtitulo: {
    color: "#5F7067",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginBottom: 22,
  },
  card: {
    backgroundColor: "#FFFDF9",
    borderColor: "#E6DED2",
    borderRadius: 20,
    borderWidth: 1,
    elevation: 2,
    marginBottom: 16,
    padding: 18,
  },
  codigo: {
    color: "#A06C4B",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  tituloDestino: {
    color: "#143C32",
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 8,
  },
  descripcion: {
    color: "#5F7067",
    fontSize: 14,
    lineHeight: 21,
  },
  detalleContenedor: {
    borderTopColor: "#E6DED2",
    borderTopWidth: 1,
    marginTop: 14,
    paddingTop: 12,
  },
  etiquetaDetalle: {
    color: "#A06C4B",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1.2,
    marginBottom: 5,
  },
  detalle: {
    color: "#143C32",
    fontSize: 14,
    lineHeight: 21,
  },
  mensajeVacio: {
    alignItems: "center",
    backgroundColor: "#FFFDF9",
    borderColor: "#E6DED2",
    borderRadius: 18,
    borderWidth: 1,
    padding: 20,
  },
  mensaje: {
    color: "#5F7067",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },
  botonReintentar: {
    backgroundColor: "#143C32",
    borderRadius: 12,
    marginTop: 14,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  textoBoton: {
    color: "#FFFDF9",
    fontSize: 14,
    fontWeight: "bold",
  },
});
