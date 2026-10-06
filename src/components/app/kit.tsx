import { useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, ChevronsUpDown, Filter, Search, Check, Circle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function PageHeader({ crumbs = [], title, subtitle, actions, badge }: { crumbs?: { label: string; to?: string }[]; title: ReactNode; subtitle?: ReactNode; actions?: ReactNode; badge?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b bg-card px-6 pb-4 pt-4">
      <div className="min-w-0">
        {crumbs.length > 0 && (
          <nav className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1">
                {c.to ? <Link to={c.to} className="hover:text-primary">{c.label}</Link> : <span>{c.label}</span>}
                {i < crumbs.length - 1 && <ChevronRight className="h-3 w-3" />}
              </span>
            ))}
          </nav>
        )}
        <div className="flex items-center gap-3">
          <h1 className="truncate text-xl font-semibold tracking-tight">{title}</h1>
          {badge}
        </div>
        {subtitle && <p className="mt-0.5 text-[13px] text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Page({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("space-y-5 p-6", className)}>{children}</div>;
}

export function Panel({ title, actions, children, className, bodyClass }: { title?: ReactNode; actions?: ReactNode; children: ReactNode; className?: string; bodyClass?: string }) {
  return (
    <section className={cn("rounded-lg border bg-card", className)}>
      {(title || actions) && (
        <header className="flex items-center justify-between gap-2 border-b px-4 py-2.5">
          <h3 className="text-[13px] font-semibold">{title}</h3>
          {actions}
        </header>
      )}
      <div className={cn("p-4", bodyClass)}>{children}</div>
    </section>
  );
}

const tone: Record<string, string> = {
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
  info: "bg-info-soft text-info",
  neutral: "bg-neutral-soft text-muted-foreground",
};
const statusTone: Record<string, keyof typeof tone> = {
  paid: "success", approved: "success", matched: "success", active: "success", reconciled: "success", verified: "success", resolved: "success", settled: "success", posted: "success", met: "success", "under budget": "success", low: "neutral",
  "partially paid": "warning", "pending approval": "warning", pending: "warning", "suggested match": "warning", "pending review": "warning", "under review": "warning", "in progress": "warning", variance: "warning", "near limit": "warning", recommended: "info", processing: "warning", "payment processing": "warning", "pending verification": "warning", medium: "warning", returned: "warning", "on hold": "warning", escalated: "warning",
  overdue: "danger", rejected: "danger", unmatched: "danger", failed: "danger", "over budget": "danger", critical: "danger", high: "danger", breached: "danger", "non-po review": "danger", open: "danger",
  sent: "info", requested: "info", checked: "info", "ready for release": "info",
  draft: "neutral", cancelled: "neutral", excluded: "neutral", inactive: "neutral", "—": "neutral",
};
export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const t = statusTone[status.toLowerCase()] ?? "neutral";
  return (
    <span className={cn("inline-flex items-center gap-1 whitespace-nowrap rounded px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide", tone[t], className)}>
      {status}
    </span>
  );
}

export function Sparkline({ data, positive = true }: { data: number[]; positive?: boolean }) {
  const min = Math.min(...data), max = Math.max(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 80},${24 - ((v - min) / (max - min || 1)) * 22}`).join(" ");
  return (
    <svg viewBox="0 0 80 26" className={cn("h-7 w-20", positive ? "text-success" : "text-danger")}>
      <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StatCard({ label, value, hint, toneName, icon }: { label: string; value: ReactNode; hint?: ReactNode; toneName?: keyof typeof tone; icon?: ReactNode }) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
        {label}
        {icon && <span className={cn("rounded-md p-1.5", tone[toneName ?? "info"])}>{icon}</span>}
      </div>
      <div className="num mt-1.5 text-xl font-semibold tracking-tight">{value}</div>
      {hint && <div className="mt-0.5 text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}

export type Col<T> = { key: string; header: string; align?: "right" | "left" | "center"; cell?: (r: T) => ReactNode; sort?: (r: T) => string | number; className?: string };

export function DataTable<T>({ rows, cols, onRowClick, searchKeys, pageSize = 10, toolbar, empty = "No records match your filters." }: { rows: T[]; cols: Col<T>[]; onRowClick?: (r: T) => void; searchKeys?: (r: T) => string; pageSize?: number; toolbar?: ReactNode; empty?: string }) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<{ key: string; dir: 1 | -1 } | null>(null);
  const [page, setPage] = useState(0);
  const [sel, setSel] = useState<Set<number>>(new Set());
  const filtered = useMemo(() => {
    let r = rows;
    if (q && searchKeys) r = r.filter((x) => searchKeys(x).toLowerCase().includes(q.toLowerCase()));
    if (sort) {
      const c = cols.find((c) => c.key === sort.key);
      const f = c?.sort ?? ((x: T) => String((x as Record<string, unknown>)[sort.key] ?? ""));
      r = [...r].sort((a, b) => (f(a) > f(b) ? 1 : f(a) < f(b) ? -1 : 0) * sort.dir);
    }
    return r;
  }, [rows, q, sort, cols, searchKeys]);
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const view = filtered.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className="flex flex-wrap items-center gap-2 border-b px-3 py-2">
        {searchKeys && (
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => { setQ(e.target.value); setPage(0); }} placeholder="Search in this list…" className="h-8 w-64 pl-7 text-[13px]" />
          </div>
        )}
        {toolbar}
        {sel.size > 0 && (
          <div className="ml-auto flex items-center gap-2 text-xs">
            <span className="font-medium">{sel.size} selected</span>
            <Button size="sm" variant="outline">Export</Button>
            <Button size="sm" variant="ghost" onClick={() => setSel(new Set())}><X /></Button>
          </div>
        )}
      </div>
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b bg-surface text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              <th className="w-8 px-3 py-2">
                <input type="checkbox" className="accent-primary" checked={view.length > 0 && sel.size === view.length} onChange={(e) => setSel(e.target.checked ? new Set(view.map((_, i) => i)) : new Set())} />
              </th>
              {cols.map((c) => (
                <th key={c.key} className={cn("whitespace-nowrap px-3 py-2", c.align === "right" && "text-right", c.align === "center" && "text-center")}>
                  <button className="inline-flex items-center gap-1 uppercase hover:text-foreground" onClick={() => setSort((s) => (s?.key === c.key ? { key: c.key, dir: s.dir === 1 ? -1 : 1 } : { key: c.key, dir: 1 }))}>
                    {c.header}
                    {sort?.key === c.key ? (sort.dir === 1 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />) : <ChevronsUpDown className="h-3 w-3 opacity-40" />}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {view.map((r, i) => (
              <tr key={i} onClick={() => onRowClick?.(r)} className={cn("border-b last:border-0 hover:bg-accent/40", onRowClick && "cursor-pointer", sel.has(i) && "bg-accent/50")}>
                <td className="px-3 py-2" onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" className="accent-primary" checked={sel.has(i)} onChange={(e) => { const n = new Set(sel); e.target.checked ? n.add(i) : n.delete(i); setSel(n); }} />
                </td>
                {cols.map((c) => (
                  <td key={c.key} className={cn("whitespace-nowrap px-3 py-2", c.align === "right" && "num text-right", c.align === "center" && "text-center", c.className)}>
                    {c.cell ? c.cell(r) : String((r as Record<string, unknown>)[c.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
            {view.length === 0 && (
              <tr><td colSpan={cols.length + 1} className="px-3 py-10 text-center text-muted-foreground">{empty}</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t px-3 py-2 text-xs text-muted-foreground">
        <span>{filtered.length === 0 ? 0 : page * pageSize + 1}–{Math.min(filtered.length, (page + 1) * pageSize)} of {filtered.length}</span>
        <div className="flex items-center gap-1">
          <Button size="icon" variant="ghost" className="h-7 w-7" disabled={page === 0} onClick={() => setPage(page - 1)}><ChevronLeft /></Button>
          <span>Page {page + 1} / {pages}</span>
          <Button size="icon" variant="ghost" className="h-7 w-7" disabled={page >= pages - 1} onClick={() => setPage(page + 1)}><ChevronRight /></Button>
        </div>
      </div>
    </div>
  );
}

export function FilterBar({ filters }: { filters: { label: string; options: string[] }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground"><Filter className="h-3.5 w-3.5" /> Filters</span>
      {filters.map((f) => (
        <select key={f.label} defaultValue="" className="h-8 rounded-md border border-input bg-card px-2 text-[13px] text-foreground focus:outline-none focus:ring-1 focus:ring-ring">
          <option value="">{f.label}: All</option>
          {f.options.map((o) => <option key={o}>{o}</option>)}
        </select>
      ))}
    </div>
  );
}

export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-y-2">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center">
          <span className={cn("flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
            i < current ? "bg-success-soft text-success" : i === current ? "bg-primary text-primary-foreground" : "bg-neutral-soft text-muted-foreground")}>
            {i < current ? <Check className="h-3 w-3" /> : <Circle className="h-2 w-2 fill-current" />}{s}
          </span>
          {i < steps.length - 1 && <span className={cn("mx-1 h-px w-5", i < current ? "bg-success" : "bg-border")} />}
        </li>
      ))}
    </ol>
  );
}

export function Timeline({ items }: { items: { title: ReactNode; meta?: ReactNode; status?: string; body?: ReactNode }[] }) {
  return (
    <ol className="relative space-y-4 border-l pl-5">
      {items.map((it, i) => (
        <li key={i} className="relative">
          <span className={cn("absolute -left-[26px] top-1 h-3 w-3 rounded-full border-2 border-card",
            it.status && ["approved", "done", "posted", "completed", "paid"].includes(it.status.toLowerCase()) ? "bg-success" : it.status?.toLowerCase() === "rejected" ? "bg-danger" : it.status?.toLowerCase() === "pending" ? "bg-warning" : "bg-muted-foreground/40")} />
          <div className="flex flex-wrap items-center gap-2 text-[13px] font-medium">{it.title}{it.status && <StatusBadge status={it.status} />}</div>
          {it.meta && <div className="text-xs text-muted-foreground">{it.meta}</div>}
          {it.body && <div className="mt-1 text-xs">{it.body}</div>}
        </li>
      ))}
    </ol>
  );
}

export function KV({ items, cols = 2 }: { items: [string, ReactNode][]; cols?: number }) {
  return (
    <dl className={cn("grid gap-x-6 gap-y-3", cols === 3 ? "grid-cols-3" : cols === 1 ? "grid-cols-1" : "grid-cols-2")}>
      {items.map(([k, v]) => (
        <div key={k}><dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{k}</dt><dd className="mt-0.5 text-[13px] font-medium">{v}</dd></div>
      ))}
    </dl>
  );
}

export function JournalPreview({ lines }: { lines: { account: string; dr?: number; cr?: number }[] }) {
  const fmt = (n?: number) => (n ? "₹" + n.toLocaleString("en-IN") : "");
  const dr = lines.reduce((a, l) => a + (l.dr ?? 0), 0), cr = lines.reduce((a, l) => a + (l.cr ?? 0), 0);
  return (
    <table className="w-full text-xs">
      <thead><tr className="border-b text-left text-[10px] uppercase tracking-wide text-muted-foreground"><th className="py-1.5">Account</th><th className="py-1.5 text-right">Debit</th><th className="py-1.5 text-right">Credit</th></tr></thead>
      <tbody>
        {lines.map((l, i) => (
          <tr key={i} className="border-b border-dashed"><td className={cn("py-1.5", l.cr ? "pl-4" : "")}>{l.account}</td><td className="num py-1.5 text-right">{fmt(l.dr)}</td><td className="num py-1.5 text-right">{fmt(l.cr)}</td></tr>
        ))}
        <tr className="font-semibold"><td className="py-1.5">Total {dr === cr ? <span className="text-success">· Balanced</span> : <span className="text-danger">· Out of balance</span>}</td><td className="num py-1.5 text-right">{fmt(dr)}</td><td className="num py-1.5 text-right">{fmt(cr)}</td></tr>
      </tbody>
    </table>
  );
}

export function TabBar({ tabs, value, onChange }: { tabs: string[]; value: string; onChange: (t: string) => void }) {
  return (
    <div className="flex gap-1 overflow-x-auto border-b scrollbar-thin">
      {tabs.map((t) => (
        <button key={t} onClick={() => onChange(t)} className={cn("-mb-px whitespace-nowrap border-b-2 px-3 py-2 text-[13px] font-medium transition-colors", value === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground")}>{t}</button>
      ))}
    </div>
  );
}

export function initials(n: string) { return n.split(" ").map((p) => p[0]).slice(0, 2).join(""); }
