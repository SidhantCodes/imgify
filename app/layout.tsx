import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner"

import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";

const IBMPlex = IBM_Plex_Sans({
  variable: '--font-ibm-plex',
  weight: ['400','500', '600', '700'],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Imgify",
  description: "Simplified AI powered image manipulation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      variables: { colorPrimary: '#624cf5' }
    }}>
      <html lang="en">
        <body
          className={cn("font-IBMPlex antialiased", IBMPlex.variable)}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
