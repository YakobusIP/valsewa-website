"use client";

import { useEffect, useState } from "react";
import { LoginForm } from "./LoginForm";

type LoginPageProps = {
  onClose: () => void;
};

export default function LoginPage({ onClose }: LoginPageProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on ESC key
  useEffect(() => {
    if (!mounted) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [mounted, onClose]);

  // Prevent click inside modal from closing it
  const handleInnerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose} // click outside to close
    >
      <div
        onClick={handleInnerClick}
        className="w-full max-w-5xl h-[75vh]"
      >
        <LoginForm onClose={onClose} />
      </div>
    </div>
  );
}
