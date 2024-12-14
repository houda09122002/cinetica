import { useRouter as useNextRouter } from "next/navigation";

export function useRouter() {


  const router = useNextRouter();

  const navigate = (path: string, query = {}) => {
    router.push({ pathname: path, query });
  };

  return {
    ...router,
    navigate,
  };
}
