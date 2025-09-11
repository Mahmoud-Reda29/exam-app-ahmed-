import type { Metadata } from "next";
import "./globals.css";

import { GeistMono } from "geist/font/mono";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/providers/react-query.provider";
import ParentSessionProvider from "@/components/providers/parent-session-provider.provider";
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // all weights
  style: ["normal"], // regular only
  variable: "--font-inter",
  display: "swap",
});
export const metadata: Metadata = {
  title: "Exam App",
  description: "website to test your coding knowledge and skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${GeistMono.variable} ${inter.variable} antialiased`}>
        <ParentSessionProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ParentSessionProvider>
      </body>
    </html>
  );
}
