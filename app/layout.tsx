import type { Metadata } from "next";
import { Fraunces, Jost, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-fraunces",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-jost",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"],
  style: ["italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adrielyanute.com.br"),
  title: "Dra. Adriely Anute — Harmonização Facial & Implantodontia",
  description:
    "Harmonização facial, implantodontia e facetas em João Pessoa, PB. Tratamentos de alto padrão conduzidos com técnica apurada e discrição.",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    url: "https://adrielyanute.com.br/",
    title: "Dra. Adriely Anute — Harmonização Facial & Implantodontia",
    description: "Harmonização facial, implantodontia e facetas em João Pessoa, PB.",
    images: [{ url: "/img/og-image.jpg", width: 1200, height: 630 }],
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dra. Adriely Anute — Harmonização Facial & Implantodontia",
    description: "Harmonização facial, implantodontia e facetas em João Pessoa, PB.",
    images: ["/img/og-image.jpg"],
  },
};

export const viewport = {
  themeColor: "#141210",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${jost.variable} ${cormorant.variable}`}>
      <body className="font-body font-light antialiased">{children}</body>
    </html>
  );
}
