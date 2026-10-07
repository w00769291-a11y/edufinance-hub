import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { DataTable, Page, PageHeader, StatCard, StatusBadge, type Col } from "@/components/app/kit";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { compact, inr, students } from "@/lib/data";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/payments")({
  head: () => meta("Payments & Collections", "Record and track student fee receipts across cash, UPI, cards, gateway and bank transfers."),
  component: Payments,
});

type R = { no: string; date: string; student: string; mode: string; ref: string; amount: number; status: string };
const modes = ["UPI", "Gateway", "NEFT", "Cheque", "Cash", "Card"];
const seed: R[] = students.slice(0, 14).map((s, i) => ({
  no: `RCT-26-${(812 - i).toString().padStart(5, "0")}`, date: `${String(6 - (i % 6)).padStart(2, "0")} Oct 2026`, student: s.name,
  mode: modes[i % 6]!, ref: `${modes[i % 6]!.slice(0, 3).toUpperCase()}${40921 + i * 7}`, amount: [92500, 68000, 142000, 45000, 23500, 118000, 76500][i % 7]!,
  status: i % 5 === 3 ? "Pending" : "Posted",
}));

function Payments() {
  const [rows, setRows] = useState(seed);
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ student: students[0]!.name, mode: "UPI", ref: "", amount: "" });
  const cols: Col<R>[] = [
    { key: "no", header: "Receipt #", cell: (r) => <span className="font-medium text-primary">{r.no}</span> },
    { key: "date", header: "Date" }, { key: "student", header: "Student" }, { key: "mode", header: "Mode" }, { key: "ref", header: "Reference" },
    { key: "amount", header: "Amount", align: "right", cell: (r) => inr(r.amount), sort: (r) => r.amount },
    { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status} /> },
    { key: "act", header: "", cell: (r) => r.status === "Pending" ? <Button size="sm" variant="outline" className="h-7" onClick={(e) => { e.stopPropagation(); setRows(rows.map((x) => x.no === r.no ? { ...x, status: "Posted" } : x)); toast.success(`${r.no} posted to ledger`); }}>Post</Button> : null },
  ];
  const add = () => {
    const amt = Number(f.amount);
    if (!amt || amt <= 0) { toast.error("Enter a valid amount"); return; }
    const no = `RCT-26-${(813 + rows.length - seed.length).toString().padStart(5, "0")}`;
    setRows([{ no, date: "07 Oct 2026", student: f.student, mode: f.mode, ref: f.ref || "—", amount: amt, status: "Posted" }, ...rows]);
    setOpen(false); setF({ ...f, ref: "", amount: "" });
    toast.success("Receipt recorded", { description: `${no} · ${inr(amt)}` });
  };
  const sum = (m?: string) => rows.filter((r) => !m || r.mode === m).reduce((a, r) => a + r.amount, 0);
  return (
    <>
      <PageHeader crumbs={[{ label: "Sales" }, { label: "Collections" }]} title="Payments & Collections" actions={<Button size="sm" onClick={() => setOpen(true)}><Plus /> Record receipt</Button>} />
      <Page>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard label="Collected (this view)" value={compact(sum())} toneName="success" />
          <StatCard label="Via UPI" value={compact(sum("UPI"))} /><StatCard label="Via Gateway" value={compact(sum("Gateway"))} />
          <StatCard label="Pending posting" value={rows.filter((r) => r.status === "Pending").length} toneName="warning" />
        </div>
        <DataTable rows={rows} cols={cols} searchKeys={(r) => `${r.no} ${r.student} ${r.ref} ${r.mode}`} />
      </Page>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent><DialogHeader><DialogTitle>Record receipt</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <div className="space-y-1.5"><Label>Student</Label><select className="h-9 w-full rounded-md border border-input bg-card px-2 text-[13px]" value={f.student} onChange={(e) => setF({ ...f, student: e.target.value })}>{students.map((s) => <option key={s.id}>{s.name}</option>)}</select></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>Mode</Label><select className="h-9 w-full rounded-md border border-input bg-card px-2 text-[13px]" value={f.mode} onChange={(e) => setF({ ...f, mode: e.target.value })}>{modes.map((m) => <option key={m}>{m}</option>)}</select></div>
              <div className="space-y-1.5"><Label>Amount (₹)</Label><Input type="number" value={f.amount} onChange={(e) => setF({ ...f, amount: e.target.value })} /></div>
            </div>
            <div className="space-y-1.5"><Label>Reference</Label><Input value={f.ref} onChange={(e) => setF({ ...f, ref: e.target.value })} placeholder="UTR / cheque no." /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={add}>Save & post</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
