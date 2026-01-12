import { createSignal } from "solid-js";

interface LoginProps {
  onSubmit?: (email: string, password: string) => void;
  isLoading?: boolean;
}

export default function Login(props: LoginProps) {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    setError("");

    if (!email() || !password()) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (!email().includes("@")) {
      setError("Por favor ingresa un email válido");
      return;
    }

    props.onSubmit?.(email(), password());
  };

  return (
    <div class="min-h-screen flex items-center justify-center bg-background p-4">
      <div class="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-lg">
        <h1 class="mb-6 text-center text-3xl font-bold text-foreground">
          Iniciar Sesión
        </h1>

        <form onSubmit={handleSubmit} class="space-y-4">
          {error() && (
            <div class="rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">
              {error()}
            </div>
          )}

          <div>
            <label for="email" class="block text-sm font-medium text-foreground mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email()}
              onInput={(e) => setEmail(e.currentTarget.value)}
              placeholder="tu@email.com"
              class="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              disabled={props.isLoading}
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-foreground mb-1">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password()}
              onInput={(e) => setPassword(e.currentTarget.value)}
              placeholder="••••••••"
              class="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              disabled={props.isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={props.isLoading}
            class="w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {props.isLoading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>

        <p class="mt-4 text-center text-sm text-muted-foreground">
          ¿No tienes cuenta?{" "}
          <a href="/register" class="text-primary hover:underline font-medium">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
}
