import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Page, PageHeader, Panel, StatCard, StatusBadge } from "@/components/app/kit";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { bankTxns, inr } from "@/lib/data";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/reconciliation")({
  head: () => meta("Bank Reconciliation", "Match bank statement lines to receipts, payments and journals and resolve exceptions."),
  component: Recon,
});

const suggestions: Record<string, string> = { IMPS40921: "RCT-26-00812 · Aarav Sharma", INT0926: "Interest income → 4900", CHQ004512: "INV-26-01045 · Diya Patel", CHG0926: "Bank charges → 5300" };

function Recon() {
  const [rows, setRows] = useState(bankTxns);
  const set = (ref: string, match: string) => setRows(rows.map((r) => (r.ref === ref ? { ...r, match } : r)));
  const done = rows.filter((r) => r.match === "Matched" || r.match === "Excluded").length;
  const autoMatch = () => {
    const n = rows.filter((r) => r.match === "Suggested Match").length;
    setRows(rows.map((r) => (r.match === "Suggested Match" ? { ...r, match: "Matched" } : r)));
    toast.success(`${n} suggested matches accepted`);
  };
  return (
    <>
      <PageHeader crumbs={[{ label: "Banking", to: "/banking" }, { label: "Reconciliation" }]} title="Reconcile · SBI ****1234" subtitle="Statement period 01 Oct – 05 Oct 2026"
        actions={<><Button size="sm" variant="outline" onClick={autoMatch}><Wand2 /> Accept suggestions</Button><Button size="sm" disabled={done < rows.length} onClick={() => toast.success("Reconciliation completed and locked")}>Complete reconciliation</Button></>} />
      <Page>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard label="Statement closing" value={inr(41380000)} /><StatCard label="Ledger balance" value={inr(41322380)} />
          <StatCard label="Difference" value={inr(rows.filter((r) => r.match === "Unmatched").reduce((a, r) => a + r.credit - r.debit, 0))} toneName="warning" />
          <div className="rounded-lg border bg-card p-4"><div className="text-xs font-medium text-muted-foreground">Progress</div><div className="num mt-1.5 text-xl font-semibold">{done}/{rows.length}</div><Progress value={(done / rows.length) * 100} className="mt-2 h-1.5" /></div>
        </div>
        <Panel title="Statement lines" bodyClass="p-0">
          <table className="w-full text-[13px]">
            <thead><tr className="border-b bg-surface text-left text-[11px] uppercase text-muted-foreground"><th className="px-3 py-2">Date</th><th className="px-3 py-2">Description</th><th className="px-3 py-2 text-right">Amount</th><th className="px-3 py-2">Match</th><th className="px-3 py-2">Status</th><th className="px-3 py-2" /></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.ref} className="border-b last:border-0">
                  <td className="px-3 py-2">{r.date}</td>
                  <td className="px-3 py-2"><div className="font-medium">{r.desc}</div><div className="text-[11px] text-muted-foreground">{r.ref}</div></td>
                  <td className={`num px-3 py-2 text-right ${r.credit ? "text-success" : ""}`}>{r.credit ? `+${inr(r.credit)}` : `−${inr(r.debit)}`}</td>
                  <td className="px-3 py-2 text-xs text-muted-foreground">{r.match === "Matched" ? "Ledger entry linked" : suggestions[r.ref] ?? "No suggestion"}</td>
                  <td className="px-3 py-2"><StatusBadge status={r.match} /></td>
                  <td className="px-3 py-2 text-right">
                    {r.match !== "Matched" && r.match !== "Excluded" ? (
                      <div className="flex justify-end gap-1">
                        <Button size="sm" variant="outline" className="h-7" onClick={() => { set(r.ref, "Matched"); toast.success(suggestions[r.ref] ? "Matched" : "Adjustment created & matched"); }}><Check /> {suggestions[r.ref] ? "Match" : "Create entry"}</Button>
                        <Button size="sm" variant="ghost" className="h-7" onClick={() => set(r.ref, "Excluded")}><X /></Button>
                      </div>
                    ) : <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => set(r.ref, "Unmatched")}>Undo</Button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </Page>
    </>
  );
}
