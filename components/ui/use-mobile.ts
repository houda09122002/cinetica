import { useEffect, useState } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Par exemple, considérer mobile si la largeur est inférieure à 768px
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Vérifiez la taille initiale

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}