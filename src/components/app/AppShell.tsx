import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard, Landmark, GraduationCap, ShoppingCart, Receipt, Wallet, Award, Undo2, Building2, BookOpen, PiggyBank,
  BarChart3, Scale, ShieldCheck, FolderOpen, CheckSquare, AlertTriangle, Settings, ChevronDown, ChevronsLeft, ChevronsRight,
  Search, Plus, Bell, HelpCircle, Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { campuses, financialYears, invoices, students, vendors } from "@/lib/data";
import { toast } from "sonner";

type Nav = { label: string; to: string; icon: typeof LayoutDashboard; children?: { label: string; to: string }[] };
export const nav: Nav[] = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Banking", to: "/banking", icon: Landmark, children: [{ label: "Bank Accounts", to: "/banking" }, { label: "Reconciliation", to: "/reconciliation" }] },
  { label: "Sales / Student Fees", to: "/fees", icon: GraduationCap, children: [{ label: "Student Invoices", to: "/fees" }, { label: "New Invoice", to: "/fees/new" }, { label: "Collections", to: "/payments" }] },
  { label: "Purchases", to: "/bills", icon: ShoppingCart, children: [{ label: "Bills", to: "/bills" }, { label: "Payment Batches", to: "/payment-batch" }] },
  { label: "Expenses", to: "/expenses", icon: Receipt },
  { label: "Payments", to: "/payments", icon: Wallet },
  { label: "Scholarships & Aid", to: "/scholarships", icon: Award },
  { label: "Refunds", to: "/refunds", icon: Undo2 },
  { label: "Vendors", to: "/vendors", icon: Building2 },
  { label: "Accounting", to: "/accounting", icon: BookOpen },
  { label: "Budget", to: "/budget", icon: PiggyBank },
  { label: "Reports", to: "/reports", icon: BarChart3 },
  { label: "Reconciliation", to: "/reconciliation", icon: Scale },
  { label: "Audit & Compliance", to: "/audit", icon: ShieldCheck },
  { label: "Documents", to: "/documents", icon: FolderOpen },
  { label: "Approvals", to: "/approvals", icon: CheckSquare },
  { label: "Exceptions", to: "/exceptions", icon: AlertTriangle },
  { label: "Settings", to: "/settings", icon: Settings },
];

const quickCreate = [
  ["Student Invoice", "/fees/new"], ["Receipt", "/payments"], ["Vendor", "/vendors"], ["Vendor Bill", "/bills"], ["Payment", "/payments"],
  ["Journal", "/accounting"], ["Budget", "/budget"], ["Scholarship", "/scholarships"], ["Refund", "/refunds"],
] as const;

function isActive(path: string, to: string) { return to === "/" ? path === "/" : path === to || path.startsWith(to + "/"); }

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [campus, setCampus] = useState(campuses[0]);
  const [fy, setFy] = useState(financialYears[0]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen((o) => !o); } };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  return (
    <TooltipProvider delayDuration={100}>
      <div className="flex h-screen overflow-hidden bg-background">
        <aside className={cn("flex shrink-0 flex-col bg-nav text-nav-foreground transition-[width] duration-200", collapsed ? "w-14" : "w-60")}>
          <div className="flex h-12 items-center gap-2 border-b border-sidebar-border px-3.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-nav-active"><Layers className="h-4 w-4" /></div>
            {!collapsed && <div className="leading-tight"><div className="text-[13px] font-bold tracking-tight">Ledgerly</div><div className="text-[10px] text-nav-muted">Finance for Institutions</div></div>}
          </div>
          <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-2 scrollbar-thin">
            {nav.map((n) => {
              const active = isActive(pathname, n.to) || n.children?.some((c) => isActive(pathname, c.to));
              const expanded = !collapsed && n.children && (open === n.label || (open === null && active));
              const item = (
                <div key={n.label}>
                  <div className={cn("group flex items-center rounded-md text-[13px]", active ? "bg-nav-active text-primary-foreground" : "text-nav-muted hover:bg-nav-hover hover:text-nav-foreground")}>
                    <Link to={n.to as "/"} className={cn("flex flex-1 items-center gap-2.5 px-2.5 py-1.5", collapsed && "justify-center px-0")}>
                      <n.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span className="truncate">{n.label}</span>}
                    </Link>
                    {!collapsed && n.children && (
                      <button className="px-2 py-1.5" onClick={() => setOpen(expanded ? "" : n.label)} aria-label="Toggle submenu">
                        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")} />
                      </button>
                    )}
                  </div>
                  {expanded && (
                    <div className="ml-6 mt-0.5 space-y-0.5 border-l border-sidebar-border pl-2">
                      {n.children!.map((c) => (
                        <Link key={c.label} to={c.to as "/"} className={cn("block rounded px-2 py-1 text-[12.5px]", pathname === c.to ? "font-semibold text-nav-foreground" : "text-nav-muted hover:text-nav-foreground")}>{c.label}</Link>
                      ))}
                    </div>
                  )}
                </div>
              );
              return collapsed ? (
                <Tooltip key={n.label}><TooltipTrigger asChild>{item}</TooltipTrigger><TooltipContent side="right">{n.label}</TooltipContent></Tooltip>
              ) : item;
            })}
          </nav>
          <button onClick={() => setCollapsed(!collapsed)} className="flex h-10 items-center gap-2 border-t border-sidebar-border px-4 text-xs text-nav-muted hover:text-nav-foreground">
            {collapsed ? <ChevronsRight className="h-4 w-4" /> : <><ChevronsLeft className="h-4 w-4" /> Collapse</>}
          </button>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-12 shrink-0 items-center gap-3 border-b bg-card px-4">
            <button onClick={() => setSearchOpen(true)} className="flex h-8 w-full max-w-md items-center gap-2 rounded-md border border-input bg-surface px-2.5 text-[13px] text-muted-foreground hover:border-primary/40">
              <Search className="h-3.5 w-3.5" /> Search students, invoices, vendors, journals…
              <kbd className="ml-auto rounded border bg-card px-1.5 text-[10px] font-medium">Ctrl K</kbd>
            </button>
            <div className="ml-auto flex items-center gap-1.5">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex h-8 items-center gap-1 rounded-md bg-primary px-2.5 text-[13px] font-medium text-primary-foreground hover:bg-primary/90"><Plus className="h-4 w-4" /> New</DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuLabel className="text-xs text-muted-foreground">Quick Create</DropdownMenuLabel>
                  {quickCreate.map(([l, to]) => <DropdownMenuItem key={l} onClick={() => navigate({ to: to as "/" })}>{l}</DropdownMenuItem>)}
                </DropdownMenuContent>
              </DropdownMenu>
              <Selector value={campus} options={campuses} onChange={setCampus} />
              <Selector value={fy} options={financialYears} onChange={setFy} />
              <DropdownMenu>
                <DropdownMenuTrigger className="relative rounded-md p-2 text-muted-foreground hover:bg-muted"><Bell className="h-4 w-4" /><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger" /></DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  {["PB-000124 is awaiting your approval", "Technology cost centre exceeded budget", "8 new unmatched bank lines (SBI ****1234)", "Refund RF-26-0091 submitted for review"].map((n) => (
                    <DropdownMenuItem key={n} className="text-[13px]">{n}</DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <button className="rounded-md p-2 text-muted-foreground hover:bg-muted" onClick={() => toast("Help centre", { description: "Press Ctrl K to search anywhere. Shortcuts: N = new, / = search." })}><HelpCircle className="h-4 w-4" /></button>
              <DropdownMenu>
                <DropdownMenuTrigger className="ml-1 flex items-center gap-2 rounded-md py-1 pl-1 pr-2 hover:bg-muted">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-accent-foreground">RM</span>
                  <span className="hidden text-left leading-tight xl:block"><span className="block text-[12.5px] font-medium">Rekha Menon</span><span className="block text-[10.5px] text-muted-foreground">Financial Controller</span></span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>My profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate({ to: "/" })}>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto scrollbar-thin">{children}</main>
        </div>
      </div>

      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Search across the ledger…" />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Pages">
            {nav.map((n) => <CommandItem key={n.label} onSelect={() => { navigate({ to: n.to as "/" }); setSearchOpen(false); }}><n.icon className="mr-2 h-4 w-4" />{n.label}</CommandItem>)}
          </CommandGroup>
          <CommandGroup heading="Students">
            {students.slice(0, 8).map((s) => <CommandItem key={s.id} value={`${s.name} ${s.id}`} onSelect={() => { navigate({ to: "/" }); setSearchOpen(false); }}>{s.name}<span className="ml-auto text-xs text-muted-foreground">{s.id}</span></CommandItem>)}
          </CommandGroup>
          <CommandGroup heading="Vendors">
            {vendors.slice(0, 6).map((v) => <CommandItem key={v.id} value={`${v.name} ${v.id}`} onSelect={() => { navigate({ to: "/" }); setSearchOpen(false); }}>{v.name}<span className="ml-auto text-xs text-muted-foreground">{v.id}</span></CommandItem>)}
          </CommandGroup>
          <CommandGroup heading="Invoices">
            {invoices.slice(0, 6).map((i) => <CommandItem key={i.no} value={`${i.no} ${i.student}`} onSelect={() => { navigate({ to: "/" }); setSearchOpen(false); }}>{i.no}<span className="ml-auto text-xs text-muted-foreground">{i.student}</span></CommandItem>)}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </TooltipProvider>
  );
}

function Selector({ value, options, onChange }: { value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hidden h-8 items-center gap-1 rounded-md border border-input bg-card px-2.5 text-[12.5px] font-medium hover:bg-muted lg:flex">
        <span className="max-w-[150px] truncate">{value}</span><ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((o) => <DropdownMenuItem key={o} onClick={() => onChange(o)}>{o}</DropdownMenuItem>)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
