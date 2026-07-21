"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";
import { megaMenuCategories } from "@/data/navigation";

interface CategoryMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function CategoryMenu({ open, onClose }: CategoryMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-[120px] z-40 bg-black/20 backdrop-blur-sm lg:top-[128px]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full z-50 border-t border-slate-200/80 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95"
          >
            <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-3 lg:px-8 xl:grid-cols-6">
              {megaMenuCategories.map((cat) => (
                <div key={cat.slug}>
                  <Link
                    href={`/products?category=${cat.slug}`}
                    onClick={onClose}
                    className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900 transition-colors hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
                  >
                    <span className="text-xl">{cat.icon}</span>
                    {cat.name}
                    <FiChevronRight size={14} className="opacity-50" />
                  </Link>
                  <ul className="space-y-2">
                    {cat.subcategories.map((sub) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          onClick={onClose}
                          className="text-sm text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
