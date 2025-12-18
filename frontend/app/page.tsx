"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Landing } from "./components/landing";

//Here on click on the buttons a modal should open up asking for name,email,password and a signup button after that
export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return <Landing />;
}
