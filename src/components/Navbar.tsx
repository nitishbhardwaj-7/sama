"use client";

import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Our Clients", href: "#clients" },
    { name: "Contact Us", href: "#contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-transparent transition-all duration-300">
        <div className="w-full max-w-[92%] sm:max-w-[88%] md:max-w-[80%] mx-auto py-6 sm:py-8 flex items-center justify-between">
          
          {/* Logo */}
          <a href="/" className="relative w-28 h-10 sm:w-32 sm:h-12 select-none">
            <Image
              src="/uploads/2026/02/sama-logo.png"
              alt="SAMA Production"
              fill
              priority
              unoptimized
              className="object-contain object-left"
            />
          </a>

          {/* Right Area: Tagline & Hamburger */}
          <div className="flex items-center gap-6 sm:gap-8">
            <span className="hidden md:inline-block font-ivymode text-sm sm:text-base text-white tracking-wider select-none">
              Interior Design & Implementation
            </span>

            {/* Hamburger Icon */}
            <button 
              onClick={() => setIsOpen(true)}
              className="relative flex flex-col justify-between w-6 h-4 group cursor-pointer focus:outline-none"
              aria-label="Open Menu"
            >
              <span className="w-full h-[2px] bg-white transition-all duration-300" />
              <span className="w-full h-[2px] bg-white transition-all duration-300" />
              <span className="w-full h-[2px] bg-white transition-all duration-300" />
            </button>
          </div>

        </div>
      </header>

      {/* Background Overlay */}
      <div 
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40 transition-opacity duration-500 ease-in-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Slide-out Menu Drawer from Right */}
      <div 
        className={`fixed top-0 right-0 h-full w-[80%] sm:w-[55%] md:w-[40%] max-w-md bg-[#7C8C70]/50 backdrop-blur-xl z-50 border-l border-white/20 transition-transform duration-500 ease-out shadow-2xl flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header with close button X on the left */}
        <div className="w-full mt-8 flex flex-col">
          {/* Close button X */}
          <div className="px-6 sm:px-10 py-4 flex items-center justify-start">
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-white/80 transition-colors duration-300 focus:outline-none"
              aria-label="Close Menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Links aligned right, with lines starting from left margin to right margin */}
        <nav className="flex flex-col select-none pl-16 pr-6 sm:pl-20 sm:pr-10">
          {/* Top border above first link */}
          <div className="w-full h-[1px] bg-white/20 ml-auto" />
          
          {navLinks.map((link) => (
            <div key={link.name} className="w-full flex flex-col">
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-4 sm:py-5 font-ivymode text-2xl sm:text-3xl text-right text-white hover:text-white/70 transition-colors duration-300 tracking-wider"
              >
                {link.name}
              </a>
              <div className="w-[75%] h-[1px] bg-white/20 ml-auto" />
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
