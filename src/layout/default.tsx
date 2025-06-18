import { PropsWithChildren } from "react";
import NavBar from "@/components/navBar";

interface DefaultLayoutProps extends PropsWithChildren {
  tab: string;
}

export default function DefaultLayout({ children, tab }: DefaultLayoutProps) {
  return (
    <div>
      <div className="relative z-50 max-h-full">
        <NavBar currentTab={tab} />
      </div>
      <main className="relative">{children}</main>
    </div>
  );
}
