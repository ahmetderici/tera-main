import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./SessionWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FIE Pilot | AI-Powered FIE Automation",
  description: "FERPA-compliant, AI-generated FIE reports for Texas schools.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased max-w-full overflow-x-hidden`}>
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
