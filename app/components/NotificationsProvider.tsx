"use client";

import { ReactNode, useEffect } from "react";
import { useNotificationChecker } from "../hook/useNotificationChecker";

interface NotificationsProviderProps {
  children: ReactNode;
}

export default function NotificationsProvider({ children }: NotificationsProviderProps) {
  // run the hook once globally
  useNotificationChecker();

  return <>{children}</>;
}
