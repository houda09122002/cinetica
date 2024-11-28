'use client';

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { status } = useSession(); // On déstructure uniquement `status` car `session` n'est pas utilisé
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    } else if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1>Bienvenue sur notre application</h1>
      <p>Vous serez redirigé automatiquement...</p>
    </div>
  );
}
