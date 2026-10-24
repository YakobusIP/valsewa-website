import { Toaster } from "@/components/ui/toaster";

import { AuthProvider } from "@/contexts/AuthContext";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Valsewa",
  description: "Valsewa App",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: "/favicon.png",
    shortcut: "/favicon.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
        <Script id="qontak-webchat" strategy="afterInteractive">
          {`
            const qchatInit = document.createElement("script");
            qchatInit.src = "https://webchat.qontak.com/qchatInitialize.js";
            qchatInit.onload = function () {
              qchatInitialize({
                id: "1b1af1f9-dd12-4286-85eb-3882be874369",
                code: "dDykx5cfIZz14HNsYBEdMw"
              });
              const qchatWidget = document.createElement("script");
              qchatWidget.src = "https://webchat.qontak.com/js/app.js";
              document.head.appendChild(qchatWidget);
            };
            document.head.appendChild(qchatInit);
          `}
        </Script>
      </body>
    </html>
  );
}
