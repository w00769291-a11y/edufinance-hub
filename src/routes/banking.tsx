import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { RefreshCw, Landmark } from "lucide-react";
import { toast } from "sonner";
import { DataTable, Page, PageHeader, StatusBadge, type Col } from "@/components/app/kit";
import { Button } from "@/components/ui/button";
import { bankAccounts, bankTxns, compact, inr } from "@/lib/data";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/banking")({
  head: () => meta("Bank Accounts", "Balances, feeds and recent transactions for every institutional bank and cash account."),
  component: Banking,
});

type T = (typeof bankTxns)[number];

function Banking() {
  const [accts, setAccts] = useState(bankAccounts);
  const [active, setActive] = useState(1);
  const sync = (i: number) => { setAccts(accts.map((a, j) => (j === i ? { ...a, synced: "Just now" } : a))); toast.success(`${accts[i]!.bank} feed refreshed`); };
  const cols: Col<T>[] = [
    { key: "date", header: "Date" }, { key: "desc", header: "Description", cell: (r) => <span className="font-medium">{r.desc}</span> }, { key: "ref", header: "Ref" },
    { key: "debit", header: "Debit", align: "right", cell: (r) => (r.debit ? inr(r.debit) : ""), sort: (r) => r.debit },
    { key: "credit", header: "Credit", align: "right", cell: (r) => (r.credit ? inr(r.credit) : ""), sort: (r) => r.credit },
    { key: "balance", header: "Balance", align: "right", cell: (r) => inr(r.balance) },
    { key: "match", header: "Status", cell: (r) => <StatusBadge status={r.match} /> },
  ];
  return (
    <>
      <PageHeader crumbs={[{ label: "Banking" }]} title="Bank Accounts" subtitle={`Total cash & bank: ${compact(accts.reduce((a, b) => a + b.balance, 0))}`}
        actions={<Button size="sm" asChild><Link to="/reconciliation">Reconcile</Link></Button>} />
      <Page>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {accts.map((a, i) => (
            <button key={a.no} onClick={() => setActive(i)} className={`rounded-lg border bg-card p-4 text-left transition ${active === i ? "border-primary ring-1 ring-primary" : "hover:border-primary/40"}`}>
              <div className="flex items-center gap-2 text-[13px] font-semibold"><Landmark className="h-4 w-4 text-primary" />{a.bank} <span className="text-muted-foreground">****{a.no}</span></div>
              <div className="text-xs text-muted-foreground">{a.type}</div>
              <div className="num mt-2 text-xl font-semibold">{compact(a.balance)}</div>
              <div className="mt-2 flex items-center justify-between text-[11px]">
                <StatusBadge status={a.pending ? (a.recon === "In progress" ? "In Progress" : "Unmatched") : "Reconciled"} />
                <span className="flex items-center gap-1 text-muted-foreground">{a.synced}<RefreshCw className="h-3 w-3 cursor-pointer hover:text-primary" onClick={(e) => { e.stopPropagation(); sync(i); }} /></span>
              </div>
            </button>
          ))}
        </div>
        <h2 className="text-sm font-semibold">Recent transactions — {accts[active]!.bank}</h2>
        <DataTable rows={bankTxns} cols={cols} searchKeys={(r) => `${r.desc} ${r.ref}`} />
      </Page>
    </>
  );
}
