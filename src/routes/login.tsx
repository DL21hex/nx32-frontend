import { createSignal } from "solid-js";
import Login from "~/components/Login";

export default function LoginPage() {
  const [isLoading, setIsLoading] = createSignal(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simular una llamada a API
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Login exitoso:", email);
      alert("Bienvenido, " + email + "!");
    } catch (error) {
      console.error("Error de login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return <Login onSubmit={handleLogin} isLoading={isLoading()} />;
}
