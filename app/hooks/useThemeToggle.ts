import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export const useThemeToggle = () => {
  const {  setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return { 
    theme: resolvedTheme,  
    toggleTheme,
    setTheme,
    mounted  
  };
};
