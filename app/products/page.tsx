"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "../components/app-shell";
import { Icon } from "../components/icons";
import { ProductCard } from "../components/product-card";
import { useStore } from "../components/store-provider";
import { Button, Breadcrumbs, EmptyState, SectionHeading, cn } from "../components/ui";
import { searchProducts, type Availability, type ProductCategoryId } from "../lib/domain";

export default function ProductsPage() {
  const { products, categories, addToCart } = useStore();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategoryId | undefined>();
  const [availability, setAvailability] = useState<Availability | undefined>();
  const [sortBy, setSortBy] = useState<"recommended" | "price_asc" | "price_desc" | "newest">("recommended");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("query") ?? "");
    setCategory((params.get("category") as ProductCategoryId | null) ?? undefined);
  }, []);

  const result = useMemo(() => searchProducts(products, { query, categoryId: category, availability, sortBy }), [products, query, category, availability, sortBy]);

  return <AppShell><div className="space-y-6"><Breadcrumbs items={["采购空间", "商品目录"]} /><div className="flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-[28px] font-black tracking-[-0.05em] text-ink">商品目录</h1><p className="mt-2 text-[12px] text-slate">按企业协议价选购，库存、交期和阶梯价透明可见。</p></div><div className="flex items-center gap-2"><Link href="/promotions" className="hidden items-center gap-1.5 rounded-xl border border-line bg-white px-3.5 py-2.5 text-[11px] font-bold text-slate transition hover:border-coral hover:text-coral sm:flex"><Icon name="tag" size={15} />正在进行的活动</Link><Button variant="soft" onClick={() => setFiltersOpen((value) => !value)} className="sm:hidden"><Icon name="filter" size={15} />筛选</Button></div></div>

    <section className="panel p-4 sm:p-5"><div className="flex flex-col gap-3 lg:flex-row lg:items-center"><div className="relative min-w-0 flex-1"><Icon name="search" size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} className="h-11 w-full rounded-xl border border-line bg-fog pl-10 pr-4 text-[12px] font-medium text-ink outline-none transition focus:border-cyan/40 focus:bg-white focus:ring-4 focus:ring-cyan/10" placeholder="搜索商品、品牌、SKU / OEM 编码" aria-label="搜索商品、品牌或 SKU" /></div><div className="flex items-center gap-2"><div className="hidden items-center gap-2 rounded-xl bg-fog px-3.5 py-2.5 text-[10px] text-slate sm:flex"><Icon name="filter" size={14} />筛选结果 <b className="text-ink">{result.length}</b></div><label className="flex h-11 items-center gap-2 rounded-xl border border-line bg-white px-3 text-[11px] font-semibold text-slate"><Icon name="sort" size={15} /><span className="hidden sm:inline">排序：</span><select value={sortBy} onChange={(event) => setSortBy(event.target.value as typeof sortBy)} className="border-0 bg-transparent text-[11px] font-bold text-ink outline-none"><option value="recommended">推荐排序</option><option value="newest">最新上架</option><option value="price_asc">价格从低到高</option><option value="price_desc">价格从高到低</option></select></label></div></div>
      <div className={cn("mt-4 flex flex-wrap items-center gap-2", !filtersOpen && "hidden sm:flex")}><button type="button" onClick={() => setCategory(undefined)} className={cn("rounded-lg px-3 py-2 text-[10px] font-bold transition", !category ? "bg-ink text-white" : "bg-fog text-slate hover:text-ink")}>全部品类</button>{categories.map((item) => <button type="button" key={item.id} onClick={() => setCategory(item.id)} className={cn("rounded-lg px-3 py-2 text-[10px] font-bold transition", category === item.id ? "bg-ink text-white" : "bg-fog text-slate hover:text-ink")}>{item.name}</button>)}<span className="mx-1 hidden h-5 w-px bg-line sm:block" /><button type="button" onClick={() => setAvailability(availability === "in_stock" ? undefined : "in_stock")} className={cn("rounded-lg px-3 py-2 text-[10px] font-bold transition", availability === "in_stock" ? "bg-cyan/10 text-cyan" : "bg-fog text-slate hover:text-ink")}>仅看现货</button><button type="button" onClick={() => { setCategory(undefined); setAvailability(undefined); setQuery(""); }} className="ml-auto rounded-lg px-3 py-2 text-[10px] font-bold text-slate-400 hover:text-ink">重置筛选</button></div></section>

    {result.length > 0 ? <section><SectionHeading eyebrow="CATALOGUE" title={`${result.length} 件商品`} description="展示价格均为当前企业含税协议价" /><div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{result.map((product) => <ProductCard key={product.id} product={product} onAdd={(item, quantity) => addToCart(item.id, item.defaultSkuId, quantity)} />)}</div></section> : <EmptyState icon="search" title="没有找到匹配的商品" description="试试更短的关键词，或者清除筛选条件后重新搜索。" action={<Button variant="soft" onClick={() => { setQuery(""); setCategory(undefined); setAvailability(undefined); }}>清除筛选</Button>} />}
  </div></AppShell>;
}
