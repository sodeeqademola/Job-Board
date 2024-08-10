"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
type childrenProp = {
  children: ReactNode;
};
export default function App({ children }: childrenProp) {
  return <SessionProvider>{children}</SessionProvider>;
}
