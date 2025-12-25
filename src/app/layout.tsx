import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Enterprise Solutions - 专业企业级数字化解决方案服务商",
  description: "提供全方位企业级数字化转型解决方案,包括云计算平台、企业服务、智能系统等专业服务。助力企业实现数字化升级,提升运营效率,赋能业务增长。",
  keywords: "企业级解决方案,数字化转型,云计算,企业服务,智能系统,业务增长",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
