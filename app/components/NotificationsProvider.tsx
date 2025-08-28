"use client";

import { ReactNode, useEffect } from "react";
import { useNotificationChecker } from "../hook/useNotificationChecker";


interface NotificationProviderProps {
  children: ReactNode;
}

export default function NotificationsProvider({ children }: NotificationProviderProps) {
  // run the hook once globally
  useNotificationChecker();

  return <>{children}</>;
}
