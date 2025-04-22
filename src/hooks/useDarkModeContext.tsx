"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  enableDarkMode: () => void;
  disableDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error(
      "OiOi, useDarkMode must be used within a DarkModeProvider."
    );
  }
  return context;
};

export const DarkModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode");
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (darkMode === "enabled" || (!darkMode && prefersDarkMode)) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (e.matches) enableDarkMode();
      else disableDarkMode();
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  const enableDarkMode = () => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("darkMode", "enabled");
    setIsDarkMode(true);
  };

  const disableDarkMode = () => {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", "disabled");
    setIsDarkMode(false);
  };

  const toggleDarkMode = () => {
    if (isDarkMode) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  };

  return (
    <DarkModeContext.Provider
      value={{ isDarkMode, toggleDarkMode, enableDarkMode, disableDarkMode }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};
