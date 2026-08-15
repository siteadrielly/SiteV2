import type { Metadata } from "next";
import { Fraunces, Jost, Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
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

const cloudflareWebAnalyticsToken = process.env.NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${jost.variable} ${cormorant.variable}`}>
      <body className="font-body font-light antialiased">
        {children}
        {cloudflareWebAnalyticsToken ? (
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            strategy="afterInteractive"
            data-cf-beacon={JSON.stringify({ token: cloudflareWebAnalyticsToken })}
          />
        ) : null}
      </body>
    </html>
  );
}
