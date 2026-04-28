"use client";

import { ReactNode, useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export function AuthSessionProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}