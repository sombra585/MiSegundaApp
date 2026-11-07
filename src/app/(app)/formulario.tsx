import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function Formulario() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [destinoFavorito, setDestinoFavorito] = useState("");
  const [tipoPreparacion, setTipoPreparacion] = useState("");
  const [guardando, setGuardando] = useState(false);

  const guardar = async () => {
    if (
      !nombre.trim() ||
      !correo.trim() ||
      !telefono.trim() ||
      !ciudad.trim() ||
      !destinoFavorito.trim() ||
      !tipoPreparacion.trim()
    ) {
      Alert.alert("Información incompleta", "Todos los campos son obligatorios.");
      return;
    }

    try {
      setGuardando(true);

      const { data, error } = await supabase
        .from("usuarios_viaje")
        .insert([
          {
            nombre: nombre.trim(),
            correo: correo.trim(),
            telefono: telefono.trim(),
            ciudad: ciudad.trim(),
            destino_favorito: destinoFavorito.trim(),
            tipo_experiencia: tipoPreparacion.trim(),
          },
        ])
        .select()
        .single();

      if (error) {
        console.log("Error Supabase:", error);
        Alert.alert("No se pudo guardar", error.message);
        return;
      }

      if (!data) {
        Alert.alert("No se pudo guardar", "Supabase no devolvió el registro.");
        return;
      }

      router.push({
        pathname: "/resultado",
        params: {
          id: String(data.id),
          nombre: data.nombre,
          correo: data.correo,
          telefono: data.telefono,
          ciudad: data.ciudad,
          destinoFavorito: data.destino_favorito,
          tipoPreparacion: data.tipo_experiencia,
        },
      });
    } catch (error) {
      console.log("Error inesperado:", error);
      Alert.alert("Error de conexión", "No fue posible guardar la información.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Planifica tu viaje</Text>

      <Text style={styles.subtitulo}>
        Registra tus datos para comenzar a explorar Colombia.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su nombre"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="correo@dominio.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={correo}
          onChangeText={setCorreo}
        />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="3001234567"
          keyboardType="numeric"
          value={telefono}
          onChangeText={setTelefono}
        />

        <Text style={styles.label}>Ciudad de origen</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Pasto"
          value={ciudad}
          onChangeText={setCiudad}
        />

        <Text style={styles.label}>Destino favorito</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Laguna de La Cocha"
          value={destinoFavorito}
          onChangeText={setDestinoFavorito}
        />

        <Text style={styles.label}>Tipo de preparación</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Plan de aventura"
          value={tipoPreparacion}
          onChangeText={setTipoPreparacion}
        />

        <Pressable
          style={[styles.boton, guardando && styles.botonDeshabilitado]}
          onPress={guardar}
          disabled={guardando}
        >
          {guardando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.botonTexto}>Guardar mi registro</Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F7F4EE",
    padding: 20,
    justifyContent: "center",
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#143C32",
    textAlign: "center",
  },

  subtitulo: {
    color: "#5F7067",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 21,
  },

  card: {
    backgroundColor: "#FFFDF9",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E6DED2",
    elevation: 3,
  },

  label: {
    color: "#A06C4B",
    fontWeight: "600",
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#FBF9F4",
    borderWidth: 1,
    borderColor: "#D9E1D8",
    borderRadius: 13,
    padding: 12,
    marginBottom: 14,
  },

  boton: {
    backgroundColor: "#286052",
    paddingVertical: 14,
    borderRadius: 13,
    alignItems: "center",
    marginTop: 4,
  },

  botonDeshabilitado: {
    opacity: 0.7,
  },

  botonTexto: {
    color: "#FFFDF9",
    fontWeight: "bold",
    fontSize: 15,
  },
});