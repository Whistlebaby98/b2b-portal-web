import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOVA 商采云 | 企业级采购工作台",
  description: "面向制造企业的对公采购、审批与结算工作台",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
