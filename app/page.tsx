"use client";

import { useMemo, useState } from "react";

type IconName =
  | "grid"
  | "box"
  | "layers"
  | "clipboard"
  | "check"
  | "wallet"
  | "file"
  | "settings"
  | "search"
  | "bell"
  | "chevron"
  | "plus"
  | "arrow"
  | "spark"
  | "clock"
  | "trend"
  | "cart"
  | "filter"
  | "upload"
  | "shield"
  | "dots"
  | "download"
  | "users"
  | "building"
  | "external"
  | "close";

function Icon({ name, size = 18, stroke = 1.9, className }: { name: IconName; size?: number; stroke?: number; className?: string }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
  };

  switch (name) {
    case "grid":
      return <svg {...common}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>;
    case "box":
      return <svg {...common}><path d="m21 8-9-5-9 5 9 5 9-5Z" /><path d="M3 8v8l9 5 9-5V8M12 13v8" /></svg>;
    case "layers":
      return <svg {...common}><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 17l9 5 9-5" /></svg>;
    case "clipboard":
      return <svg {...common}><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4.5V3h6v1.5M8 10h8M8 14h5" /></svg>;
    case "check":
      return <svg {...common}><path d="m5 12 4 4L19 6" /></svg>;
    case "wallet":
      return <svg {...common}><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H19v16H6.5A2.5 2.5 0 0 1 4 17.5v-11Z" /><path d="M4 7h15M15 13h4M16.5 13a.5.5 0 1 0 0 .01" /></svg>;
    case "file":
      return <svg {...common}><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></svg>;
    case "settings":
      return <svg {...common}><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" /><path d="m4.9 4.9 1.4 1.4M17.7 17.7l1.4 1.4M4 12H2M22 12h-2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4M12 4V2M12 22v-2" /></svg>;
    case "search":
      return <svg {...common}><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>;
    case "bell":
      return <svg {...common}><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 22h4" /></svg>;
    case "chevron":
      return <svg {...common}><path d="m9 5 7 7-7 7" /></svg>;
    case "plus":
      return <svg {...common}><path d="M12 5v14M5 12h14" /></svg>;
    case "arrow":
      return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case "spark":
      return <svg {...common}><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2ZM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" /></svg>;
    case "clock":
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
    case "trend":
      return <svg {...common}><path d="m3 17 6-6 4 4 7-8" /><path d="M15 7h5v5" /></svg>;
    case "cart":
      return <svg {...common}><path d="M3 4h2l2.2 11h10.6L21 7H6" /><circle cx="9" cy="19" r="1.2" /><circle cx="18" cy="19" r="1.2" /></svg>;
    case "filter":
      return <svg {...common}><path d="M4 6h16M7 12h10M10 18h4" /></svg>;
    case "upload":
      return <svg {...common}><path d="M12 16V4M8 8l4-4 4 4M5 20h14" /></svg>;
    case "shield":
      return <svg {...common}><path d="M12 3 20 6v5c0 5-3.3 8.5-8 10-4.7-1.5-8-5-8-10V6l8-3Z" /><path d="m8.5 12 2.3 2.3 4.8-5" /></svg>;
    case "dots":
      return <svg {...common}><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" /></svg>;
    case "download":
      return <svg {...common}><path d="M12 4v11M8 11l4 4 4-4M5 20h14" /></svg>;
    case "users":
      return <svg {...common}><circle cx="9" cy="8" r="3" /><path d="M3 19a6 6 0 0 1 12 0M17 11a3 3 0 1 0 0-6M17 14a4 4 0 0 1 4 4" /></svg>;
    case "building":
      return <svg {...common}><path d="M4 21V5l8-3 8 3v16M2 21h20M8 9h1M15 9h1M8 13h1M15 13h1M8 17h1M15 17h1" /></svg>;
    case "external":
      return <svg {...common}><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" /></svg>;
    case "close":
      return <svg {...common}><path d="m6 6 12 12M18 6 6 18" /></svg>;
    default:
      return null;
  }
}

const navItems: { label: string; icon: IconName; count?: string }[] = [
  { label: "采购工作台", icon: "grid" },
  { label: "商品目录", icon: "box" },
  { label: "批量采购", icon: "layers", count: "NEW" },
  { label: "订单中心", icon: "clipboard" },
  { label: "审批中心", icon: "check", count: "3" },
  { label: "对公结算", icon: "wallet" },
  { label: "发票与合同", icon: "file" },
];

const products = [
  {
    id: "bearing",
    category: "精密轴承",
    title: "NSK 深沟球轴承 6205ZZ",
    subtitle: "日本精工 · 进口原装",
    sku: "SKU-NSK-6205ZZ",
    price: 18.6,
    oldPrice: 22.4,
    unit: "个",
    stock: "2,480",
    eta: "现货 · 48小时内发出",
    tone: "#e4f4f3",
    accent: "#199d97",
    mark: "NSK",
  },
  {
    id: "sensor",
    category: "工业传感器",
    title: "SICK 光电传感器 WL12G-3",
    subtitle: "德国西克 · M12 接插件",
    sku: "SKU-SICK-WL12G3",
    price: 156,
    oldPrice: 179,
    unit: "件",
    stock: "316",
    eta: "预计 3–5 个工作日",
    tone: "#eaf0fb",
    accent: "#527bc6",
    mark: "SICK",
  },
  {
    id: "motor",
    category: "伺服电机",
    title: "安川 Σ-7 伺服电机 SGM7J",
    subtitle: "400W · 带 20-bit 编码器",
    sku: "SKU-YASK-SGM7J-04",
    price: 1280,
    oldPrice: 1450,
    unit: "台",
    stock: "58",
    eta: "预计 7–10 个工作日",
    tone: "#fff0e9",
    accent: "#ef846c",
    mark: "Σ7",
  },
];

const quickActions = [
  { title: "批量导入采购清单", desc: "粘贴 SKU / 数量，一键加购", icon: "layers" as IconName, tint: "bg-[#e8f7f5] text-[#169b95]" },
  { title: "创建采购订单", desc: "从购物车发起审批流程", icon: "clipboard" as IconName, tint: "bg-[#edf1fb] text-[#5b78bd]" },
  { title: "配置开票信息", desc: "专票 / 普票抬头管理", icon: "file" as IconName, tint: "bg-[#fff1eb] text-[#df765e]" },
  { title: "查看电子合同", desc: "已签署合同与待签列表", icon: "shield" as IconName, tint: "bg-[#f0edfb] text-[#8970c8]" },
];

function formatMoney(value: number) {
  return value.toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function Home() {
  const [activeNav, setActiveNav] = useState("采购工作台");
  const [quantities, setQuantities] = useState<Record<string, number>>({ bearing: 12, sensor: 2, motor: 1 });
  const [cartCount, setCartCount] = useState(5);
  const [batchSku, setBatchSku] = useState("SKU-NSK-6205ZZ    20\nSKU-SICK-WL12G3   5");
  const [toast, setToast] = useState("");
  const [approvalFilter, setApprovalFilter] = useState<"全部" | "待我审批">("全部");

  const total = useMemo(() => products.reduce((sum, product) => sum + product.price * (quantities[product.id] ?? 0), 0), [quantities]);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  function adjustQuantity(id: string, delta: number) {
    setQuantities((current) => ({ ...current, [id]: Math.max(1, (current[id] ?? 1) + delta) }));
  }

  function addProduct(productId: string) {
    setCartCount((count) => count + (quantities[productId] ?? 1));
    notify("已加入采购车，可前往结算");
  }

  function submitBatch() {
    const rows = batchSku.split("\n").map((row) => row.trim()).filter(Boolean);
    setCartCount((count) => count + rows.length);
    notify(`已识别 ${rows.length} 条 SKU，采购车已更新`);
  }

  return (
    <main className="flex min-h-screen bg-fog">
      <aside className="hidden w-[238px] shrink-0 flex-col bg-[#0e1d34] px-4 pb-5 pt-6 text-white lg:flex">
        <div className="flex items-center gap-3 px-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan text-[15px] font-black tracking-tight text-white shadow-[0_7px_18px_rgba(22,184,177,0.35)]">N</div>
          <div>
            <div className="text-[15px] font-bold tracking-[0.08em]">NOVA</div>
            <div className="mt-0.5 text-[10px] font-medium tracking-[0.2em] text-slate-400">商采云</div>
          </div>
        </div>

        <div className="mt-10 px-3 text-[10px] font-bold tracking-[0.18em] text-slate-500">WORKSPACE</div>
        <nav className="mt-3 space-y-1">
          {navItems.map((item) => (
            <button key={item.label} className={`nav-item ${activeNav === item.label ? "active" : ""}`} onClick={() => setActiveNav(item.label)}>
              <Icon name={item.icon} size={17} />
              <span className="flex-1">{item.label}</span>
              {item.count && <span className={`rounded-md px-1.5 py-0.5 text-[9px] font-bold ${item.count === "NEW" ? "bg-[#f7c768] text-[#6b4a10]" : "bg-white/15 text-white"}`}>{item.count}</span>}
            </button>
          ))}
        </nav>

        <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.06] p-3.5">
          <div className="flex items-start justify-between">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#26395a] text-cyan"><Icon name="shield" size={16} /></div>
            <span className="tiny-pill bg-[#193a46] text-[#71e0d8]">已认证</span>
          </div>
          <div className="mt-3 text-[12px] font-semibold">企业认证已完成</div>
          <div className="mt-1 text-[11px] leading-5 text-slate-400">专享协议价、授信账期已生效</div>
          <button className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-cyan hover:text-[#73e6de]">查看企业权益 <Icon name="arrow" size={13} /></button>
        </div>
        <div className="mt-4 flex items-center gap-2 px-3 text-[11px] text-slate-500"><Icon name="settings" size={14} /> 系统设置 <span className="ml-auto">v2.8.0</span></div>
      </aside>

      <section className="min-w-0 flex-1">
        <header className="flex h-[72px] items-center justify-between border-b border-line bg-white px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl bg-cyan text-[15px] font-black text-white">N</div>
            <div className="relative hidden w-[300px] md:block">
              <Icon name="search" size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate" />
              <input className="h-10 w-full rounded-xl border-0 bg-[#f5f7fa] pl-10 pr-14 text-[12px] text-ink outline-none placeholder:text-[#99a6b7] focus:ring-2 focus:ring-cyan/20" placeholder="搜索商品、SKU 或订单号" />
              <span className="absolute right-3 top-2.5 rounded-md bg-white px-1.5 py-1 text-[10px] font-semibold text-[#a0adbd] shadow-sm">⌘ K</span>
            </div>
            <span className="text-[12px] text-slate-400 md:hidden">采购工作台</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="icon-button relative border-0 bg-transparent"><Icon name="bell" size={19} /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-coral ring-2 ring-white" /></button>
            <div className="hidden h-7 w-px bg-line sm:block" />
            <button className="flex items-center gap-2 rounded-xl py-1.5 pl-1 pr-2 transition hover:bg-fog">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d8edf0] text-[12px] font-bold text-[#177b80]">蓝图</div>
              <div className="hidden text-left sm:block"><div className="max-w-[185px] truncate text-[12px] font-semibold text-ink">深圳市蓝图精密制造</div><div className="mt-0.5 text-[10px] text-slate">主账号 · 采购部</div></div>
              <Icon name="chevron" size={14} stroke={1.6} />
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-[1540px] px-5 pb-10 pt-7 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-medium text-slate"><span>Workspace</span><Icon name="chevron" size={12} /><span className="text-ink">采购工作台</span></div>
              <h1 className="mt-3 text-[27px] font-bold tracking-[-0.03em] text-ink sm:text-[31px]">早上好，蓝图采购团队 <span className="inline-block">👋</span></h1>
              <p className="mt-2 text-[12px] text-slate">今天是 9 月 14 日，祝你高效完成今日采购。</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => notify("报表导出任务已创建")} className="flex h-10 items-center gap-2 rounded-xl border border-line bg-white px-3.5 text-[12px] font-semibold text-slate transition hover:border-cyan hover:text-cyan"><Icon name="download" size={16} /> 导出报表</button>
              <button onClick={() => notify("正在打开新建采购订单")} className="flex h-10 items-center gap-2 rounded-xl bg-ink px-4 text-[12px] font-semibold text-white shadow-soft transition hover:bg-[#1b365c]"><Icon name="plus" size={16} /> 新建采购单</button>
            </div>
          </div>

          <section className="relative mt-7 overflow-hidden rounded-2xl bg-[#102a4b] px-6 py-6 text-white shadow-[0_16px_38px_rgba(16,42,75,0.17)] sm:px-8 sm:py-7">
            <div className="absolute -right-12 -top-28 h-72 w-72 rounded-full border-[34px] border-cyan/10" />
            <div className="absolute -bottom-40 right-44 h-72 w-72 rounded-full border-[22px] border-white/[0.04]" />
            <div className="relative max-w-[680px]">
              <div className="flex items-center gap-2"><span className="tiny-pill bg-[#244966] text-[#78e3dc]"><Icon name="spark" size={13} /> 企业专属权益</span><span className="text-[11px] text-slate-400">协议客户 / A 级</span></div>
              <h2 className="mt-4 text-[21px] font-semibold tracking-[-0.02em] sm:text-[24px]">你的专属协议价已自动生效</h2>
              <p className="mt-2 max-w-[520px] text-[12px] leading-6 text-[#b4c6dc]">当前商品目录将优先展示企业协议价；采购数量达到阶梯门槛时，系统还会自动计算批量优惠。</p>
              <button onClick={() => notify("正在打开协议价目录")} className="mt-5 flex items-center gap-2 text-[12px] font-semibold text-[#74e1d9] hover:text-white">查看全部专属商品 <Icon name="arrow" size={15} /></button>
            </div>
            <div className="relative mt-7 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-4 text-[11px] text-[#a7bdd5] sm:absolute sm:bottom-7 sm:right-8 sm:mt-0 sm:border-0 sm:pt-0">
              <div><span className="block text-[19px] font-semibold text-white">¥ 248,600</span><span>本月已节省采购成本</span></div>
              <div className="h-8 w-px bg-white/10" /><div><span className="block text-[19px] font-semibold text-white">12.8%</span><span>协议价平均优惠</span></div>
            </div>
          </section>

          <section className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { label: "企业授信可用额度", value: "¥ 1,280,000", note: "额度使用率 32%", icon: "wallet" as IconName, color: "text-[#1b9c96]", bg: "bg-[#e5f7f4]", progress: 32 },
              { label: "待我审批订单", value: "03", note: "最早 2 小时前提交", icon: "clock" as IconName, color: "text-[#d87a55]", bg: "bg-[#fff0e9]", progress: 0 },
              { label: "本月采购金额", value: "¥ 386,420", note: "较上月 +18.6%", icon: "trend" as IconName, color: "text-[#607bc0]", bg: "bg-[#edf1fb]", progress: 0 },
              { label: "待开票金额", value: "¥ 52,800", note: "共 6 笔待处理", icon: "file" as IconName, color: "text-[#8b70c3]", bg: "bg-[#f2edfc]", progress: 0 },
            ].map((stat) => (
              <div key={stat.label} className="panel min-w-0 p-4 sm:p-5">
                <div className="flex items-start justify-between"><div className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}><Icon name={stat.icon} size={17} /></div>{stat.progress > 0 && <span className="text-[10px] font-semibold text-[#e09679]">- 32%</span>}</div>
                <div className="mt-4 truncate text-[11px] font-medium text-slate">{stat.label}</div>
                <div className="mt-1 text-[19px] font-bold tracking-[-0.02em] text-ink sm:text-[21px]">{stat.value}</div>
                <div className="mt-2 flex items-center gap-1 text-[10px] text-slate"><span className={stat.label === "本月采购金额" ? "text-[#2ba49b]" : ""}>{stat.note}</span></div>
                {stat.progress > 0 && <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#e9eef4]"><div className="h-full rounded-full bg-cyan" style={{ width: `${stat.progress}%` }} /></div>}
              </div>
            ))}
          </section>

          <div className="mt-7 grid gap-7 xl:grid-cols-[minmax(0,1fr)_310px]">
            <div className="min-w-0">
              <div className="flex items-center justify-between"><div><div className="eyebrow">QUICK ACTIONS</div><h2 className="mt-1.5 text-[17px] font-bold text-ink">常用功能</h2></div><button className="text-[11px] font-semibold text-cyan hover:text-ink">管理快捷入口 <Icon name="arrow" size={13} className="inline" /></button></div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {quickActions.map((action) => <button key={action.title} onClick={() => notify(`${action.title}已打开`)} className="panel group flex items-center gap-3 p-3.5 text-left transition hover:-translate-y-0.5 hover:border-cyan/40"><div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${action.tint}`}><Icon name={action.icon} size={18} /></div><div className="min-w-0"><div className="truncate text-[12px] font-semibold text-ink">{action.title}</div><div className="mt-1 truncate text-[10px] text-slate">{action.desc}</div></div><Icon name="chevron" size={14} className="ml-auto shrink-0 text-[#a9b5c4] transition group-hover:translate-x-0.5 group-hover:text-cyan" /></button>)}
              </div>

              <section className="panel mt-7 overflow-hidden">
                <div className="border-b border-line px-5 pb-4 pt-5 sm:px-6">
                  <div className="flex flex-wrap items-start justify-between gap-4"><div><div className="eyebrow">SMART CATALOG</div><h2 className="mt-1.5 text-[17px] font-bold text-ink">协议商品目录</h2><p className="mt-1 text-[11px] text-slate">基于企业身份匹配的专享价格，含阶梯优惠</p></div><button className="flex items-center gap-1 text-[11px] font-semibold text-cyan">查看全部 <Icon name="arrow" size={13} /></button></div>
                  <div className="mt-5 flex flex-col gap-2.5 sm:flex-row"><div className="relative min-w-0 flex-1"><Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate" /><input className="h-10 w-full rounded-xl border border-line bg-[#fafcfe] pl-9 pr-4 text-[11px] outline-none transition placeholder:text-[#a0adbd] focus:border-cyan focus:ring-2 focus:ring-cyan/10" placeholder="搜索商品名称、SKU / OEM 编码" /></div><button className="flex h-10 items-center justify-center gap-2 rounded-xl border border-line bg-white px-3 text-[11px] font-semibold text-slate transition hover:border-cyan hover:text-cyan"><Icon name="filter" size={15} /> 高级筛选</button></div>
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-0.5 text-[10px] font-medium"><span className="whitespace-nowrap rounded-lg bg-ink px-3 py-1.5 text-white">全部商品</span><span className="whitespace-nowrap rounded-lg bg-[#f3f6fa] px-3 py-1.5 text-slate">精密零件</span><span className="whitespace-nowrap rounded-lg bg-[#f3f6fa] px-3 py-1.5 text-slate">工业自动化</span><span className="whitespace-nowrap rounded-lg bg-[#f3f6fa] px-3 py-1.5 text-slate">电气元件</span><span className="whitespace-nowrap rounded-lg bg-[#f3f6fa] px-3 py-1.5 text-slate">本周热销</span></div>
                </div>
                <div className="divide-y divide-line">
                  {products.map((product) => <article key={product.id} className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:px-6"><div className="flex min-w-0 flex-1 items-center gap-3.5"><div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-2xl text-[13px] font-black tracking-tight" style={{ backgroundColor: product.tone, color: product.accent }}>{product.mark}</div><div className="min-w-0"><div className="flex flex-wrap items-center gap-1.5"><span className="tiny-pill bg-[#e8f7f5] text-[#169b95]">协议价</span><span className="text-[10px] text-slate">{product.category}</span></div><h3 className="mt-1 truncate text-[13px] font-bold text-ink">{product.title}</h3><div className="mt-1 truncate text-[10px] text-slate">{product.subtitle} · {product.sku}</div></div></div><div className="flex items-end gap-6 sm:items-center"><div className="min-w-[92px]"><div className="text-[10px] text-slate">企业协议价 / {product.unit}</div><div className="mt-0.5 text-[19px] font-bold tracking-[-0.03em] text-ink">¥{formatMoney(product.price)}</div><div className="mt-0.5 text-[10px] text-[#a9b5c4] line-through">¥{formatMoney(product.oldPrice)}</div></div><div className="hidden min-w-[114px] lg:block"><div className="text-[10px] text-slate">阶梯价</div><div className="mt-1 text-[10px] text-ink">≥ 50 件 <b className="text-cyan">¥{formatMoney(product.price * 0.94)}</b></div><div className="mt-0.5 text-[10px] text-ink">≥ 100 件 <b className="text-cyan">¥{formatMoney(product.price * 0.9)}</b></div></div><div className="hidden min-w-[123px] xl:block"><div className="flex items-center gap-1 text-[10px] text-[#2ca49d]"><span className="h-1.5 w-1.5 rounded-full bg-[#2ca49d]" /> {product.stock} 可售</div><div className="mt-1 text-[10px] text-slate">{product.eta}</div></div><div className="flex items-center gap-1.5"><div className="flex h-9 items-center rounded-lg border border-line bg-white"><button onClick={() => adjustQuantity(product.id, -1)} className="flex h-full w-7 items-center justify-center text-slate hover:text-cyan">−</button><span className="w-7 text-center text-[11px] font-semibold text-ink">{quantities[product.id]}</span><button onClick={() => adjustQuantity(product.id, 1)} className="flex h-full w-7 items-center justify-center text-slate hover:text-cyan">+</button></div><button onClick={() => addProduct(product.id)} className="flex h-9 items-center gap-1 rounded-lg bg-ink px-2.5 text-[10px] font-semibold text-white transition hover:bg-cyan"><Icon name="cart" size={14} /> 加购</button></div></div></article>)}
                </div>
                <div className="flex items-center justify-between border-t border-line bg-[#fbfcfe] px-5 py-3.5 sm:px-6"><div className="flex items-center gap-2 text-[10px] text-slate"><Icon name="shield" size={14} className="text-cyan" />价格已按企业协议自动匹配</div><div className="text-[11px] text-slate">采购车小计 <span className="ml-1 text-[15px] font-bold text-ink">¥{formatMoney(total)}</span><button onClick={() => notify("正在打开采购车")} className="ml-3 font-semibold text-cyan hover:text-ink">去结算 <Icon name="arrow" size={12} className="inline" /></button></div></div>
              </section>
            </div>

            <aside className="space-y-5">
              <section className="panel overflow-hidden"><div className="flex items-start justify-between border-b border-line px-5 pb-4 pt-5"><div><div className="eyebrow">APPROVAL QUEUE</div><h2 className="mt-1.5 text-[16px] font-bold text-ink">审批待办</h2></div><span className="tiny-pill bg-[#fff0e9] text-[#d77b59]">3 笔待审</span></div><div className="flex gap-1 px-5 pt-4"><button onClick={() => setApprovalFilter("全部")} className={`rounded-lg px-2.5 py-1.5 text-[10px] font-semibold ${approvalFilter === "全部" ? "bg-ink text-white" : "text-slate hover:bg-fog"}`}>全部</button><button onClick={() => setApprovalFilter("待我审批")} className={`rounded-lg px-2.5 py-1.5 text-[10px] font-semibold ${approvalFilter === "待我审批" ? "bg-ink text-white" : "text-slate hover:bg-fog"}`}>待我审批</button></div><div className="divide-y divide-line px-5"><div className="py-4"><div className="flex items-center justify-between"><span className="text-[11px] font-semibold text-ink">PO202609140012</span><span className="tiny-pill bg-[#fff5e8] text-[#bf8242]">金额超阈值</span></div><div className="mt-1.5 text-[10px] text-slate">工业传感器 · 18 件 · ¥ 12,680</div><div className="mt-3 flex items-center justify-between"><div className="flex -space-x-1.5"><span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#f1d6c8] text-[9px] font-bold text-[#945a45]">林</span><span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#d3e8e6] text-[9px] font-bold text-[#287b77]">陈</span></div><span className="text-[10px] text-slate">等待部门主管</span></div></div><div className="py-4"><div className="flex items-center justify-between"><span className="text-[11px] font-semibold text-ink">PO202609130087</span><span className="tiny-pill bg-[#edf1fb] text-[#6179b6]">采购员提交</span></div><div className="mt-1.5 text-[10px] text-slate">精密轴承 · 120 件 · ¥ 2,232</div><div className="mt-3 flex items-center justify-between"><div className="flex items-center gap-1.5 text-[10px] text-slate"><Icon name="clock" size={13} /> 4 小时前</div><button onClick={() => notify("正在打开订单详情")} className="text-[10px] font-semibold text-cyan">查看详情</button></div></div></div><button onClick={() => setActiveNav("审批中心")} className="flex w-full items-center justify-center gap-1 border-t border-line py-3.5 text-[11px] font-semibold text-cyan hover:bg-[#f7fbfb]">进入审批中心 <Icon name="arrow" size={13} /></button></section>

              <section className="panel p-5"><div className="flex items-start justify-between"><div><div className="eyebrow">BULK BUYING</div><h2 className="mt-1.5 text-[16px] font-bold text-ink">批量采购清单</h2></div><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e8f7f5] text-cyan"><Icon name="upload" size={16} /></div></div><p className="mt-2 text-[10px] leading-5 text-slate">粘贴 SKU 和数量，每行一条，系统自动识别并匹配协议价。</p><textarea value={batchSku} onChange={(event) => setBatchSku(event.target.value)} className="mt-3 h-[86px] w-full resize-none rounded-xl border border-line bg-[#fafcfe] p-3 font-mono text-[10px] leading-5 text-ink outline-none placeholder:text-[#a0adbd] focus:border-cyan focus:ring-2 focus:ring-cyan/10" placeholder={"SKU-XXXX    10\nSKU-YYYY    20"} /><button onClick={submitBatch} className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-[#e8f7f5] text-[11px] font-semibold text-[#169b95] transition hover:bg-cyan hover:text-white"><Icon name="layers" size={14} /> 识别并加入采购车</button><div className="mt-3 flex items-center justify-between text-[10px] text-slate"><span>支持 .xlsx / .csv 导入</span><button onClick={() => notify("模板下载已开始")} className="font-semibold text-cyan">下载模板</button></div></section>

              <section className="rounded-2xl bg-[#e8f7f5] p-5"><div className="flex items-start gap-3"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-cyan"><Icon name="building" size={16} /></div><div><div className="text-[12px] font-bold text-[#146e70]">企业专属授信</div><p className="mt-1.5 text-[10px] leading-5 text-[#42848a]">本月账期日为 10 月 15 日，当前可用额度充足。</p><button onClick={() => setActiveNav("对公结算")} className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-[#168c89]">查看结算详情 <Icon name="arrow" size={12} /></button></div></div></section>
            </aside>
          </div>
        </div>
      </section>
      {toast && <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-ink px-4 py-3 text-[12px] font-medium text-white shadow-[0_12px_35px_rgba(16,35,63,0.22)]"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan"><Icon name="check" size={13} /></span>{toast}</div>}
      <button onClick={() => notify(`采购车中有 ${cartCount} 件商品`)} className="fixed bottom-6 right-5 flex h-12 items-center gap-2 rounded-full bg-cyan px-4 text-[12px] font-bold text-white shadow-[0_10px_26px_rgba(22,184,177,0.28)] transition hover:bg-[#109d98] sm:right-8"><Icon name="cart" size={17} /><span className="hidden sm:inline">采购车</span><span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] text-cyan">{cartCount}</span></button>
    </main>
  );
}
