import { signIn } from "next-auth/react";

export const login = async (username: string, password: string) => {
  const result = await signIn("credentials", {
    redirect: false,
    username,
    password,
  });

  if (result?.error) {
    throw new Error(result.error);
  }

  return result;
};
