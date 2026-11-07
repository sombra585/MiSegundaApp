import { useState } from "react";
import { useRouter } from "expo-router";
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
import { getAuthErrorMessage, validateEmail, validatePassword } from "../../lib/auth-validation";
import { supabase } from "../../lib/supabase";

export default function Registro() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeError, setMensajeError] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);

  const crearCuenta = async () => {
    const errorCorreo = validateEmail(correo);
    if (errorCorreo) {
      setMensajeError(errorCorreo);
      return;
    }

    const errorPassword = validatePassword(password);
    if (errorPassword) {
      setMensajeError(errorPassword);
      return;
    }

    setMensajeError(null);
    setGuardando(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: correo.trim(),
        password,
      });
      if (error) {
        setMensajeError(getAuthErrorMessage(error, "registro"));
        return;
      }

      if (data.session) {
        const { error: errorCerrarSesion } = await supabase.auth.signOut();
        if (errorCerrarSesion) {
          setMensajeError(
            "La cuenta se creó, pero no pudimos cerrar la sesión automáticamente. Si ya entraste, puedes cerrarla desde el inicio.",
          );
          return;
        }
      }

      router.replace({
        pathname: "/login",
        params: {
          aviso: data.session
            ? "Tu cuenta quedó creada. Ya puedes iniciar sesión."
            : "Tu cuenta quedó creada. Revisa tu correo para confirmar la dirección antes de iniciar sesión.",
        },
      });
    } catch (error) {
      setMensajeError(getAuthErrorMessage(error, "registro"));
    } finally {
      setGuardando(false);
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
          <Text style={styles.titulo}>Crea tu cuenta</Text>
          <Text style={styles.subtitulo}>
            Regístrate para empezar a planificar tu próxima experiencia.
          </Text>

          <View style={styles.tarjeta}>
            {mensajeError && (
              <View style={styles.alertaError} accessibilityLiveRegion="polite">
                <Text style={styles.alertaTitulo}>Revisa la información</Text>
                <Text style={styles.alertaTexto}>{mensajeError}</Text>
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
              editable={!guardando}
            />

            <Text style={styles.label}>Contraseña</Text>
            <Text style={styles.ayuda}>Usa al menos 6 caracteres.</Text>
            <TextInput
              style={styles.input}
              placeholder="Crea una contraseña"
              placeholderTextColor="#879A8B"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="new-password"
              textContentType="newPassword"
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                setMensajeError(null);
              }}
              onSubmitEditing={crearCuenta}
              returnKeyType="done"
              editable={!guardando}
            />

            <Pressable
              style={[styles.boton, guardando && styles.botonDeshabilitado]}
              onPress={crearCuenta}
              disabled={guardando}
            >
              {guardando ? (
                <ActivityIndicator color="#FFFDF9" />
              ) : (
                <Text style={styles.textoBoton}>Crear cuenta</Text>
              )}
            </Pressable>
          </View>

          <Pressable
            onPress={() => router.replace("/login")}
            disabled={guardando}
            style={styles.enlaceContenedor}
          >
            <Text style={styles.textoEnlace}>
              ¿Ya tienes cuenta?{" "}
              <Text style={styles.textoEnlaceFuerte}>Inicia sesión</Text>
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
  ayuda: {
    color: "#7A887D",
    fontSize: 12,
    marginTop: -3,
    marginBottom: 7,
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
});
