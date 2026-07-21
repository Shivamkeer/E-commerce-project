"use client";

import { motion } from "framer-motion";

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

export default function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-slate-500 dark:text-slate-400">{subtitle}</p>
      )}
    </motion.div>
  );
}
