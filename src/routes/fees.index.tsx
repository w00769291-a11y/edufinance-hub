import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Send, Download } from "lucide-react";
import { toast } from "sonner";
import { DataTable, FilterBar, KV, Page, PageHeader, StatCard, StatusBadge, Timeline, JournalPreview, type Col } from "@/components/app/kit";
import { DetailSheet } from "@/components/app/DetailSheet";
import { Button } from "@/components/ui/button";
import { campuses, compact, inr, invoices as seed, programmes, type Invoice } from "@/lib/data";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/fees/")({
  head: () => meta("Student Invoices", "Manage student fee invoices, balances and collections across programmes and campuses."),
  component: Fees,
});

function Fees() {
  const navigate = useNavigate();
  const [rows, setRows] = useState(seed);
  const [sel, setSel] = useState<Invoice | null>(null);
  const update = (no: string, patch: Partial<Invoice>) => { setRows((r) => r.map((x) => (x.no === no ? { ...x, ...patch } : x))); setSel((s) => (s && s.no === no ? { ...s, ...patch } : s)); };
  const total = rows.reduce((a, r) => a + r.amount, 0), paid = rows.reduce((a, r) => a + r.paid, 0);
  const overdue = rows.filter((r) => r.status === "Overdue").reduce((a, r) => a + r.amount - r.paid, 0);

  const cols: Col<Invoice>[] = [
    { key: "no", header: "Invoice #", cell: (r) => <span className="font-medium text-primary">{r.no}</span> },
    { key: "student", header: "Student", cell: (r) => <div><div className="font-medium">{r.student}</div><div className="text-[11px] text-muted-foreground">{r.studentId} · {r.programme}</div></div> },
    { key: "term", header: "Term" },
    { key: "date", header: "Date" },
    { key: "due", header: "Due" },
    { key: "amount", header: "Amount", align: "right", cell: (r) => inr(r.amount), sort: (r) => r.amount },
    { key: "bal", header: "Balance", align: "right", cell: (r) => inr(r.amount - r.paid), sort: (r) => r.amount - r.paid },
    { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <>
      <PageHeader crumbs={[{ label: "Sales" }, { label: "Student Invoices" }]} title="Student Invoices"
        actions={<><Button size="sm" variant="outline" onClick={() => toast.success("Exported", { description: `${rows.length} invoices exported to CSV.` })}><Download /> Export</Button><Button size="sm" onClick={() => navigate({ to: "/fees/new" })}><Plus /> New Invoice</Button></>} />
      <Page>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard label="Total billed" value={compact(total)} />
          <StatCard label="Collected" value={compact(paid)} toneName="success" />
          <StatCard label="Outstanding" value={compact(total - paid)} toneName="warning" />
          <StatCard label="Overdue" value={compact(overdue)} toneName="danger" />
        </div>
        <FilterBar filters={[{ label: "Campus", options: campuses }, { label: "Programme", options: programmes }, { label: "Status", options: ["Paid", "Partially Paid", "Overdue", "Sent", "Draft"] }]} />
        <DataTable rows={rows} cols={cols} onRowClick={setSel} searchKeys={(r) => `${r.no} ${r.student} ${r.studentId} ${r.programme}`} />
      </Page>
      <DetailSheet open={!!sel} onClose={() => setSel(null)} title={sel?.no} subtitle={sel && `${sel.student} · ${sel.programme}`}
        footer={sel && <>
          {sel.status === "Draft" && <Button size="sm" onClick={() => { update(sel.no, { status: "Sent" }); toast.success("Invoice sent to student"); }}><Send /> Send</Button>}
          {sel.status !== "Paid" && sel.status !== "Cancelled" && <Button size="sm" variant="outline" onClick={() => { update(sel.no, { status: "Paid", paid: sel.amount }); toast.success("Payment recorded", { description: `${inr(sel.amount - sel.paid)} receipted.` }); }}>Record payment</Button>}
          {sel.status !== "Cancelled" && sel.status !== "Paid" && <Button size="sm" variant="ghost" onClick={() => { update(sel.no, { status: "Cancelled" }); toast("Invoice cancelled"); }}>Cancel</Button>}
        </>}>
        {sel && <>
          <div className="flex items-center gap-2"><StatusBadge status={sel.status} /><span className="num text-2xl font-semibold">{inr(sel.amount)}</span></div>
          <KV items={[["Student ID", sel.studentId], ["Campus", sel.campus], ["Term", sel.term], ["Invoice date", sel.date], ["Due date", sel.due], ["Balance", inr(sel.amount - sel.paid)]]} />
          <div><div className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Accounting entry</div>
            <JournalPreview lines={[{ account: "1210 Student Receivables", dr: sel.amount }, { account: "4100 Tuition Fees", cr: sel.amount }]} /></div>
          <div><div className="mb-2 text-xs font-semibold uppercase text-muted-foreground">History</div>
            <Timeline items={[{ title: "Invoice created", meta: `${sel.date} · P. Nair`, status: "Done" }, { title: "Approved", meta: "R. Menon", status: "Approved" }, ...(sel.paid ? [{ title: `Payment ${inr(sel.paid)}`, meta: "Receipt posted", status: "Paid" }] : [])]} /></div>
        </>}
      </DetailSheet>
    </>
  );
}
