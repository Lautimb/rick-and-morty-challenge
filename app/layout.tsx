import type { Metadata } from "next";
import "./css/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Rick & Morty Challenge",
  description: "Rick and Morty character explorer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen antialiased">
        <Header />
        <main className="flex-1 container-fluid py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
