import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { supabase } from "../lib/supabase";

type Registro = {
  id: string;
  nombre: string;
  correo: string;
  ciudad: string;
  destino_favorito: string | null;
  tipo_experiencia: string | null;
};

export default function Registros() {
  const router = useRouter();
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [cargando, setCargando] = useState(true);

  const cargarRegistros = useCallback(async () => {
    setCargando(true);

    const { data, error } = await supabase
      .from("usuarios_viaje")
      .select("id, nombre, correo, ciudad, destino_favorito, tipo_experiencia")
      .order("id", { ascending: false });

    if (error) {
      console.log("Error Supabase:", error);
      Alert.alert("No se pudieron cargar los registros", error.message);
      setCargando(false);
      return;
    }

    setRegistros((data as Registro[]) || []);
    setCargando(false);
  }, []);

  useEffect(() => {
    cargarRegistros();
  }, [cargarRegistros]);

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#286052" />
        <Text style={styles.textoCarga}>Consultando viajeros...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.icono}>🧭</Text>
      <Text style={styles.titulo}>Viajeros registrados</Text>
      <Text style={styles.subtitulo}>
        Conoce a quienes ya están preparando una nueva experiencia por Colombia.
      </Text>

      <FlatList
        data={registros}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={registros.length === 0 ? styles.listaVacia : undefined}
        refreshing={cargando}
        onRefresh={cargarRegistros}
        ListEmptyComponent={
          <Text style={styles.vacio}>Todavía no hay viajeros registrados.</Text>
        }
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <View style={styles.encabezadoCard}>
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text style={styles.numero}>#{index + 1}</Text>
            </View>
            <Text style={styles.dato}>{item.correo}</Text>
            <Text style={styles.dato}>Origen: {item.ciudad}</Text>
            <Text style={styles.dato}>
              Destino favorito: {item.destino_favorito || "No especificado"}
            </Text>
            <Text style={styles.dato}>
              Tipo de experiencia: {item.tipo_experiencia || "No especificado"}
            </Text>
          </View>
        )}
      />

      <Pressable style={styles.boton} onPress={() => router.push("/formulario")}>
        <Text style={styles.botonTexto}>Registrar un nuevo viaje</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F4EE",
    padding: 20,
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F4EE",
  },
  textoCarga: {
    color: "#5F7067",
    marginTop: 12,
  },
  icono: {
    fontSize: 38,
    textAlign: "center",
  },
  titulo: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#143C32",
    textAlign: "center",
    marginTop: 4,
  },
  subtitulo: {
    color: "#5F7067",
    textAlign: "center",
    lineHeight: 20,
    marginTop: 6,
    marginBottom: 18,
  },
  card: {
    backgroundColor: "#FFFDF9",
    padding: 17,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E6DED2",
    marginBottom: 12,
    elevation: 2,
  },
  encabezadoCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  nombre: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#143C32",
  },
  numero: {
    color: "#B08B57",
    fontWeight: "bold",
  },
  dato: {
    color: "#5F7067",
    lineHeight: 21,
  },
  listaVacia: {
    flexGrow: 1,
    justifyContent: "center",
  },
  vacio: {
    color: "#879A8B",
    textAlign: "center",
  },
  boton: {
    backgroundColor: "#286052",
    paddingVertical: 14,
    borderRadius: 13,
    alignItems: "center",
    marginTop: 12,
  },
  botonTexto: {
    color: "#FFFDF9",
    fontWeight: "bold",
  },
});
