// app/context/NotificationsProvider.tsx
"use client";

import React, { createContext, useContext } from "react";
import { useNotificationSettings } from "@/app/hook/useNotificationSettings";
import { useNotificationChecker } from "@/app/hook/useNotificationChecker";

type NotificationsContextType = {
  settings: {
    enableReminders: boolean;
    interval: "5min" | "15min" | "30min" | "1hr" | "6hr" | "12hr" | "24hr";
  };
  updateSettings: (newSettings: {
    enableReminders: boolean;
    interval: "5min" | "15min" | "30min" | "1hr" | "6hr" | "12hr" | "24hr";
  }) => void;
};

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings, updateSettings } = useNotificationSettings();

  // Run auto-check system with current frequency
  useNotificationChecker();

  

  return (
    <NotificationsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </NotificationsContext.Provider>
  );
};

// Hook for easy access
export const useNotifications = () => {
  const ctx = useContext(NotificationsContext);
  if (!ctx) {
    throw new Error("useNotifications must be used inside NotificationsProvider");
  }
  return ctx;
};
