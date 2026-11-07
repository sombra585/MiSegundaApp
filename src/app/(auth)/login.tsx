import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { getAuthErrorMessage, validateEmail } from "../../lib/auth-validation";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const router = useRouter();
  const { aviso } = useLocalSearchParams<{ aviso?: string }>();
  const { error: errorSesion } = useAuth();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeError, setMensajeError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const iniciarSesion = async () => {
    const errorCorreo = validateEmail(correo);
    if (errorCorreo) {
      setMensajeError(errorCorreo);
      return;
    }
    if (!password.trim()) {
      setMensajeError("Escribe tu contraseña.");
      return;
    }

    setMensajeError(null);
    setCargando(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: correo.trim(),
        password,
      });
      if (error) {
        setMensajeError(getAuthErrorMessage(error, "login"));
      }
    } catch (error) {
      setMensajeError(getAuthErrorMessage(error, "login"));
    } finally {
      setCargando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.teclado}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.contenedorScroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.contenedor}>
          <View style={styles.marca}>
            <Text style={styles.marcaTexto}>TC</Text>
          </View>
          <Text style={styles.etiqueta}>TURISMO COLOMBIA</Text>
          <Text style={styles.titulo}>Bienvenido de nuevo</Text>
          <Text style={styles.subtitulo}>
            Inicia sesión para continuar explorando.
          </Text>

          <View style={styles.tarjeta}>
            {typeof aviso === "string" && (
              <View style={styles.alertaExito} accessibilityLiveRegion="polite">
                <Text style={styles.alertaExitoTitulo}>Cuenta creada</Text>
                <Text style={styles.alertaExitoTexto}>{aviso}</Text>
              </View>
            )}
            {(mensajeError || errorSesion) && (
              <View style={styles.alertaError} accessibilityLiveRegion="polite">
                <Text style={styles.alertaTitulo}>No pudimos continuar</Text>
                <Text style={styles.alertaTexto}>
                  {mensajeError || errorSesion}
                </Text>
              </View>
            )}

            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              style={styles.input}
              placeholder="nombre@correo.com"
              placeholderTextColor="#879A8B"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              textContentType="emailAddress"
              value={correo}
              onChangeText={(value) => {
                setCorreo(value);
                setMensajeError(null);
              }}
              returnKeyType="next"
              editable={!cargando}
            />

            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Escribe tu contraseña"
              placeholderTextColor="#879A8B"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="current-password"
              textContentType="password"
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                setMensajeError(null);
              }}
              onSubmitEditing={iniciarSesion}
              returnKeyType="done"
              editable={!cargando}
            />

            <Pressable
              style={[styles.boton, cargando && styles.botonDeshabilitado]}
              onPress={iniciarSesion}
              disabled={cargando}
            >
              {cargando ? (
                <ActivityIndicator color="#FFFDF9" />
              ) : (
                <Text style={styles.textoBoton}>Iniciar sesión</Text>
              )}
            </Pressable>
          </View>

          <Pressable
            onPress={() => router.push("/registro")}
            disabled={cargando}
            style={styles.enlaceContenedor}
          >
            <Text style={styles.textoEnlace}>
              ¿Aún no tienes cuenta?{" "}
              <Text style={styles.textoEnlaceFuerte}>Crear una cuenta</Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  teclado: {
    flex: 1,
    backgroundColor: "#F7F4EE",
  },
  contenedorScroll: {
    flexGrow: 1,
    justifyContent: "center",
  },
  contenedor: {
    padding: 22,
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
  },
  marca: {
    width: 68,
    height: 68,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#143C32",
    borderWidth: 1,
    borderColor: "#B08B57",
    marginBottom: 14,
  },
  marcaTexto: {
    color: "#EFCF8B",
    fontSize: 21,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  etiqueta: {
    color: "#A06C4B",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1.7,
    textAlign: "center",
    marginBottom: 8,
  },
  titulo: {
    color: "#143C32",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitulo: {
    color: "#5F7067",
    textAlign: "center",
    lineHeight: 21,
    marginTop: 6,
    marginBottom: 22,
  },
  tarjeta: {
    backgroundColor: "#FFFDF9",
    borderRadius: 20,
    padding: 20,
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
    color: "#143C32",
    borderWidth: 1,
    borderColor: "#D9E1D8",
    borderRadius: 13,
    padding: 13,
    marginBottom: 15,
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
  textoBoton: {
    color: "#FFFDF9",
    fontWeight: "bold",
    fontSize: 15,
  },
  enlaceContenedor: {
    padding: 16,
  },
  textoEnlace: {
    color: "#5F7067",
    textAlign: "center",
  },
  textoEnlaceFuerte: {
    color: "#286052",
    fontWeight: "bold",
  },
  alertaError: {
    backgroundColor: "#F9E9E4",
    borderColor: "#E7B6A8",
    borderWidth: 1,
    borderRadius: 13,
    padding: 12,
    marginBottom: 16,
  },
  alertaTitulo: {
    color: "#8A3D32",
    fontWeight: "bold",
    marginBottom: 3,
  },
  alertaTexto: {
    color: "#75483F",
    lineHeight: 20,
  },
  alertaExito: {
    backgroundColor: "#EAF2E9",
    borderColor: "#BDCEB8",
    borderWidth: 1,
    borderRadius: 13,
    padding: 12,
    marginBottom: 16,
  },
  alertaExitoTitulo: {
    color: "#286052",
    fontWeight: "bold",
    marginBottom: 3,
  },
  alertaExitoTexto: {
    color: "#466457",
    lineHeight: 20,
  },
});
