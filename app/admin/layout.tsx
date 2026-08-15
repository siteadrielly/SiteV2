import type { Metadata, Viewport } from "next";
import RegisterAdminSW from "@/components/admin/RegisterAdminSW";

export const metadata: Metadata = {
  title: "Painel Vital — Adriely Anute",
  manifest: "/admin-manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Painel Vital Adriely",
    statusBarStyle: "default",
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#141210",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RegisterAdminSW />
      {children}
    </>
  );
}
