import { CameraView, useCameraPermissions, type BarcodeScanningResult } from "expo-camera";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

function mensajeDeError(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "object" && error !== null && "message" in error) {
    return String(error.message);
  }
  return "Ocurrió un error inesperado.";
}

export default function Escanear() {
  const router = useRouter();
  const [permiso, solicitarPermiso] = useCameraPermissions();
  const [escaneado, setEscaneado] = useState(false);
  const [buscando, setBuscando] = useState(false);
  const [errorTexto, setErrorTexto] = useState("");
  const procesando = useRef(false);

  const leerQR = async ({ data }: BarcodeScanningResult) => {
    if (procesando.current) {
      return;
    }

    procesando.current = true;
    setEscaneado(true);
    setBuscando(true);
    setErrorTexto("");

    const codigo = data.trim();
    if (!codigo) {
      setErrorTexto("El código QR está vacío. Intenta con otro código.");
      setBuscando(false);
      return;
    }

    try {
      const { data: destino, error } = await supabase
        .from("destinos")
        .select("codigo")
        .eq("codigo", codigo)
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (!destino) {
        setErrorTexto(
          `No encontramos un destino con el código "${codigo}". Verifica el QR e inténtalo de nuevo.`,
        );
        return;
      }

      router.replace({
        pathname: "/detalle-item",
        params: { codigo: String(destino.codigo) },
      });
    } catch (error: unknown) {
      console.error("Error al buscar el código QR:", error);
      setErrorTexto(`No se pudo consultar el destino. ${mensajeDeError(error)}`);
    } finally {
      setBuscando(false);
    }
  };

  const escanearDeNuevo = () => {
    procesando.current = false;
    setErrorTexto("");
    setEscaneado(false);
  };

  if (!permiso) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#286052" />
        <Text style={styles.textoCarga}>Comprobando permiso de cámara...</Text>
      </View>
    );
  }

  if (!permiso.granted) {
    return (
      <View style={styles.centro}>
        <View style={styles.iconoPermiso}>
          <Text style={styles.iconoCamara}>📷</Text>
        </View>
        <Text style={styles.tituloPermiso}>Activa la cámara</Text>
        <Text style={styles.textoPermiso}>
          Necesitamos permiso para escanear el código del destino. La cámara
          solo se utiliza en esta pantalla.
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            if (permiso.canAskAgain) {
              void solicitarPermiso();
            } else {
              void Linking.openSettings();
            }
          }}
          style={({ pressed }) => [
            styles.boton,
            pressed && styles.botonPresionado,
          ]}
        >
          <Text style={styles.textoBoton}>
            {permiso.canAskAgain ? "Permitir cámara" : "Abrir ajustes"}
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.back()}
          style={styles.botonSecundario}
        >
          <Text style={styles.textoBotonSecundario}>Volver</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.contenido}>
      <Text style={styles.etiqueta}>TURISMO COLOMBIA</Text>
      <Text style={styles.titulo}>Escanea un destino</Text>
      <Text style={styles.subtitulo}>
        Enfoca el código QR del destino. El código solo contiene su identificador;
        la ficha se consulta en Supabase.
      </Text>

      <View style={styles.marcoCamara}>
        <CameraView
          style={styles.camara}
          facing="back"
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          onBarcodeScanned={escaneado ? undefined : leerQR}
          onMountError={({ message }) => setErrorTexto(message)}
        />
        <View pointerEvents="none" style={styles.superposicion}>
          <View style={styles.marcoLectura} />
          <Text style={styles.textoMarco}>Coloca el QR dentro del marco</Text>
        </View>
        {buscando ? (
          <View style={styles.capaCarga}>
            <ActivityIndicator size="large" color="#FFFDF9" />
            <Text style={styles.textoCapaCarga}>Buscando el destino...</Text>
          </View>
        ) : null}
      </View>

      {errorTexto ? (
        <View style={styles.alertaError}>
          <Text style={styles.tituloError}>No se pudo abrir el destino</Text>
          <Text style={styles.textoError}>{errorTexto}</Text>
          <Pressable
            accessibilityRole="button"
            onPress={escanearDeNuevo}
            style={({ pressed }) => [
              styles.boton,
              pressed && styles.botonPresionado,
            ]}
          >
            <Text style={styles.textoBoton}>Escanear de nuevo</Text>
          </Pressable>
        </View>
      ) : null}

      <Text style={styles.ayuda}>
        Usa el código exacto de un registro de destinos, por ejemplo NAR-001.
      </Text>
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
    marginBottom: 7,
  },
  subtitulo: {
    color: "#5F7067",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 18,
  },
  marcoCamara: {
    backgroundColor: "#143C32",
    borderRadius: 22,
    height: 420,
    overflow: "hidden",
    position: "relative",
  },
  camara: {
    flex: 1,
  },
  superposicion: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
  },
  marcoLectura: {
    borderColor: "#EFCF8B",
    borderRadius: 20,
    borderWidth: 3,
    height: 230,
    width: 230,
  },
  textoMarco: {
    backgroundColor: "rgba(20, 60, 50, 0.78)",
    borderRadius: 12,
    color: "#FFFDF9",
    fontSize: 13,
    marginTop: 18,
    overflow: "hidden",
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  capaCarga: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    backgroundColor: "rgba(20, 60, 50, 0.78)",
    justifyContent: "center",
  },
  textoCapaCarga: {
    color: "#FFFDF9",
    fontWeight: "bold",
    marginTop: 12,
  },
  alertaError: {
    backgroundColor: "#F9E9E4",
    borderColor: "#E7B6A8",
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 16,
    padding: 15,
  },
  tituloError: {
    color: "#8A3D32",
    fontWeight: "bold",
    marginBottom: 5,
  },
  textoError: {
    color: "#75483F",
    lineHeight: 20,
    marginBottom: 12,
  },
  ayuda: {
    color: "#879A8B",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 14,
    textAlign: "center",
  },
  iconoPermiso: {
    alignItems: "center",
    backgroundColor: "#E8EEE6",
    borderRadius: 22,
    height: 72,
    justifyContent: "center",
    marginBottom: 16,
    width: 72,
  },
  iconoCamara: {
    fontSize: 34,
  },
  tituloPermiso: {
    color: "#143C32",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  textoPermiso: {
    color: "#5F7067",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 18,
    textAlign: "center",
  },
  boton: {
    alignItems: "center",
    backgroundColor: "#286052",
    borderRadius: 13,
    paddingHorizontal: 20,
    paddingVertical: 13,
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
    marginTop: 12,
    padding: 10,
  },
  textoBotonSecundario: {
    color: "#286052",
    fontWeight: "bold",
  },
});
