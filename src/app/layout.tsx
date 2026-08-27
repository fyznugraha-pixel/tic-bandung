import type { Metadata } from "next";
import { Hanken_Grotesk, Space_Grotesk } from "next/font/google";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken-grotesk" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "Pesona Bandung",
  description: "Portal wisata resmi Dinas Pariwisata Kota Bandung",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        {/* We use Lucide icons mostly, but keeping this if needed by the HTML raw copy */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${hankenGrotesk.variable} ${spaceGrotesk.variable} bg-surface text-on-surface font-body-md text-body-md antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
