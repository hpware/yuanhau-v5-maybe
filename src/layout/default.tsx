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
      <div className="relative z-50 max-h-full m-1">
        <NavBar currentTab={tab} />
      </div>
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.75 }}
        className="relative min-h-screen"
      >
        {children}
      </motion.main>
      <Footer currentTab={tab} />
    </div>
  );
}
