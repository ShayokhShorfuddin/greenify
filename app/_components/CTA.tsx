"use client";

import Image from "next/image";
import guy_working_on_laptop from "@/public/svgs/guy-working-on-laptop.svg";

export function CTA() {
  return (
    <section className="flex justify-center mt-[4rem] md:mt-[7rem] font-sans">
      <div className="px-4 flex flex-col sm:flex-row items-center md:items-start justify-between max-w-[40rem] w-full gap-12">
        <Image
          src={guy_working_on_laptop}
          alt="Guy working on his laptop."
          className="w-50"
        />

        <div className="flex flex-col items-center sm:items-start text-center sm:text-start gap-y-2">
          <p className="text-2xl font-medium">
            Let's Build <span className="text-green-500">Green</span>, Together
            <span className="text-green-500">.</span>
          </p>

          <p className="text-sm text-neutral-700 xs:text-base max-w-lg">
            Start by creating a free account today and build eco-friendly web
            applications with ease.
          </p>

          <button
            type="button"
            onClick={() => {
              // TODO: use router to push to /signup
            }}
            className="relative bg-green-500 py-1 px-3 rounded text-white text-sm font-medium select-none transition-all duration-50 ease-in-out hover:cursor-pointer shadow-[0_3px_0_0_#008236] xs:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_0_0_0_#008236] mt-2 w-fit"
          >
            Get Started.
          </button>
        </div>
      </div>
    </section>
  );
}
