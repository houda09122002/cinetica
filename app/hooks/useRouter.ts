import { useRouter as useNextRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useRouter() {
  if (typeof window === "undefined") {
    throw new Error("useRouter can only be used on the client side.");
  }

  const router = useNextRouter();

  const navigate = (path: string, query = {}) => {
    router.push({ pathname: path, query });
  };

  return {
    ...router,
    navigate,
  };
}
