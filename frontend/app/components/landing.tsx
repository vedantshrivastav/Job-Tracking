"use client";
import React, { useEffect } from "react";
import { Header } from "./header";
import { Hero } from "../LP/hero";
import { Problem } from "../LP/problem";
import HowItWorks from "../LP/howItWorks";
import { Features } from "../LP/features";
import DashboardPreview from "../LP/dashboardpreview";
import FinalCTA from "../LP/finalcta";
import Footer from "../LP/footer";
import { useRouter } from "next/navigation";

export const Landing = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/dashboard");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col selection:bg-zinc-900 selection:text-white">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Problem />
        <HowItWorks />
        <Features />
        <DashboardPreview />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};
