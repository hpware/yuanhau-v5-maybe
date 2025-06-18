import { PropsWithChildren } from "react";
import NavBar from "@/components/navBar";

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <NavBar currentTab="home" />
      {children}
    </div>
  );
}
