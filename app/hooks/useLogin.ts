import { useState, useEffect } from "react";
import { useRouter } from "./useRouter";
import { useSession } from "next-auth/react";
import { login } from "../repositories/authRepository";

export const useLogin = () => {
  const { status } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>(""); 
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    } catch (err: unknown) {
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
