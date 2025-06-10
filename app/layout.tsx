import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "CamelSec",
  description: "Seja um camelo, não um únicornio",
  icons: {
    icon: "/images/favicon.svg"
  }
};

const inter = Inter({
  subsets: ["latin"],
  weight: [
    "100", 
    "200", 
    "300", 
    "400", 
    "500", 
    "600", 
    "700", 
    "800", 
    "900", 
  ],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
