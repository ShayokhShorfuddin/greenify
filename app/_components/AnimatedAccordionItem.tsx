"use client";

import { AccordionItem } from "@szhsin/react-accordion";
import Image from "next/image";
import chevron from "@/public/svgs/chevron-down.svg";

export default function AnimatedAccordionItem({
  header,
  children,
}: {
  key: number;
  header: string;
  children: React.ReactNode;
}) {
  return (
    <AccordionItem
      header={({ state: { isEnter } }) => (
        <>
          <p className="text-sm font-medium xs:text-base xs:font-normal pr-2">
            {header}
          </p>

          {/* Chevron icon */}
          <Image
            className={`ml-auto transition-transform duration-200 ease-out select-none ${
              isEnter && "rotate-180"
            }`}
            src={chevron}
            alt="Chevron"
          />
        </>
      )}
      buttonProps={{
        className: () => "flex w-full px-3 py-1 text-left hover:cursor-pointer",
      }}
      contentProps={{
        className: "transition-height duration-200 ease-out",
      }}
      panelProps={{ className: "px-3 pb-2.5" }}
    >
      <p className="text-sm text-neutral-700">{children}</p>
    </AccordionItem>
  );
}
