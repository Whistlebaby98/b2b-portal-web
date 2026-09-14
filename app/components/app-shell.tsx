"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { useStore } from "./store-provider";
import { Icon, type IconName } from "./icons";
import { cn } from "./ui";

const navItems: Array<{ href: string; label: string; icon: IconName; badge?: string }> = [
  { href: "/", label: "商城首页", icon: "grid" },
  { href: "/products", label: "商品目录", icon: "bag" },
  { href: "/bulk-buying", label: "批量采购", icon: "layers", badge: "NEW" },
  { href: "/promotions", label: "促销活动", icon: "tag", badge: "HOT" },
  { href: "/orders", label: "订单中心", icon: "receipt" },
  { href: "/cart", label: "采购车", icon: "cart" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { company, user, cartItemCount, session, logout } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => { setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    const destination = /^(PO|ord_)/i.test(value) ? "/orders" : "/products";
    router.push(value ? `${destination}?query=${encodeURIComponent(value)}` : destination);
  }

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return <div className="min-h-screen bg-fog">
    <div className="flex min-h-screen">
      <aside className={cn("fixed inset-y-0 left-0 z-50 flex w-[250px] -translate-x-full flex-col border-r border-white/10 bg-[#10233f] px-4 py-5 text-white shadow-2xl transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:shadow-none", mobileOpen && "translate-x-0")}>
        <div className="flex items-center gap-3 px-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#ff745f] text-[16px] font-black text-white shadow-[0_8px_24px_rgba(255,116,95,0.3)]">Q</div>
          <div><div className="text-[16px] font-black tracking-[0.03em]">企采云</div><div className="mt-0.5 text-[9px] font-semibold tracking-[0.2em] text-slate-300/60">B2B MARKETPLACE</div></div>
          <button type="button" aria-label="关闭导航" onClick={() => setMobileOpen(false)} className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 hover:bg-white/10 lg:hidden"><Icon name="close" size={17} /></button>
        </div>

        <div className="mt-10 px-2.5 text-[9px] font-bold tracking-[0.2em] text-slate-300/45">采购空间</div>
        <nav className="mt-3 space-y-1" aria-label="主导航">
          {navItems.map((item) => <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 rounded-xl px-3 py-3 text-[12px] font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white", isActive(item.href) && "bg-white text-ink shadow-[0_10px_24px_rgba(5,22,47,0.18)] hover:bg-white hover:text-ink")}>
            <Icon name={item.icon} size={17} stroke={isActive(item.href) ? 2 : 1.7} />
            <span className="flex-1">{item.label}</span>
            {item.badge && <span className={cn("rounded-full px-1.5 py-0.5 text-[8px] font-black", isActive(item.href) ? "bg-[#fff0ea] text-coral" : "bg-coral/20 text-[#ff9b87]")}>{item.badge}</span>}
            {item.href === "/cart" && cartItemCount > 0 && <span className={cn("flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[9px] font-black", isActive(item.href) ? "bg-cyan/15 text-cyan" : "bg-white/10 text-white")}>{cartItemCount}</span>}
          </Link>)}
        </nav>

        <div className="mt-9 px-2.5 text-[9px] font-bold tracking-[0.2em] text-slate-300/45">账户与支持</div>
        <nav className="mt-3 space-y-1">
          <Link href="/account" className={cn("flex items-center gap-3 rounded-xl px-3 py-3 text-[12px] font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white", isActive("/account") && "bg-white text-ink hover:bg-white hover:text-ink")}><Icon name="building" size={17} /><span className="flex-1">企业账户</span></Link>
          <button type="button" onClick={() => window.alert("客户成功经理将在 1 个工作日内联系你。")} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[12px] font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"><Icon name="help" size={17} /><span className="flex-1">帮助与服务</span></button>
        </nav>

        <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.06] p-3.5">
          <div className="flex items-start justify-between"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#25415f] text-[#82e4dc]"><Icon name="shield" size={16} /></div><span className="rounded-full bg-[#164b50] px-2 py-1 text-[9px] font-bold text-[#8ce9e1]">已认证</span></div>
          <div className="mt-3 text-[11px] font-bold">金牌企业客户</div><div className="mt-1 text-[10px] leading-5 text-slate-300/60">专享协议价与 30 天账期已生效</div>
          <Link href="/account" className="mt-3 flex items-center gap-1 text-[10px] font-bold text-[#82e4dc]">查看企业权益 <Icon name="arrow" size={13} /></Link>
        </div>
        <div className="mt-4 px-2.5 text-[10px] text-slate-300/45">企采云 · 客户端 MVP 1.0</div>
      </aside>
      {mobileOpen && <button type="button" aria-label="关闭菜单遮罩" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-[#071425]/55 lg:hidden" />}

      <div className="min-w-0 flex-1">
        <div className="border-b border-[#f3d3c8] bg-[#fff7f3] px-5 py-2 text-center text-[10px] font-semibold text-[#b9684f] sm:text-[11px]">九月采购季 · 金牌客户满 ¥5,000 立减 ¥50，协议价可直接享受</div>
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-line/80 bg-white/95 px-4 backdrop-blur sm:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <button type="button" aria-label="打开导航" onClick={() => setMobileOpen(true)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line text-ink lg:hidden"><Icon name="menu" size={18} /></button>
            <form onSubmit={submitSearch} className="relative hidden w-[min(360px,42vw)] sm:block"><Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="搜索商品或订单" className="h-10 w-full rounded-xl border border-transparent bg-fog pl-9 pr-12 text-[11px] font-medium text-ink outline-none transition placeholder:text-slate-400 focus:border-cyan/30 focus:bg-white focus:ring-4 focus:ring-cyan/10" placeholder="搜索商品、SKU 或订单号" /><kbd className="absolute right-2.5 top-2.5 rounded-md bg-white px-1.5 py-1 text-[9px] font-semibold text-slate-400 shadow-sm">⌘ K</kbd></form>
            <div className="min-w-0 sm:hidden"><div className="truncate text-[13px] font-bold text-ink">{pathname === "/" ? "商城首页" : pathname.startsWith("/products") ? "商品目录" : pathname.startsWith("/orders") ? "订单中心" : "企采云"}</div><div className="text-[9px] text-slate-400">{company.shortName}</div></div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/cart" aria-label={`采购车，共 ${cartItemCount} 件`} className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate transition hover:bg-fog hover:text-cyan"><Icon name="cart" size={18} />{cartItemCount > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-coral px-1 text-[8px] font-black text-white">{cartItemCount}</span>}</Link>
            <button type="button" aria-label="通知" onClick={() => window.alert("目前没有新的通知")} className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate transition hover:bg-fog hover:text-cyan"><Icon name="bell" size={18} /><span className="absolute right-2 top-1.5 h-1.5 w-1.5 rounded-full bg-coral ring-2 ring-white" /></button>
            <div className="ml-1 hidden h-7 w-px bg-line sm:block" />
            <Link href={session.authenticated ? "/account" : "/login"} className="flex items-center gap-2 rounded-xl py-1 pl-1 pr-1.5 transition hover:bg-fog">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ffe4dc] text-[10px] font-black text-[#bd624b]">{user.avatarText.slice(0, 2)}</span>
              <span className="hidden max-w-[160px] text-left sm:block"><span className="block truncate text-[11px] font-bold text-ink">{session.authenticated ? company.shortName : "登录采购账户"}</span><span className="mt-0.5 block truncate text-[9px] text-slate-400">{session.authenticated ? `${user.department} · ${user.name}` : "查看企业专属价格"}</span></span>
              <Icon name="chevron" size={14} className="hidden text-slate-400 sm:block" />
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-[1480px] px-4 pb-14 pt-6 sm:px-7 lg:px-9">{children}</main>
      </div>
    </div>
  </div>;
}
