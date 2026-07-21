import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}

const sizes = {
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-lg",
  lg: "h-12 w-12 text-xl",
};

export default function Logo({ size = "md", showTagline = true }: LogoProps) {
  return (
    <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label="NovaCart Home">
      <div
        className={`${sizes[size]} flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 font-black text-white shadow-lg shadow-indigo-500/30 transition-transform group-hover:scale-105`}
      >
        N
      </div>
      <div className="hidden sm:block">
        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Nova<span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Cart</span>
        </span>
        {showTagline && (
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Premium Store
          </p>
        )}
      </div>
    </Link>
  );
}
