"use client";
import { PropsWithChildren } from "react";
import NavBar from "@/components/navBar";
import Footer from "@/components/footer";
import { motion } from "framer-motion";

interface DefaultLayoutProps extends PropsWithChildren {
  tab: string;
}

export default function DefaultLayout({ children, tab }: DefaultLayoutProps) {
  return (
    <div>
      <div className="relative max-h-full m-1">
        <NavBar currentTab={tab} />
      </div>
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="relative min-h-screen"
      >
        {children}
      </motion.main>
      <Footer currentTab={tab} />
    </div>
  );
}
