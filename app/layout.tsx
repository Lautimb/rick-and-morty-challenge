import type { Metadata } from "next";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Rick & Morty Explorer",
  description: "Seleccioná dos personajes y descubrí qué episodios comparten entre sí.",
  openGraph: {
    title: "Rick & Morty Explorer",
    description: "Seleccioná dos personajes y descubrí qué episodios comparten entre sí.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}})()` }} />
      </head>
      <body className="flex flex-col min-h-screen antialiased">
        <Header />
        <main className="flex-1 container-fluid pt-8 pb-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
