"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const destinations = [
  { name: "Kashmir", image: "/destinations/kashmir.jpg" },
  { name: "Goa", image: "/destinations/goa.jpg" },
  { name: "Rajasthan", image: "/destinations/rajasthan.jpg" },
];

export default function HeroShowcase() {
  return (
    <section
      id="home"
      className="relative w-full bg-gray-200 px-5 sm:px-8 pb-10"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Hero Container with rounded background */}
        <div className="relative w-full h-[650px] rounded-[40px] overflow-hidden flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0 opacity-90">
            <Image
              src="/hero_section.png"
              alt="Hero background"
              fill
              priority
              className="object-cover"
            />
            {/* Dark overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/45 to-slate-900/15"></div>
          </div>

          {/* Vertical Stepper */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 flex flex-col items-center ml-[60px] mr-[50px]"
          >
            {/* Step 1 - Active */}
            <div className="w-10 h-10 rounded-full border-2 border-white bg-white flex items-center justify-center font-bold text-gray-900 transition-transform hover:scale-105">
              1
            </div>
            <div className="w-0.5 h-[60px] bg-white/70 my-1"></div>

            {/* Step 2 */}
            <div className="w-10 h-10 rounded-full border-2 border-white bg-transparent flex items-center justify-center font-bold text-white transition-transform hover:scale-105">
              2
            </div>
            <div className="w-0.5 h-[60px] bg-white/70 my-1"></div>

            {/* Step 3 */}
            <div className="w-10 h-10 rounded-full border-2 border-white bg-transparent flex items-center justify-center font-bold text-white transition-transform hover:scale-105">
              3
            </div>
          </motion.div>

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative z-10 text-gray-50"
          >
            <p className="text-sm font-semibold tracking-wider mb-4 text-gray-200">
              ELEVATE YOUR TRAVEL JOURNEY
            </p>
            <h1 className="text-6xl lg:text-[70px] leading-tight font-bold mb-10 text-gray-50">
              One Solution For All<br /> Your Travel Needs
            </h1>

            {/* CTA Buttons */}
            <div className="flex items-center gap-5">
              <Link
                href="/checkout"
                className="px-9 py-4 bg-blue-600 text-white font-semibold rounded-full shadow-[0_10px_20px_rgba(59,130,246,0.4)] hover:bg-blue-700 transition"
              >
                Book A Trip Now
              </Link>
              <button className="w-[55px] h-[55px] rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-105 transition">
                <span className="text-blue-600 text-lg ml-1">▶</span>
              </button>
            </div>
          </motion.div>

          {/* Bottom Right Info Card with diagonal curves */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="absolute bottom-0 right-0 z-20 rounded-tl-[40px] rounded-br-[40px] p-8 flex flex-col gap-5 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(37,99,235,0.9))",
            }}
          >
            {/* Floating glow animation */}
            <div
              className="absolute w-[180px] h-[180px] top-[-60px] left-[-60px] opacity-60 blur-sm pointer-events-none animate-pulse"
              style={{
                background: "radial-gradient(circle, rgba(59,130,246,0.7), transparent 60%)",
              }}
            ></div>

            {/* Know More */}
            <Link
              href="/itineraries"
              className="relative z-10 flex justify-between items-center font-bold text-lg cursor-pointer group"
            >
              <span className="text-gray-50 tracking-wide">Know More</span>
              <span className="w-7 h-7 rounded-full bg-slate-900/85 text-yellow-400 flex items-center justify-center transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

            {/* Places Preview */}
            <div className="relative z-10 flex items-center gap-4">
              {/* Stacked Images */}
              <div className="flex">
                {destinations.map((dest, idx) => (
                  <div
                    key={dest.name}
                    className="w-[45px] h-[45px] rounded-full border-[3px] border-slate-900/90 overflow-hidden shadow-lg transition-transform hover:translate-y-[-4px] hover:scale-105"
                    style={{ marginLeft: idx === 0 ? "0" : "-15px" }}
                  >
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      width={45}
                      height={45}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Text */}
              <div>
                <h4 className="text-sm font-semibold text-gray-50 mb-1">Awesome Places</h4>
                <p className="text-xs text-blue-200 leading-snug">
                  Discover the world one<br />adventure at a time.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
