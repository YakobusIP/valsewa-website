"use client";

import Link, { LinkProps } from "next/link";
import { ReactNode, useEffect, useState } from "react";

const STORAGE_KEY = "valsewa.lastSearchUrl";
const TTL_MS = 7 * 24 * 60 * 60 * 1000;

type Props = Omit<LinkProps, "href"> & {
  className?: string;
  children: ReactNode;
};

export default function BackToSearchLink({ children, ...rest }: Props) {
  const [href, setHref] = useState<string>("/search");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { url?: string; savedAt?: number };
      if (
        typeof parsed.url === "string" &&
        parsed.url.startsWith("/search") &&
        typeof parsed.savedAt === "number" &&
        Date.now() - parsed.savedAt < TTL_MS
      ) {
        setHref(parsed.url);
      }
    } catch {
      // bad JSON / disabled storage — keep default
    }
  }, []);

  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
