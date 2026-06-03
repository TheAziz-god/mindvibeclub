"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute left-10 top-32 h-64 w-64 rounded-full bg-[#D65A7A]/20 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute right-10 top-80 h-72 w-72 rounded-full bg-[#2D6A73]/20 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
        }}
        className="absolute bottom-20 left-1/3 h-60 w-60 rounded-full bg-[#9CC5A1]/25 blur-3xl"
      />
    </div>
  );
}