import { useState, useEffect } from "react";
import { useRouter } from "./useRouter";
import { useSession } from "next-auth/react";
import { login } from "../repositories/authRepository";

export const useLogin = () => {
  const { status } = useSession(); // Supprimé 'session' car inutilisé
  const router = useRouter();
  const [username, setUsername] = useState<string>(""); // Typage explicite
  const [password, setPassword] = useState<string>(""); // Typage explicite
  const [error, setError] = useState<string>(""); // Typage explicite
  const [isLoading, setIsLoading] = useState<boolean>(false); // Typage explicite

  useEffect(() => {
    // Vérifie si l'utilisateur est authentifié
    if (status === "authenticated" && router.push) {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      await login(username, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      // Utilisation de 'unknown' pour les erreurs
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inattendue est survenue.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    isLoading,
    handleLogin,
  };
};
