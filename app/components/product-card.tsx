"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "../lib/domain";
import { getDefaultSku, getTierUnitPrice } from "../lib/domain";
import { Button, Money, ProductVisual, QuantityStepper, cn } from "./ui";
import { Icon } from "./icons";

export function ProductCard({ product, onAdd, compact = false }: { product: Product; onAdd?: (product: Product, quantity: number) => void; compact?: boolean }) {
  const defaultSku = getDefaultSku(product);
  const [quantity, setQuantity] = useState(1);
  const unitPrice = getTierUnitPrice(defaultSku, quantity);
  const isLow = defaultSku.availability === "low_stock";

  return <article className={cn("group flex h-full flex-col rounded-[22px] border border-line bg-white p-3.5 shadow-[0_10px_30px_rgba(31,61,93,0.05)] transition hover:-translate-y-1 hover:border-cyan/30 hover:shadow-card", compact && "rounded-2xl p-3")}>
    <Link href={`/products/${product.id}`} className="block">
      <ProductVisual tone={product.tone} accent={product.accent} mark={product.mark} className="h-[148px] w-full rounded-[17px] text-[28px]" />
    </Link>
    <div className="flex flex-1 flex-col px-1 pt-3">
      <div className="flex min-h-[18px] flex-wrap items-center gap-1.5">
        {product.badges.includes("agreement") && <span className="rounded-full bg-cyan/10 px-2 py-1 text-[9px] font-bold text-[#118c87]">协议价</span>}
        {product.badges.includes("promotion") && <span className="rounded-full bg-[#fff0e6] px-2 py-1 text-[9px] font-bold text-[#cf6b43]">限时促销</span>}
        {product.badges.includes("bestseller") && <span className="rounded-full bg-[#fff8dd] px-2 py-1 text-[9px] font-bold text-[#a87818]">热销</span>}
      </div>
      <Link href={`/products/${product.id}`} className="mt-2 block">
        <h3 className="line-clamp-2 min-h-[40px] text-[14px] font-bold leading-5 tracking-[-0.02em] text-ink transition group-hover:text-cyan">{product.title}</h3>
        <p className="mt-1 truncate text-[10px] text-slate">{product.brand} · {product.subtitle}</p>
      </Link>
      <div className="mt-auto pt-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-[10px] text-slate">企业协议价 / {defaultSku.unit}</div>
            <div className="mt-0.5 flex items-baseline gap-1.5"><Money value={unitPrice} className="text-[21px] font-black tracking-[-0.04em] text-ink" /><span className="text-[10px] text-slate-400 line-through">{defaultSku.listPrice ? <Money value={defaultSku.listPrice} /> : null}</span></div>
          </div>
          <span className={cn("text-[10px] font-semibold", isLow ? "text-coral" : "text-[#168f88]")}><span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-current" />{isLow ? `${defaultSku.stock} 件` : "现货"}</span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <QuantityStepper value={quantity} onChange={setQuantity} min={1} max={Math.max(1, defaultSku.stock)} compact />
          <Button type="button" onClick={() => onAdd?.(product, quantity)} variant="primary" className="h-8 flex-1 rounded-lg px-2 text-[10px]"><Icon name="cart" size={14} /> 加入采购车</Button>
        </div>
      </div>
    </div>
  </article>;
}
