import { PropsWithChildren } from "react";
import NavBar from "@/components/navBar";
import Footer from "@/components/footer";

interface DefaultLayoutProps extends PropsWithChildren {
  tab: string;
}

export default function DefaultLayout({ children, tab }: DefaultLayoutProps) {
  return (
    <div>
      <div className="relative z-50 max-h-full m-1">
        <NavBar currentTab={tab} />
      </div>
      <main className="relative">{children}</main>
      <Footer currentTab={tab} />
    </div>
  );
}
