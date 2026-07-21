"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiShield, FiTruck, FiRotateCw } from "react-icons/fi";
import { heroSlides } from "@/data/products";
import Button from "@/components/ui/Button";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const trustItems = [
  { icon: FiTruck, text: "Free Shipping ₹499+" },
  { icon: FiShield, text: "Secure Payments" },
  { icon: FiRotateCw, text: "7-Day Returns" },
];

export default function HeroBanner() {
  return (
    <section className="relative -mx-4 sm:-mx-6 lg:-mx-8">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: ".hero-prev",
          nextEl: ".hero-next",
        }}
        loop
        className="hero-swiper overflow-hidden rounded-none md:rounded-3xl"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative min-h-[340px] sm:min-h-[420px] md:min-h-[520px]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={slide.id === 1}
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/75 to-slate-900/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

              {/* Floating decorative elements */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-[10%] top-[20%] hidden h-20 w-20 rounded-2xl bg-white/10 backdrop-blur-md lg:block"
              />
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-[25%] bottom-[25%] hidden h-14 w-14 rounded-full bg-indigo-500/20 backdrop-blur-md lg:block"
              />

              <div className="relative flex h-full flex-col justify-center px-6 py-12 sm:px-10 md:px-16 lg:px-20">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-300 backdrop-blur-md"
                >
                  🔥 {slide.badge} · Up to {slide.discount}% OFF
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 max-w-lg text-sm leading-relaxed text-slate-300 sm:text-base md:text-lg"
                >
                  {slide.subtitle}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 flex flex-wrap gap-3"
                >
                  <Link href={slide.href}>
                    <Button variant="secondary" size="lg">
                      {slide.cta}
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      {slide.ctaSecondary}
                    </Button>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-10 flex flex-wrap gap-4"
                >
                  {trustItems.map(({ icon: Icon, text }) => (
                    <span
                      key={text}
                      className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 backdrop-blur-md sm:text-sm"
                    >
                      <Icon className="text-emerald-400" size={16} />
                      {text}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        className="hero-prev absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 md:left-6 md:h-12 md:w-12"
        aria-label="Previous slide"
      >
        <FiArrowLeft size={20} />
      </button>
      <button
        className="hero-next absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 md:right-6 md:h-12 md:w-12"
        aria-label="Next slide"
      >
        <FiArrowRight size={20} />
      </button>
    </section>
  );
}
