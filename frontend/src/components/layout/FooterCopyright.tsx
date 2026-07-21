"use client";

import Link from "next/link";

export default function FooterCopyright() {
  const year = new Date().getFullYear();
  const lastUpdated = "1 January 2026";

  return (
    <div className="mt-10 border-t border-slate-800 pt-8">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-sm text-slate-500">
            © {year} NovaCart. All rights reserved.
          </p>
          <p className="mt-1 text-sm font-medium text-slate-400">
            Designed & Developed by{" "}
            <span className="text-indigo-400">Shivam Keer</span>
          </p>
          <p className="mt-1 text-xs text-slate-600">Last updated: {lastUpdated}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
          <Link href="#" className="hover:text-indigo-400">
            Privacy
          </Link>
          <Link href="#" className="hover:text-indigo-400">
            Terms
          </Link>
          <Link href="#" className="hover:text-indigo-400">
            Cookies
          </Link>
          <Link href="/orders" className="hover:text-indigo-400">
            Track Order
          </Link>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-slate-600">
        Copyright © {year} Shivam Keer
      </p>
    </div>
  );
}
