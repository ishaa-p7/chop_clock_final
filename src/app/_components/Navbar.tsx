"use client"

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
// import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/theme-toggler";

const Navbar = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <nav className="flex items-center justify-between p-4 shadow-md">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
            CC
          </div>
          <Link href="/" className="text-2xl font-bold">ChopClock</Link>
        </div>
        <Input placeholder="Search..." className="w-64" />
      </div>
      <div className="flex items-center space-x-4">
      <ModeToggle />

        <Link href={'/login'} className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all">
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
