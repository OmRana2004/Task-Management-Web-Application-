// src/components/ThemeProvider.jsx
import { useEffect } from "react";
import { useThemeStore } from "../store/themeStore";

const ThemeProvider = ({ children }) => {
  const { isDark } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDark]);

  return <>{children}</>;
};

export default ThemeProvider;
