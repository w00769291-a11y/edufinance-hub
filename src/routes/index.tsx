import { createFileRoute, Link } from "@tanstack/react-router";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react";
import { Page, PageHeader, Panel, Sparkline, StatusBadge } from "@/components/app/kit";
import { Button } from "@/components/ui/button";
import { actions, ageing, budgetVsActual, cashflow, compact, expenseBreakdown, kpis, revenue } from "@/lib/data";
import { meta } from "@/lib/meta";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => meta("Finance Dashboard", "Receivables, payables, cash position, budgets and pending approvals at a glance."),
  component: Dashboard,
});

const pie = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)", "var(--muted-foreground)"];
const ax = { fontSize: 11, fill: "var(--muted-foreground)" };
const fmtL = (v: number) => `${(v / 1e5).toFixed(0)}L`;

function Dashboard() {
  return (
    <>
      <PageHeader title="Good morning, Rekha" subtitle="Here's the financial position across all campuses for FY 2026-27."
        actions={<Button size="sm" variant="outline" onClick={() => toast.success("Dashboard exported", { description: "PDF sent to your downloads." })}><Download /> Export</Button>} />
      <Page>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {kpis.map((k) => {
            const good = k.invert ? k.change < 0 : k.change > 0;
            return (
              <div key={k.label} className="rounded-lg border bg-card p-3.5">
                <div className="text-xs font-medium text-muted-foreground">{k.label}</div>
                <div className="num mt-1 text-lg font-semibold">{k.count ? k.value : compact(k.value)}</div>
                <div className="mt-1 flex items-end justify-between">
                  <span className={`flex items-center text-[11px] font-semibold ${good ? "text-success" : "text-danger"}`}>
                    {k.change > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}{Math.abs(k.change)}%
                  </span>
                  <Sparkline data={k.trend} positive={good} />
                </div>
              </div>
            );
          })}
        </div>

        <Panel title="Action centre" bodyClass="p-0">
          <table className="w-full text-[13px]">
            <tbody>
              {actions.map((a) => (
                <tr key={a.title} className="border-b last:border-0 hover:bg-accent/40">
                  <td className="px-4 py-2.5 font-medium"><Link to={a.to as "/"} className="hover:text-primary">{a.title}</Link></td>
                  <td className="num px-4 py-2.5 font-semibold">{a.count}</td>
                  <td className="px-4 py-2.5"><StatusBadge status={a.severity} /></td>
                  <td className="px-4 py-2.5 text-muted-foreground">{a.owner}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{a.due}</td>
                  <td className="px-4 py-2.5 text-right"><Link to={a.to as "/"} className="text-xs font-semibold text-primary">Review →</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <div className="grid gap-4 lg:grid-cols-2">
          <Panel title="Fee revenue vs collections">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={revenue}><CartesianGrid strokeDasharray="3 3" stroke="var(--border)" /><XAxis dataKey="month" tick={ax} /><YAxis tick={ax} tickFormatter={fmtL} /><Tooltip formatter={(v: number) => compact(v)} /><Legend wrapperStyle={{ fontSize: 12 }} />
                <Area dataKey="revenue" name="Billed" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.15} />
                <Area dataKey="collections" name="Collected" stroke="var(--chart-2)" fill="var(--chart-2)" fillOpacity={0.15} /></AreaChart>
            </ResponsiveContainer>
          </Panel>
          <Panel title="Receivables ageing">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={ageing}><CartesianGrid strokeDasharray="3 3" stroke="var(--border)" /><XAxis dataKey="bucket" tick={ax} /><YAxis tick={ax} tickFormatter={fmtL} /><Tooltip formatter={(v: number) => compact(v)} />
                <Bar dataKey="amount" radius={[4, 4, 0, 0]}>{ageing.map((_, i) => <Cell key={i} fill={i > 2 ? "var(--danger)" : "var(--chart-1)"} />)}</Bar></BarChart>
            </ResponsiveContainer>
          </Panel>
          <Panel title="Budget vs actual by department">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={budgetVsActual}><CartesianGrid strokeDasharray="3 3" stroke="var(--border)" /><XAxis dataKey="dept" tick={ax} /><YAxis tick={ax} tickFormatter={fmtL} /><Tooltip formatter={(v: number) => compact(v)} /><Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="budget" name="Budget" fill="var(--chart-3)" /><Bar dataKey="actual" name="Actual" fill="var(--chart-1)" /><Bar dataKey="commit" name="Committed" fill="var(--chart-4)" /></BarChart>
            </ResponsiveContainer>
          </Panel>
          <div className="grid gap-4 md:grid-cols-2">
            <Panel title="Cash flow">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={cashflow} stackOffset="sign"><XAxis dataKey="month" tick={ax} /><Tooltip formatter={(v: number) => compact(Math.abs(v))} />
                  <Bar dataKey="incoming" fill="var(--success)" stackId="a" /><Bar dataKey="outgoing" fill="var(--danger)" stackId="a" /></BarChart>
              </ResponsiveContainer>
            </Panel>
            <Panel title="Expense mix">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart><Pie data={expenseBreakdown} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>{expenseBreakdown.map((_, i) => <Cell key={i} fill={pie[i]} />)}</Pie><Tooltip formatter={(v: number) => `${v}%`} /><Legend wrapperStyle={{ fontSize: 11 }} /></PieChart>
              </ResponsiveContainer>
            </Panel>
          </div>
        </div>
      </Page>
    </>
  );
}
