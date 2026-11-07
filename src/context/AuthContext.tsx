import type { Session } from "@supabase/supabase-js";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "../lib/supabase";

type AuthContextValue = {
  session: Session | null;
  cargando: boolean;
  error: string | null;
  recargarSesion: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState(0);

  const recargarSesion = useCallback(() => {
    setIntento((valor) => valor + 1);
  }, []);

  useEffect(() => {
    let activo = true;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_evento, nuevaSesion) => {
      if (activo) {
        setSession(nuevaSesion);
      }
    });

    const recuperarSesion = async () => {
      setCargando(true);
      setError(null);

      try {
        const { data, error: errorAuth } = await supabase.auth.getSession();
        if (errorAuth) {
          throw errorAuth;
        }

        if (activo) {
          setSession(data.session);
        }
      } catch {
        if (activo) {
          setError(
            "Comprueba tu conexión e inténtalo otra vez. Tu cuenta y tus datos siguen protegidos.",
          );
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    void recuperarSesion();

    return () => {
      activo = false;
      subscription.unsubscribe();
    };
  }, [intento]);

  return (
    <AuthContext.Provider
      value={{ session, cargando, error, recargarSesion }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider.");
  }
  return context;
}
