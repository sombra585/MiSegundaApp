import { useState } from "react";
import { useRouter } from "expo-router";

import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  View,
  Switch,
} from "react-native";

export default function Formulario() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("");

  const [acompanante, setAcompanante] = useState(false);
  const [cargando, setCargando] = useState(false);

  const enviar = () => {
    if (!nombre || !correo || !telefono || !ciudad) {
      alert("Todos los campos son obligatorios");
      return;
    }

    setCargando(true);

    setTimeout(() => {
      router.push({
        pathname: "/resultado",
        params: {
          nombre,
          correo,
          telefono,
          ciudad,
          acompanante: acompanante ? "Sí" : "No",
        },
      });

      setCargando(false);
    }, 1000);
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

        <View style={styles.switchContainer}>
          <View style={styles.switchInfo}>
            <Text style={styles.switchTitulo}>
              ¿Desea un acompañante turístico?
            </Text>

            <Text style={styles.switchDescripcion}>
              Seleccione si desea contar con un guía durante su viaje.
            </Text>
          </View>

          <Switch
            value={acompanante}
            onValueChange={setAcompanante}
            trackColor={{
              false: "#C8E6C9",
              true: "#81C784",
            }}
            thumbColor={acompanante ? "#2E7D32" : "#F1F1F1"}
          />
        </View>

        <Pressable style={styles.boton} onPress={enviar}>
          {cargando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.botonTexto}>
              Comenzar mi viaje
            </Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F1F8E9",
    padding: 20,
    justifyContent: "center",
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1B5E20",
    textAlign: "center",
  },

  subtitulo: {
    color: "#558B2F",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 21,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#C8E6C9",
    elevation: 3,
  },

  label: {
    color: "#33691E",
    fontWeight: "600",
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#F9FFF7",
    borderWidth: 1,
    borderColor: "#A5D6A7",
    borderRadius: 13,
    padding: 12,
    marginBottom: 14,
  },

  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
    marginTop: 4,
  },

  switchInfo: {
    flex: 1,
    marginRight: 10,
  },

  switchTitulo: {
    color: "#33691E",
    fontWeight: "600",
    marginBottom: 4,
  },

  switchDescripcion: {
    color: "#689F38",
    fontSize: 12,
    lineHeight: 17,
  },

  boton: {
    backgroundColor: "#2E7D32",
    paddingVertical: 14,
    borderRadius: 13,
    alignItems: "center",
    marginTop: 4,
  },

  botonTexto: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },
});

