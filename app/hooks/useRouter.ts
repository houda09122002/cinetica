import { useRouter as useNextRouter } from "next/navigation";

export function useRouter() {
  const router = useNextRouter();

  const navigate = (path: string, query: Record<string, string> = {}) => {
    const queryString = new URLSearchParams(query).toString();
    const fullPath = queryString ? `${path}?${queryString}` : path;
    router.push(fullPath); 
  };

  return {
    ...router,
    navigate,
  };
}
