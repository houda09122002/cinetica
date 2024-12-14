import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export const useThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // S'assurer que le composant est monté avant d'afficher ou de manipuler le thème
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fonction pour basculer le thème
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return { 
    theme: resolvedTheme,  // Le thème actuellement appliqué (géré par next-themes)
    toggleTheme,           // Fonction pour basculer le thème
    setTheme,              // Expose setTheme pour des usages spécifiques
    mounted                // Indique si le composant est monté
  };
};
