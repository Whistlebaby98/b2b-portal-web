import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "./components/store-provider";

export const metadata: Metadata = {
  title: "企采云 | 企业级对公采购商城",
  description: "面向企业客户的选品、协议价、促销与订单服务",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body><StoreProvider>{children}</StoreProvider></body>
    </html>
  );
}
