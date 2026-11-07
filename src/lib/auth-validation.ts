type AuthAction = "login" | "registro" | "logout";

export function validateEmail(email: string) {
  const value = email.trim();
  if (!value) {
    return "Escribe tu correo electrónico.";
  }

  if (value.length > 254) {
    return "El correo electrónico es demasiado largo.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
    return "Ingresa un correo válido, por ejemplo nombre@correo.com.";
  }

  return null;
}

export function validatePassword(password: string) {
  if (!password.trim()) {
    return "La contraseña no puede estar vacía o contener solo espacios.";
  }

  if (password.length < 6) {
    return "La contraseña debe tener al menos 6 caracteres.";
  }

  return null;
}

export function getAuthErrorMessage(error: unknown, action: AuthAction) {
  const message =
    error instanceof Error ? error.message.toLocaleLowerCase() : "";

  if (message.includes("fetch") || message.includes("network")) {
    return "No pudimos conectar con el servicio. Revisa tu conexión e inténtalo de nuevo.";
  }

  if (
    action === "login" &&
    (message.includes("invalid login credentials") ||
      message.includes("invalid credentials"))
  ) {
    return "El correo o la contraseña no coinciden. Revísalos e inténtalo de nuevo.";
  }

  if (
    message.includes("weak password") ||
    message.includes("password should be at least")
  ) {
    return "La contraseña no cumple los requisitos de seguridad de la cuenta.";
  }

  if (
    action === "login" &&
    (message.includes("email not confirmed") ||
      message.includes("email_not_confirmed"))
  ) {
    return "Confirma tu correo electrónico antes de iniciar sesión.";
  }

  if (
    action === "registro" &&
    (message.includes("already registered") ||
      message.includes("user already exists") ||
      message.includes("already been registered"))
  ) {
    return "Ya existe una cuenta con ese correo. Inicia sesión o prueba con otro.";
  }

  if (message.includes("rate limit") || message.includes("too many requests")) {
    return "Se hicieron varios intentos seguidos. Espera un momento y vuelve a intentarlo.";
  }

  if (action === "logout") {
    return "No pudimos cerrar la sesión. Inténtalo de nuevo.";
  }

  return action === "registro"
    ? "No pudimos crear tu cuenta. Revisa los datos e inténtalo de nuevo."
    : "No pudimos completar el inicio de sesión. Inténtalo de nuevo.";
}
