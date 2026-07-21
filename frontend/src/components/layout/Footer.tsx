"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiArrowUp,
  FiSend,
} from "react-icons/fi";
import Logo from "@/components/ui/Logo";
import FooterCopyright from "@/components/layout/FooterCopyright";
import { footerSections, paymentMethods, trustBadges } from "@/data/navigation";

const socialLinks = [
  { icon: FiFacebook, href: "#", label: "Facebook" },
  { icon: FiInstagram, href: "#", label: "Instagram" },
  { icon: FiTwitter, href: "#", label: "X / Twitter" },
  { icon: FiYoutube, href: "#", label: "YouTube" },
  { icon: FiLinkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <>
      <footer className="relative mt-auto overflow-hidden border-t border-slate-200 bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 dark:border-slate-800">
        {/* Newsletter */}
        <div className="border-b border-slate-800/80 bg-white/5 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:px-8">
            <div>
              <h3 className="text-xl font-bold text-white">Stay in the loop</h3>
              <p className="mt-1 text-sm text-slate-400">Get exclusive deals, new arrivals & insider offers.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full max-w-md gap-2">
              <div className="relative flex-1">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-3 pl-10 pr-4 text-sm text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  aria-label="Email for newsletter"
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:shadow-indigo-500/40"
              >
                <FiSend size={14} /> Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="text-sm text-emerald-400">Thanks for subscribing!</p>
            )}
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
            {/* Brand column */}
            <div className="xl:col-span-2">
              <Logo size="lg" />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
                NovaCart delivers a premium shopping experience with curated products, secure payments, and lightning-fast delivery.
              </p>

              <div className="mt-5 space-y-2 text-sm text-slate-400">
                <p className="flex items-start gap-2"><FiMapPin className="mt-0.5 shrink-0" /> 42 Commerce Park, Cyber City, Gurugram 122002</p>
                <p className="flex items-center gap-2"><FiPhone /> +91 1800-123-4567</p>
                <p className="flex items-center gap-2"><FiMail /> support@novacart.com</p>
                <p className="flex items-center gap-2"><FiClock /> Mon–Sat: 9AM – 8PM IST</p>
              </div>

              <div className="mt-5 flex gap-2">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800/80 text-slate-400 transition-all hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:shadow-indigo-500/20"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <FooterColumn title="Company" links={footerSections.company} />
            <FooterColumn title="Customer Support" links={footerSections.support} />
            <FooterColumn title="Legal" links={footerSections.legal} />
            <FooterColumn title="Shop Categories" links={footerSections.categories} />
            <FooterColumn title="Quick Links" links={footerSections.quickLinks} />
            <FooterColumn title="My Account" links={footerSections.account} />
          </div>

          {/* App download + payments */}
          <div className="mt-12 grid gap-8 border-t border-slate-800 pt-10 lg:grid-cols-2">
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Download Our App</h4>
              <div className="flex flex-wrap gap-3">
                <AppButton label="Google Play" sub="Get it on" />
                <AppButton label="App Store" sub="Download on the" />
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">We Accept</h4>
              <div className="flex flex-wrap gap-2">
                {paymentMethods.map((method) => (
                  <span
                    key={method}
                    className="rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs font-semibold text-slate-300 backdrop-blur-sm"
                  >
                    {method}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {trustBadges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full bg-emerald-900/40 px-3 py-1 text-xs font-medium text-emerald-300"
                  >
                    ✓ {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <FooterCopyright />
        </div>
      </footer>

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-20 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-500/30 transition-all hover:bg-indigo-500 md:bottom-8"
            aria-label="Back to top"
          >
            <FiArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-slate-400 transition-colors hover:translate-x-0.5 hover:text-indigo-400"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AppButton({ label, sub }: { label: string; sub: string }) {
  return (
    <button className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2.5 backdrop-blur-sm transition-all hover:border-indigo-500 hover:bg-slate-800">
      <span className="text-2xl">📱</span>
      <div className="text-left">
        <p className="text-[10px] text-slate-400">{sub}</p>
        <p className="text-sm font-semibold text-white">{label}</p>
      </div>
    </button>
  );
}
