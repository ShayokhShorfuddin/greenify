"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { copyToClipboard } from "@/app/_utils/copy-to-clipboard";
import clipboard from "@/public/svgs/clipboard.svg";
import cross from "@/public/svgs/cross.svg";
import green_tick from "@/public/svgs/green-tick.svg";

export function CopyToClipboardButton({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [icon, setIcon] = useState(clipboard);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const { errorOccurred } = await copyToClipboard({ text });

    if (errorOccurred) {
      setIcon(cross);
    } else {
      setIcon(green_tick);
    }

    timeoutRef.current = setTimeout(() => {
      setIcon(clipboard);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Copy to clipboard"
      aria-live="polite"
      className={`p-1.5 bg-neutral-100 rounded hover:bg-neutral-200 transition hover:cursor-pointer ${className ?? ""}`}
    >
      <Image src={icon} alt="Clipboard status" className="size-3.5" />
    </button>
  );
}
