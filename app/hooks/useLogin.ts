import { useState, useEffect } from "react";
import { useRouter } from "./useRouter"; // Import the custom hook
import { useSession } from "next-auth/react";
import { login } from "../repositories/authRepository";

export const useLogin = () => {
  const { data: session, status } = useSession();
  const router = useRouter(); // Using the safe, client-only router hook
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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
    } catch (err: any) {
      setError(err.message || "Une erreur inattendue est survenue.");
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
