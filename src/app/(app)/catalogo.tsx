import { useRouter } from "expo-router";
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

type CatalogoItem = {
  codigo: string | number | null;
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

function mostrarPrecio(precio: CatalogoItem["precio"]) {
  if (precio === null || precio === "") {
    return null;
  }

  const valor = Number(precio);
  return Number.isFinite(valor) ? formatoPrecio.format(valor) : null;
}

export default function Catalogo() {
  const router = useRouter();
  const [items, setItems] = useState<CatalogoItem[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorTexto, setErrorTexto] = useState("");
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let activo = true;

    const cargarCatalogo = async () => {
      try {
        setCargando(true);
        setErrorTexto("");

        const { data, error } = await supabase
          .from("destinos")
          .select("codigo, titulo, descripcion, detalle, precio")
          .order("codigo", { ascending: true });

        if (error) {
          throw error;
        }

        if (activo) {
          setItems((data ?? []) as CatalogoItem[]);
        }
      } catch (error: unknown) {
        console.error("Error al cargar el catálogo:", error);
        if (activo) {
          const mensaje =
            error instanceof Error ? error.message : "Error desconocido";
          setErrorTexto(`No se pudo cargar el catálogo. ${mensaje}`);
          setItems([]);
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    void cargarCatalogo();

    return () => {
      activo = false;
    };
  }, [intento]);

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#286052" />
        <Text style={styles.textoCarga}>Preparando tus destinos...</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.lista}
      contentContainerStyle={styles.contenidoLista}
      data={items}
      keyExtractor={(item, index) => String(item.codigo ?? `destino-${index}`)}
      ListHeaderComponent={
        <View style={styles.encabezado}>
          <Text style={styles.etiqueta}>TURISMO COLOMBIA</Text>
          <Text style={styles.titulo}>Destinos para descubrir</Text>
          <Text style={styles.subtitulo}>
            Encuentra tu próxima experiencia y conoce cada lugar con más
            detalle.
          </Text>
          <View style={styles.contador}>
            <Text style={styles.contadorTexto}>
              {items.length} {items.length === 1 ? "EXPERIENCIA" : "EXPERIENCIAS"}
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/escanear")}
            style={({ pressed }) => [
              styles.botonEscanear,
              pressed && styles.tarjetaPresionada,
            ]}
          >
            <Text style={styles.iconoEscanear}>▦</Text>
            <View style={styles.infoEscanear}>
              <Text style={styles.tituloEscanear}>Escanear código QR</Text>
              <Text style={styles.descripcionEscanear}>
                Encuentra un destino con su código.
              </Text>
            </View>
            <Text style={styles.flechaEscanear}>›</Text>
          </Pressable>
        </View>
      }
      ListEmptyComponent={
        <View style={styles.estadoVacio}>
          <Text style={styles.iconoVacio}>{errorTexto ? "↻" : "🧭"}</Text>
          <Text style={styles.tituloVacio}>
            {errorTexto ? "No pudimos conectar" : "Aún no hay destinos"}
          </Text>
          <Text style={styles.mensajeVacio}>
            {errorTexto || "Pronto encontrarás nuevas experiencias aquí."}
          </Text>
          {errorTexto ? (
            <Pressable
              accessibilityRole="button"
              onPress={() => setIntento((actual) => actual + 1)}
              style={({ pressed }) => [
                styles.botonReintentar,
                pressed && styles.botonPresionado,
              ]}
            >
              <Text style={styles.textoBoton}>Reintentar</Text>
            </Pressable>
          ) : null}
        </View>
      }
      ListFooterComponent={
        errorTexto ? undefined : (
          <Pressable
            accessibilityRole="button"
            onPress={() => setIntento((actual) => actual + 1)}
            style={({ pressed }) => [
              styles.botonActualizar,
              pressed && styles.botonPresionado,
            ]}
          >
            <Text style={styles.textoActualizar}>Actualizar catálogo</Text>
          </Pressable>
        )
      }
      renderItem={({ item, index }) => {
        const precio = mostrarPrecio(item.precio);

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Ver detalles de ${item.titulo || "este destino"}`}
            onPress={() =>
              router.push({
              pathname: "/detalle-item",
                params: {
                codigo: item.codigo === null ? "" : String(item.codigo),
                },
              })
            }
            style={({ pressed }) => [
              styles.tarjeta,
              pressed && styles.tarjetaPresionada,
            ]}
          >
            <View style={styles.encabezadoTarjeta}>
              <View style={styles.iconoTarjeta}>
                <Text style={styles.iconoDestino}>🧭</Text>
              </View>
              <View style={styles.infoDestino}>
                <Text style={styles.codigo}>
                  {item.codigo !== null
                    ? `DESTINO ${item.codigo}`
                    : `EXPERIENCIA ${String(index + 1).padStart(2, "0")}`}
                </Text>
                <Text style={styles.nombreDestino}>
                  {item.titulo || "Destino por descubrir"}
                </Text>
              </View>
              <Text style={styles.flecha}>›</Text>
            </View>

            <Text style={styles.descripcion} numberOfLines={3}>
              {item.descripcion || "Conoce más sobre esta experiencia turística."}
            </Text>

            <View style={styles.pieTarjeta}>
              {precio ? (
                <Text style={styles.precio}>{precio}</Text>
              ) : (
                <Text style={styles.precioNoDisponible}>Consulta el detalle</Text>
              )}
              <Text style={styles.enlace}>Ver detalles →</Text>
            </View>
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    flex: 1,
    backgroundColor: "#F7F4EE",
  },
  contenidoLista: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 28,
  },
  encabezado: {
    marginBottom: 20,
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
    fontSize: 29,
    fontWeight: "bold",
    lineHeight: 35,
    marginBottom: 7,
  },
  subtitulo: {
    color: "#5F7067",
    fontSize: 14,
    lineHeight: 21,
  },
  contador: {
    alignSelf: "flex-start",
    backgroundColor: "#E8EEE6",
    borderRadius: 20,
    marginTop: 16,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  contadorTexto: {
    color: "#286052",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  botonEscanear: {
    alignItems: "center",
    backgroundColor: "#143C32",
    borderRadius: 17,
    flexDirection: "row",
    marginTop: 16,
    padding: 14,
  },
  iconoEscanear: {
    color: "#EFCF8B",
    fontSize: 25,
    marginRight: 12,
  },
  infoEscanear: {
    flex: 1,
  },
  tituloEscanear: {
    color: "#FFFDF9",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 3,
  },
  descripcionEscanear: {
    color: "#D8E3D8",
    fontSize: 12,
  },
  flechaEscanear: {
    color: "#EFCF8B",
    fontSize: 27,
    marginLeft: 8,
  },
  tarjeta: {
    backgroundColor: "#FFFDF9",
    borderColor: "#E6DED2",
    borderRadius: 19,
    borderWidth: 1,
    elevation: 2,
    marginBottom: 14,
    padding: 17,
  },
  tarjetaPresionada: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
  encabezadoTarjeta: {
    alignItems: "center",
    flexDirection: "row",
  },
  iconoTarjeta: {
    alignItems: "center",
    backgroundColor: "#EEF1EA",
    borderRadius: 15,
    height: 48,
    justifyContent: "center",
    marginRight: 13,
    width: 48,
  },
  iconoDestino: {
    color: "#286052",
    fontSize: 30,
    fontWeight: "bold",
  },
  infoDestino: {
    flex: 1,
  },
  codigo: {
    color: "#A06C4B",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1.1,
    marginBottom: 4,
  },
  nombreDestino: {
    color: "#143C32",
    fontSize: 18,
    fontWeight: "bold",
  },
  flecha: {
    color: "#B08B57",
    fontSize: 29,
    marginLeft: 8,
  },
  descripcion: {
    color: "#5F7067",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 14,
  },
  pieTarjeta: {
    alignItems: "center",
    borderTopColor: "#E6DED2",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingTop: 12,
  },
  precio: {
    color: "#286052",
    fontSize: 15,
    fontWeight: "bold",
  },
  precioNoDisponible: {
    color: "#879A8B",
    fontSize: 12,
  },
  enlace: {
    color: "#A06C4B",
    fontSize: 12,
    fontWeight: "bold",
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
    fontSize: 14,
    marginTop: 12,
  },
  estadoVacio: {
    alignItems: "center",
    backgroundColor: "#FFFDF9",
    borderColor: "#E6DED2",
    borderRadius: 19,
    borderWidth: 1,
    marginTop: 8,
    padding: 24,
  },
  iconoVacio: {
    color: "#286052",
    fontSize: 30,
    marginBottom: 8,
  },
  tituloVacio: {
    color: "#143C32",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  mensajeVacio: {
    color: "#5F7067",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },
  botonReintentar: {
    backgroundColor: "#286052",
    borderRadius: 12,
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 11,
  },
  botonPresionado: {
    opacity: 0.8,
  },
  textoBoton: {
    color: "#FFFDF9",
    fontSize: 14,
    fontWeight: "bold",
  },
  botonActualizar: {
    alignItems: "center",
    borderColor: "#D9E1D8",
    borderRadius: 13,
    borderWidth: 1,
    marginTop: 2,
    paddingVertical: 13,
  },
  textoActualizar: {
    color: "#286052",
    fontSize: 14,
    fontWeight: "bold",
  },
});
