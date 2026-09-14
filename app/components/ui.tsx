import type { ReactNode } from "react";
import { Icon, type IconName } from "./icons";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatMoney(value: number) {
  return value.toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function Money({ value, className, prefix = "¥" }: { value: number; className?: string; prefix?: string }) {
  return <span className={className}>{prefix}{formatMoney(value)}</span>;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400", className)}>{children}</div>;
}

export function SectionHeading({ eyebrow, title, description, action, className }: { eyebrow?: string; title: string; description?: string; action?: ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-end justify-between gap-4", className)}>
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="mt-1.5 text-[20px] font-bold tracking-[-0.03em] text-ink">{title}</h2>
        {description && <p className="mt-1.5 text-[12px] leading-5 text-slate">{description}</p>}
      </div>
      {action}
    </div>
  );
}

const statusStyles: Record<string, string> = {
  待审批: "bg-[#fff4df] text-[#a56b17]",
  已审批: "bg-[#edf2ff] text-[#506bb0]",
  处理中: "bg-[#eaf7f6] text-[#138a84]",
  已发货: "bg-[#eef6ff] text-[#3970a7]",
  已完成: "bg-[#e9f7ee] text-[#2b8755]",
  已拒绝: "bg-[#fff0ed] text-[#bd5c4d]",
  已提交: "bg-[#f2f4f7] text-[#66758a]",
};

export function StatusPill({ label, dot = true }: { label: string; dot?: boolean }) {
  return <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold", statusStyles[label] ?? "bg-fog text-slate")}>
    {dot && <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />}{label}
  </span>;
}

export function QuantityStepper({ value, onChange, min = 1, max = 9999, compact = false }: { value: number; onChange: (value: number) => void; min?: number; max?: number; compact?: boolean }) {
  return <div className={cn("flex h-10 items-center rounded-xl border border-line bg-white", compact && "h-8 rounded-lg")}>
    <button type="button" aria-label="减少数量" disabled={value <= min} onClick={() => onChange(Math.max(min, value - 1))} className={cn("flex h-full w-9 items-center justify-center text-slate transition hover:text-cyan disabled:cursor-not-allowed disabled:opacity-30", compact && "w-7")}><Icon name="minus" size={compact ? 13 : 15} /></button>
    <input aria-label="数量" inputMode="numeric" value={value} onChange={(event) => { const next = Number(event.target.value.replace(/\D/g, "")); onChange(Math.min(max, Math.max(min, next || min))); }} className={cn("w-12 border-0 bg-transparent text-center text-[12px] font-bold text-ink outline-none", compact && "w-9 text-[11px]")} />
    <button type="button" aria-label="增加数量" disabled={value >= max} onClick={() => onChange(Math.min(max, value + 1))} className={cn("flex h-full w-9 items-center justify-center text-slate transition hover:text-cyan disabled:cursor-not-allowed disabled:opacity-30", compact && "w-7")}><Icon name="plus" size={compact ? 13 : 15} /></button>
  </div>;
}

export function ProductVisual({ tone, accent, mark, large = false, className }: { tone: string; accent: string; mark: string; large?: boolean; className?: string }) {
  return <div className={cn("relative flex h-[86px] w-[86px] shrink-0 items-center justify-center overflow-hidden rounded-2xl text-[18px] font-black tracking-[-0.08em]", large && "h-[260px] w-full rounded-[26px] text-[54px]", className)} style={{ background: tone, color: accent }}>
    <span className="relative z-10">{mark}</span>
    <span className="absolute -right-8 -top-8 h-24 w-24 rounded-full border-[16px] opacity-20" style={{ borderColor: accent }} />
    <span className="absolute -bottom-9 -left-7 h-24 w-24 rounded-full border-[12px] opacity-15" style={{ borderColor: accent }} />
  </div>;
}

export function EmptyState({ icon = "package", title, description, action }: { icon?: IconName; title: string; description: string; action?: ReactNode }) {
  return <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-white px-6 py-16 text-center">
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan/10 text-cyan"><Icon name={icon} size={26} /></div>
    <h3 className="mt-4 text-[15px] font-bold text-ink">{title}</h3>
    <p className="mt-2 max-w-sm text-[12px] leading-5 text-slate">{description}</p>
    {action && <div className="mt-5">{action}</div>}
  </div>;
}

export function Button({ children, variant = "primary", className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "soft" }) {
  const styles = {
    primary: "bg-ink text-white shadow-[0_8px_18px_rgba(16,35,63,0.14)] hover:bg-[#1c3961]",
    secondary: "border border-line bg-white text-ink hover:border-cyan hover:text-cyan",
    ghost: "text-slate hover:bg-fog hover:text-ink",
    soft: "bg-cyan/10 text-[#128c87] hover:bg-cyan hover:text-white",
  };
  return <button {...props} className={cn("inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-[12px] font-bold transition disabled:cursor-not-allowed disabled:opacity-50", styles[variant], className)}>{children}</button>;
}

export function FieldLabel({ children, required = false }: { children: ReactNode; required?: boolean }) {
  return <label className="mb-2 block text-[11px] font-bold text-ink">{children}{required && <span className="ml-1 text-coral">*</span>}</label>;
}

export function Breadcrumbs({ items }: { items: string[] }) {
  return <div className="flex items-center gap-2 text-[11px] text-slate-400">{items.map((item, index) => <span key={`${item}-${index}`} className="flex items-center gap-2">{index > 0 && <Icon name="chevron" size={12} /> }<span className={index === items.length - 1 ? "font-semibold text-ink" : ""}>{item}</span></span>)}</div>;
}
