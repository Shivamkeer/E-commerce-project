"use client";

import { motion } from "framer-motion";
import { FiTruck, FiShield, FiRefreshCw, FiHeadphones } from "react-icons/fi";

const features = [
  { icon: FiTruck, title: "Free Delivery", desc: "On orders above ₹499" },
  { icon: FiShield, title: "Secure Payment", desc: "100% protected checkout" },
  { icon: FiRefreshCw, title: "Easy Returns", desc: "7-day return policy" },
  { icon: FiHeadphones, title: "24/7 Support", desc: "Dedicated customer care" },
];

export default function TrustBar() {
  return (
    <section className="py-8 md:py-12">
      <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 p-6 md:p-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
                <feature.icon size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-white">{feature.title}</h3>
                <p className="text-sm text-indigo-200">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
