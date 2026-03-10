"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Tours", href: "/itineraries" },
  { name: "Packages", href: "/packages" },
  { name: "Contact", href: "/contact" },
];

const Navbar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="relative z-50 bg-gray-200" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <nav className="max-w-[1400px] mx-auto flex items-center justify-between px-5 sm:px-8 py-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="h-12 flex items-center"
          >
            <Image
              src="/logo.png"
              alt="AllTrip Logo"
              width={140}
              height={48}
              className="object-contain"
              priority
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-semibold uppercase tracking-wide transition-colors ${
                pathname === link.href
                  ? "text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-5">
          <Link
            href="/plan-trip"
            className="px-8 py-3 bg-slate-900 text-white rounded-full font-semibold text-sm hover:bg-slate-800 transition"
          >
            Plan your trip
          </Link>

          {/* Mobile Menu Button */}
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <button className="md:hidden text-slate-900 text-xl">
                <Menu />
              </button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Menu</DrawerTitle>
              </DrawerHeader>
              <div className="p-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsDrawerOpen(false)}
                    className={`text-lg font-semibold uppercase ${
                      pathname === link.href ? "text-blue-600" : "text-slate-700"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/plan-trip"
                  onClick={() => setIsDrawerOpen(false)}
                  className="mt-4 px-8 py-3 bg-slate-900 text-white rounded-full font-semibold text-center"
                >
                  Plan your trip
                </Link>
              </div>
              <DrawerClose />
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
