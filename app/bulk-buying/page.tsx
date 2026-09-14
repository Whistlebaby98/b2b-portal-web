"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AppShell } from "../components/app-shell";
import { Icon } from "../components/icons";
import { useStore } from "../components/store-provider";
import { Button, Breadcrumbs, ProductVisual, SectionHeading, cn } from "../components/ui";
import { parseBulkSkuInput } from "../lib/domain";

const sample = "SKU-NSK-6205ZZ    20\nSKU-SICK-WL12G3   5\nSKU-UNKNOWN-001   2";

export default function BulkBuyingPage() {
  const { products, addToCart } = useStore();
  const [input, setInput] = useState(sample);
  const [parsed, setParsed] = useState(false);
  const rows = useMemo(() => parseBulkSkuInput(input), [input]);
  const matched = rows.map((row) => {
    const product = products.find((item) => item.skus.some((sku) => sku.code.toLowerCase() === row.skuCode.toLowerCase()));
    const sku = product?.skus.find((item) => item.code.toLowerCase() === row.skuCode.toLowerCase());
    const stockError = product && sku && row.quantity > sku.stock ? `库存仅 ${sku.stock} ${sku.unit}` : undefined;
    return { row, product, sku, error: row.error ?? (!product || !sku ? "SKU 不存在或暂不可售" : stockError) };
  });
  const validRows = matched.filter((item) => item.product && item.sku && !item.error);

  function addValidRows() {
    validRows.forEach(({ product, sku, row }) => { if (product && sku) addToCart(product.id, sku.id, row.quantity); });
    setParsed(false);
  }

  return <AppShell><div className="space-y-6"><Breadcrumbs items={["采购空间", "批量采购"]} /><div><h1 className="text-[29px] font-black tracking-[-0.05em] text-ink">批量采购</h1><p className="mt-2 text-[12px] text-slate">粘贴 SKU 与数量，快速把一整份采购清单加入采购车。</p></div><div className="grid gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"><section className="panel p-5 sm:p-6"><SectionHeading eyebrow="PASTE YOUR LIST" title="输入采购清单" description="每行一个 SKU，使用空格、Tab 或逗号分隔数量" /><textarea value={input} onChange={(event) => { setInput(event.target.value); setParsed(false); }} className="mt-5 h-[250px] w-full resize-none rounded-2xl border border-line bg-[#fbfcfe] p-4 font-mono text-[12px] leading-7 text-ink outline-none transition focus:border-cyan focus:bg-white focus:ring-4 focus:ring-cyan/10" aria-label="SKU 批量采购清单" /><div className="mt-4 flex flex-wrap items-center justify-between gap-3"><span className="flex items-center gap-1.5 text-[10px] text-slate"><Icon name="info" size={14} className="text-cyan" />支持 SKU-编码 + 数量格式，重复 SKU 会在采购车合并</span><button type="button" onClick={() => setInput(sample)} className="text-[10px] font-bold text-cyan">填入示例</button></div><div className="mt-5 flex gap-2"><Button type="button" onClick={() => setParsed(true)} className="flex-1"><Icon name="layers" size={15} />识别清单</Button><Link href="/products" className="flex-1"><Button type="button" variant="secondary" className="w-full">返回商品目录</Button></Link></div></section><section className="panel overflow-hidden"><div className="border-b border-line px-5 py-5 sm:px-6"><div className="flex items-end justify-between gap-3"><SectionHeading eyebrow="MATCH PREVIEW" title="匹配预览" description={parsed ? `已识别 ${rows.length} 行 · ${validRows.length} 行可加入` : "识别后查看 SKU、数量与异常行"} /><span className={cn("rounded-full px-2.5 py-1 text-[10px] font-bold", parsed && validRows.length > 0 ? "bg-cyan/10 text-cyan" : "bg-fog text-slate-400")}>{parsed ? `${validRows.length}/${rows.length}` : "待识别"}</span></div></div>{parsed ? <div className="divide-y divide-line">{matched.map(({ row, product, sku, error }) => <div key={`${row.lineNumber}-${row.raw}`} className="flex gap-3 px-5 py-4 sm:px-6"><div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-black", error ? "bg-[#fff0ed] text-coral" : "bg-[#eaf7f6] text-cyan")}>{row.lineNumber}</div>{product && sku ? <ProductVisual tone={product.tone} accent={product.accent} mark={product.mark} className="h-12 w-12 rounded-xl text-[10px]" /> : <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-fog text-slate-300"><Icon name="warning" size={17} /></span>}<div className="min-w-0 flex-1"><div className="truncate text-[11px] font-bold text-ink">{product?.title ?? row.skuCode}</div><div className="mt-1 truncate text-[10px] text-slate">{sku ? `${sku.name} · ${row.quantity} ${sku.unit}` : row.raw}</div>{error && <div className="mt-1 text-[10px] font-semibold text-coral">{error}</div>}</div><span className={cn("self-start rounded-full px-2 py-1 text-[9px] font-bold", error ? "bg-[#fff0ed] text-coral" : "bg-[#eaf7f6] text-cyan")}>{error ? "需修正" : "可加入"}</span></div>)}</div> : <div className="flex min-h-[320px] flex-col items-center justify-center px-6 text-center"><span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan/10 text-cyan"><Icon name="layers" size={25} /></span><h3 className="mt-4 text-[14px] font-black text-ink">还没有识别结果</h3><p className="mt-2 max-w-[260px] text-[11px] leading-5 text-slate">先在左侧粘贴清单，再点击“识别清单”查看可采购行和异常提示。</p></div>}{parsed && <div className="flex items-center justify-between border-t border-line bg-[#fbfcfe] px-5 py-4 sm:px-6"><span className="text-[10px] text-slate">失败行不会被静默加入采购车</span><Button type="button" variant="soft" disabled={validRows.length === 0} onClick={addValidRows}>加入采购车 <Icon name="cart" size={14} /></Button></div>}</section></div><section className="rounded-2xl border border-[#d6eee9] bg-[#f1fbfa] p-5"><div className="flex items-start gap-3"><Icon name="shield" size={18} className="mt-0.5 text-cyan" /><div><div className="text-[12px] font-black text-[#236f6b]">批量采购也会使用当前企业协议价</div><p className="mt-1.5 text-[10px] leading-5 text-[#568984]">加入采购车后，数量达到阶梯门槛会自动更新单价；提交结算时还会再次校验库存、活动资格和交期。</p></div></div></section></div></AppShell>;
}
