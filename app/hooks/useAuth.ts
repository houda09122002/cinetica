import { signOut } from "next-auth/react";

export const useAuth = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return { handleLogout };
};
