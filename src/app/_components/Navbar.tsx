"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/theme-toggler";
import Link from "next/link";

const Navbar = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession(); // Get user session

  useEffect(() => setMounted(true), []);

  return (
    <nav className="flex items-center justify-between p-4 shadow-md">
      {/* Left: Logo + Search */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
            CC
          </div>
          <Link href="/" className="text-2xl font-bold">ChopClock</Link>
        </div>
        <Input placeholder="Search..." className="w-64" />
      </div>

      {/* Right: Theme Toggle + Auth Buttons */}
      <div className="flex items-center space-x-4">
        <ModeToggle />

        {session ? (
          <div className="flex items-center space-x-4">
            {/* Avatar */}
            <img
              src={session.user?.image || "/default-avatar.png"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            {/* Username */}
            <span className="font-medium">{session.user?.name}</span>
            {/* Logout Button */}
            <button
              onClick={() => signOut()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-all"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link href={'/login'} className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
