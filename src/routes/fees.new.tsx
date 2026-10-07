import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { JournalPreview, Page, PageHeader, Panel } from "@/components/app/kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { inr, students } from "@/lib/data";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/fees/new")({
  head: () => meta("New Student Invoice", "Raise a new fee invoice for a student with line items, scholarships and tax."),
  component: NewInvoice,
});

const sel = "h-9 w-full rounded-md border border-input bg-card px-2 text-[13px]";

function NewInvoice() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(students[0]!.id);
  const [term, setTerm] = useState("Term 2");
  const [due, setDue] = useState("2026-10-31");
  const [lines, setLines] = useState([{ item: "Tuition Fee", amount: 120000 }, { item: "Lab Fee", amount: 15000 }]);
  const [discount, setDiscount] = useState(0);
  const sub = lines.reduce((a, l) => a + (Number(l.amount) || 0), 0);
  const total = Math.max(0, sub - discount);
  const s = students.find((x) => x.id === student)!;

  const save = (send: boolean) => {
    if (!lines.length || total <= 0) return toast.error("Add at least one line with an amount");
    toast.success(send ? "Invoice submitted for approval" : "Draft saved", { description: `${s.name} · ${inr(total)}` });
    navigate({ to: "/fees" });
  };

  return (
    <>
      <PageHeader crumbs={[{ label: "Student Invoices", to: "/fees" }, { label: "New" }]} title="New Student Invoice"
        actions={<><Button size="sm" variant="outline" onClick={() => save(false)}>Save draft</Button><Button size="sm" onClick={() => save(true)}>Submit for approval</Button></>} />
      <Page className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Panel title="Details">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5 sm:col-span-3"><Label>Student</Label>
                <select className={sel} value={student} onChange={(e) => setStudent(e.target.value)}>{students.map((x) => <option key={x.id} value={x.id}>{x.name} — {x.id} · {x.programme}</option>)}</select></div>
              <div className="space-y-1.5"><Label>Term</Label><select className={sel} value={term} onChange={(e) => setTerm(e.target.value)}>{["Term 1", "Term 2", "Semester 1", "Semester 2"].map((t) => <option key={t}>{t}</option>)}</select></div>
              <div className="space-y-1.5"><Label>Due date</Label><Input type="date" value={due} onChange={(e) => setDue(e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Campus</Label><Input value={s.campus} disabled /></div>
            </div>
          </Panel>
          <Panel title="Line items" actions={<Button size="sm" variant="ghost" onClick={() => setLines([...lines, { item: "", amount: 0 }])}><Plus /> Add line</Button>}>
            <div className="space-y-2">
              {lines.map((l, i) => (
                <div key={i} className="flex gap-2">
                  <Input placeholder="Fee head" value={l.item} onChange={(e) => setLines(lines.map((x, j) => (j === i ? { ...x, item: e.target.value } : x)))} />
                  <Input type="number" className="w-40 text-right" value={l.amount} onChange={(e) => setLines(lines.map((x, j) => (j === i ? { ...x, amount: Number(e.target.value) } : x)))} />
                  <Button size="icon" variant="ghost" onClick={() => setLines(lines.filter((_, j) => j !== i))}><Trash2 /></Button>
                </div>
              ))}
              <div className="flex items-center justify-end gap-2 pt-2 text-[13px]"><span className="text-muted-foreground">Scholarship / discount</span><Input type="number" className="w-40 text-right" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} /></div>
            </div>
          </Panel>
        </div>
        <div className="space-y-5">
          <Panel title="Summary">
            <div className="space-y-1.5 text-[13px]">
              <div className="flex justify-between"><span>Subtotal</span><span className="num">{inr(sub)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Discount</span><span className="num">− {inr(discount)}</span></div>
              <div className="flex justify-between border-t pt-2 text-base font-semibold"><span>Total</span><span className="num">{inr(total)}</span></div>
              <div className="pt-1 text-xs text-muted-foreground">Current balance for {s.name}: {inr(s.balance)}</div>
            </div>
          </Panel>
          <Panel title="Journal preview"><JournalPreview lines={[{ account: "1210 Student Receivables", dr: total }, ...(discount ? [{ account: "5500 Scholarships & Aid", dr: discount }] : []), { account: "4100 Tuition Fees", cr: sub }]} /></Panel>
        </div>
      </Page>
    </>
  );
}
