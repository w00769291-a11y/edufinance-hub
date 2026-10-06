// Mock dataset for the Finance & Accounts ERP (frontend demo data).
export const inr = (n: number, dp = 0) =>
  "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: dp, maximumFractionDigits: dp });
export const compact = (n: number) =>
  n >= 1e7 ? `₹${(n / 1e7).toFixed(2)} Cr` : n >= 1e5 ? `₹${(n / 1e5).toFixed(2)} L` : inr(n);

export const campuses = ["Main Campus – Bengaluru", "North Campus – Delhi", "West Campus – Pune"];
export const financialYears = ["FY 2026-27", "FY 2025-26", "FY 2024-25"];
export const programmes = ["B.Tech CSE", "B.Tech ECE", "MBA", "B.Com", "M.Sc Data Science", "BBA"];

export const kpis = [
  { label: "Total Receivables", value: 48650000, change: 6.4, period: "vs last month", trend: [30, 34, 33, 38, 41, 44, 48] },
  { label: "Overdue Receivables", value: 9420000, change: -3.1, period: "vs last month", trend: [12, 11, 11, 10, 10, 9.6, 9.4], invert: true },
  { label: "Total Payables", value: 21380000, change: 2.2, period: "vs last month", trend: [18, 19, 19, 20, 20, 21, 21.3], invert: true },
  { label: "Cash & Bank", value: 136200000, change: 4.8, period: "vs last month", trend: [118, 121, 124, 126, 129, 132, 136] },
  { label: "Budget Available", value: 72500000, change: -8.5, period: "of annual budget", trend: [100, 95, 90, 86, 81, 77, 72] },
  { label: "Pending Approvals", value: 27, change: 12, period: "vs last week", trend: [18, 20, 22, 19, 24, 25, 27], count: true, invert: true },
];

export const revenue = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"].map((m, i) => ({
  month: m,
  revenue: [182, 96, 74, 210, 168, 120, 135][i]! * 100000,
  collections: [150, 120, 82, 165, 172, 131, 118][i]! * 100000,
}));
export const ageing = [
  { bucket: "Current", amount: 21400000 },
  { bucket: "1–30", amount: 9800000 },
  { bucket: "31–60", amount: 7600000 },
  { bucket: "61–90", amount: 5200000 },
  { bucket: "90+", amount: 4650000 },
];
export const budgetVsActual = [
  { dept: "Academic", budget: 420, commit: 60, actual: 280, available: 80 },
  { dept: "Infra", budget: 380, commit: 120, actual: 210, available: 50 },
  { dept: "Tech", budget: 160, commit: 30, actual: 145, available: -15 },
  { dept: "Admin", budget: 140, commit: 15, actual: 88, available: 37 },
  { dept: "Student Svcs", budget: 110, commit: 10, actual: 62, available: 38 },
].map((d) => ({ ...d, budget: d.budget * 1e5, commit: d.commit * 1e5, actual: d.actual * 1e5, available: d.available * 1e5 }));
export const cashflow = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"].map((m, i) => ({
  month: m,
  incoming: [160, 118, 84, 172, 170, 133, 120][i]! * 1e5,
  outgoing: [-98, -104, -110, -125, -118, -112, -108][i]! * 1e5,
}));
export const expenseBreakdown = [
  { name: "Salaries", value: 54 },
  { name: "Infrastructure", value: 16 },
  { name: "Academic", value: 11 },
  { name: "Operations", value: 9 },
  { name: "Technology", value: 7 },
  { name: "Other", value: 3 },
];

export const actions = [
  { title: "Invoices awaiting approval", count: 12, severity: "High", owner: "R. Menon (Controller)", due: "Today", to: "/approvals" },
  { title: "Payment batches awaiting approval", count: 5, severity: "Critical", owner: "S. Iyer (Bank Signatory)", due: "Today, 4:00 PM", to: "/payment-batch" },
  { title: "Bank reconciliation exceptions", count: 8, severity: "High", owner: "A. Khan (Accountant)", due: "08 Oct", to: "/reconciliation" },
  { title: "Overdue student accounts", count: 23, severity: "Medium", owner: "Fees Desk", due: "10 Oct", to: "/fees" },
  { title: "Budget breaches", count: 3, severity: "Critical", owner: "Budget Officer", due: "Today", to: "/budget" },
  { title: "Scholarship applications to review", count: 4, severity: "Low", owner: "Aid Committee", due: "12 Oct", to: "/scholarships" },
] as const;

const first = ["Aarav", "Diya", "Kabir", "Ananya", "Vihaan", "Ishita", "Rohan", "Meera", "Arjun", "Saanvi", "Aditya", "Nisha", "Karan", "Priya", "Dev", "Tara"];
const last = ["Sharma", "Patel", "Reddy", "Nair", "Gupta", "Iyer", "Singh", "Rao", "Das", "Joshi", "Kapoor", "Menon"];
const invStatuses = ["Paid", "Partially Paid", "Overdue", "Sent", "Draft", "Paid", "Sent", "Overdue", "Cancelled", "Partially Paid"];

export type Student = { id: string; name: string; programme: string; batch: string; campus: string; balance: number };
export const students: Student[] = Array.from({ length: 16 }, (_, i) => ({
  id: `STU-${(24001 + i * 37).toString()}`,
  name: `${first[i]!} ${last[i % last.length]!}`,
  programme: programmes[i % programmes.length]!,
  batch: `${2023 + (i % 3)}–${2027 + (i % 3)}`,
  campus: campuses[i % 3]!,
  balance: [0, 42500, 118000, 86000, 0, 23500, 64000, 152000, 0, 31000, 9800, 76500, 0, 54000, 128000, 17500][i]!,
}));

export type Invoice = { no: string; studentId: string; student: string; programme: string; campus: string; date: string; due: string; amount: number; paid: number; status: string; term: string };
export const invoices: Invoice[] = Array.from({ length: 28 }, (_, i) => {
  const s = students[i % students.length]!;
  const amount = [185000, 92500, 142000, 68000, 210000, 76500, 118000][i % 7]!;
  const status = invStatuses[i % invStatuses.length]!;
  const paid = status === "Paid" ? amount : status === "Partially Paid" ? Math.round(amount * 0.45) : 0;
  return {
    no: `INV-26-${(1042 + i).toString().padStart(5, "0")}`,
    studentId: s.id, student: s.name, programme: s.programme, campus: s.campus,
    date: `${String(1 + (i % 28)).padStart(2, "0")} ${["Jul", "Aug", "Sep"][i % 3]!} 2026`,
    due: `${String(1 + ((i + 14) % 28)).padStart(2, "0")} ${["Aug", "Sep", "Oct"][i % 3]!} 2026`,
    amount, paid, status, term: ["Term 1", "Term 2", "Semester 1"][i % 3]!,
  };
});

export const vendorCats = ["IT & Software", "Facilities", "Lab Supplies", "Catering", "Transport", "Professional Services", "Library"];
export type Vendor = { id: string; name: string; category: string; taxId: string; payables: number; overdue: number; status: string; bank: string };
export const vendors: Vendor[] = [
  "Nimbus Cloud Systems", "Greenleaf Facility Services", "Sigma Scientific Supplies", "Annapurna Caterers", "Metro Fleet Transport",
  "Kothari & Associates LLP", "Pragati Book House", "Voltline Electricals", "Apex Security Services", "Brightboard Edtech",
  "Orion Furniture Works", "Clearwater Utilities",
].map((n, i) => ({
  id: `VEN-${(3001 + i).toString()}`, name: n, category: vendorCats[i % vendorCats.length]!,
  taxId: `29AAB${["C", "F", "P", "K"][i % 4]!}${(4410 + i * 13)}${"QRSTUV"[i % 6]!}1Z${i % 9}`,
  payables: [842000, 315000, 228500, 96000, 174000, 450000, 38500, 126000, 210000, 0, 87500, 64200][i]!,
  overdue: [120000, 0, 48000, 0, 32000, 150000, 0, 0, 60000, 0, 0, 12000][i]!,
  status: ["Active", "Active", "Active", "Active", "Pending Verification", "Active", "Active", "On Hold", "Active", "Inactive", "Active", "Active"][i]!,
  bank: ["Verified", "Verified", "Verified", "Verified", "Pending", "Verified", "Verified", "Failed", "Verified", "Verified", "Pending", "Verified"][i]!,
}));

const billStatuses = ["Pending Approval", "Approved", "Partially Paid", "Paid", "Overdue", "On Hold", "Draft", "Rejected", "Approved", "Pending Approval"];
const matches = ["MATCHED", "MATCHED", "VARIANCE", "MATCHED", "NON-PO REVIEW", "VARIANCE", "MATCHED", "NON-PO REVIEW", "MATCHED", "MATCHED"];
export const bills = Array.from({ length: 20 }, (_, i) => {
  const v = vendors[i % vendors.length]!;
  const amount = [126000, 48500, 312000, 22800, 87000, 154000, 9600, 41000, 268000, 73500][i % 10]!;
  const status = billStatuses[i % 10]!;
  return {
    no: `BILL-${(7801 + i).toString()}`, vendor: v.name, vendorId: v.id,
    date: `${String(2 + (i % 26)).padStart(2, "0")} Sep 2026`, due: `${String(2 + ((i + 9) % 26)).padStart(2, "0")} Oct 2026`,
    amount, balance: status === "Paid" ? 0 : status === "Partially Paid" ? amount / 2 : amount, status,
    match: matches[i % 10]!, po: matches[i % 10]! === "NON-PO REVIEW" ? "—" : `PO-${5400 + i}`,
  };
});

export const bankAccounts = [
  { bank: "HDFC Bank", type: "Current – Fee Collections", no: "4821", balance: 68420000, synced: "5 min ago", recon: "Reconciled", pending: 0 },
  { bank: "State Bank of India", type: "Current – Operations", no: "1234", balance: 41380000, synced: "1 hr ago", recon: "8 exceptions", pending: 8 },
  { bank: "ICICI Bank", type: "Payroll Account", no: "7790", balance: 22150000, synced: "Today 09:12", recon: "In progress", pending: 3 },
  { bank: "Petty Cash", type: "Cash – Main Campus", no: "CASH", balance: 4250000, synced: "Manual", recon: "Reconciled", pending: 0 },
];

export const bankTxns = [
  { date: "05 Oct 2026", desc: "NEFT CR – RAZORPAY SETTLEMENT", ref: "RZP8812490", debit: 0, credit: 1284500, balance: 41380000, match: "Matched" },
  { date: "05 Oct 2026", desc: "NEFT DR – NIMBUS CLOUD SYSTEMS", ref: "PB-000123/04", debit: 236000, credit: 0, balance: 40095500, match: "Matched" },
  { date: "04 Oct 2026", desc: "IMPS CR – AARAV SHARMA", ref: "IMPS40921", debit: 0, credit: 92500, balance: 40331500, match: "Suggested Match" },
  { date: "04 Oct 2026", desc: "CHQ DEP 004512 – DIYA PATEL", ref: "CHQ004512", debit: 0, credit: 68000, balance: 40239000, match: "Unmatched" },
  { date: "03 Oct 2026", desc: "BANK CHARGES – SEP 2026", ref: "CHG0926", debit: 1180, credit: 0, balance: 40171000, match: "Unmatched" },
  { date: "03 Oct 2026", desc: "RTGS DR – GREENLEAF FACILITY", ref: "PB-000123/02", debit: 315000, credit: 0, balance: 40172180, match: "Matched" },
  { date: "02 Oct 2026", desc: "INTEREST CREDIT", ref: "INT0926", debit: 0, credit: 42800, balance: 40487180, match: "Suggested Match" },
  { date: "02 Oct 2026", desc: "UPI CR – UNKNOWN REMITTER", ref: "UPI77120", debit: 0, credit: 15000, balance: 40444380, match: "Unmatched" },
  { date: "01 Oct 2026", desc: "INTERNAL TRF TO PAYROLL A/C", ref: "TRF1001", debit: 5000000, credit: 0, balance: 40429380, match: "Excluded" },
];

export const coa = [
  { code: "1000", name: "Assets", type: "Asset", balance: 312400000, children: [
    { code: "1100", name: "Cash & Bank", balance: 136200000, children: [
      { code: "1110", name: "HDFC – Fee Collections", balance: 68420000 },
      { code: "1120", name: "SBI – Operations", balance: 41380000 },
      { code: "1130", name: "ICICI – Payroll", balance: 22150000 },
      { code: "1140", name: "Petty Cash", balance: 4250000 },
    ] },
    { code: "1200", name: "Accounts Receivable", balance: 48650000, children: [
      { code: "1210", name: "Student Receivables", balance: 46200000 },
      { code: "1220", name: "Grant Receivables", balance: 2450000 },
    ] },
    { code: "1500", name: "Fixed Assets", balance: 127550000 },
  ] },
  { code: "2000", name: "Liabilities", type: "Liability", balance: 58700000, children: [
    { code: "2100", name: "Accounts Payable", balance: 21380000 },
    { code: "2200", name: "Tax Payable", balance: 4120000, children: [
      { code: "2210", name: "GST Output", balance: 2860000 },
      { code: "2220", name: "TDS Payable", balance: 1260000 },
    ] },
    { code: "2300", name: "Student Deposits & Advances", balance: 33200000 },
  ] },
  { code: "4000", name: "Income", type: "Income", balance: 185400000, children: [
    { code: "4100", name: "Tuition Fees", balance: 162300000 },
    { code: "4200", name: "Hostel & Transport Fees", balance: 14800000 },
    { code: "4900", name: "Other Revenue", balance: 8300000 },
  ] },
  { code: "5000", name: "Expenses", type: "Expense", balance: 112900000, children: [
    { code: "5100", name: "Salaries", balance: 61000000 },
    { code: "5200", name: "Infrastructure", balance: 18100000 },
    { code: "5300", name: "Operations", balance: 10200000 },
    { code: "5400", name: "Technology", balance: 7900000 },
    { code: "5500", name: "Scholarships & Aid", balance: 15700000, inactive: false },
  ] },
];

export const ledger = [
  { date: "05 Oct 2026", account: "1210 Student Receivables", ref: "INV-26-01069", desc: "Term 2 tuition – Kabir Reddy", debit: 142000, credit: 0, by: "Fees Desk – P. Nair", approver: "R. Menon" },
  { date: "05 Oct 2026", account: "4100 Tuition Fees", ref: "INV-26-01069", desc: "Term 2 tuition – Kabir Reddy", debit: 0, credit: 142000, by: "Fees Desk – P. Nair", approver: "R. Menon" },
  { date: "05 Oct 2026", account: "1120 SBI – Operations", ref: "RCT-26-00812", desc: "Receipt – Aarav Sharma", debit: 92500, credit: 0, by: "Cashier – J. Das", approver: "System" },
  { date: "05 Oct 2026", account: "1210 Student Receivables", ref: "RCT-26-00812", desc: "Receipt – Aarav Sharma", debit: 0, credit: 92500, by: "Cashier – J. Das", approver: "System" },
  { date: "04 Oct 2026", account: "5400 Technology", ref: "BILL-7801", desc: "Cloud hosting – Sep", debit: 200000, credit: 0, by: "AP – A. Khan", approver: "R. Menon" },
  { date: "04 Oct 2026", account: "2210 GST Input", ref: "BILL-7801", desc: "GST @18%", debit: 36000, credit: 0, by: "AP – A. Khan", approver: "R. Menon" },
  { date: "04 Oct 2026", account: "2100 Accounts Payable", ref: "BILL-7801", desc: "Nimbus Cloud Systems", debit: 0, credit: 236000, by: "AP – A. Khan", approver: "R. Menon" },
  { date: "03 Oct 2026", account: "5300 Operations", ref: "JV-26-00341", desc: "Accrual – electricity Sep", debit: 184000, credit: 0, by: "GL – M. Rao", approver: "R. Menon" },
  { date: "03 Oct 2026", account: "2400 Accrued Expenses", ref: "JV-26-00341", desc: "Accrual – electricity Sep", debit: 0, credit: 184000, by: "GL – M. Rao", approver: "R. Menon" },
];

export const budgetLines = [
  { account: "5100 Salaries", cc: "Academic – CSE", budget: 24000000, commit: 0, actual: 13800000 },
  { account: "5200 Infrastructure", cc: "Estates", budget: 12000000, commit: 3200000, actual: 7900000 },
  { account: "5400 Technology", cc: "IT Services", budget: 5000000, commit: 900000, actual: 4600000 },
  { account: "5300 Operations", cc: "Administration", budget: 6400000, commit: 420000, actual: 3150000 },
  { account: "5310 Lab Consumables", cc: "Academic – Sciences", budget: 2800000, commit: 610000, actual: 1950000 },
  { account: "5320 Events & Outreach", cc: "Student Affairs", budget: 1500000, commit: 240000, actual: 1420000 },
  { account: "5330 Library Resources", cc: "Library", budget: 2200000, commit: 380000, actual: 960000 },
  { account: "5500 Scholarships", cc: "Financial Aid", budget: 18000000, commit: 1600000, actual: 15700000 },
];

export const scholarships = [
  { id: "SCH-2026-0141", student: "Ananya Nair", sid: "STU-24112", scheme: "Merit Excellence", requested: 120000, recommended: 100000, approved: 0, status: "Pending Review" },
  { id: "SCH-2026-0138", student: "Rohan Singh", sid: "STU-24223", scheme: "Need-based Aid", requested: 85000, recommended: 85000, approved: 85000, status: "Approved" },
  { id: "SCH-2026-0135", student: "Meera Rao", sid: "STU-24260", scheme: "Sports Quota", requested: 60000, recommended: 40000, approved: 0, status: "Recommended" },
  { id: "SCH-2026-0131", student: "Karan Gupta", sid: "STU-24445", scheme: "Merit Excellence", requested: 120000, recommended: 0, approved: 0, status: "Rejected" },
  { id: "SCH-2026-0127", student: "Ishita Iyer", sid: "STU-24186", scheme: "Single Girl Child", requested: 50000, recommended: 50000, approved: 50000, status: "Approved" },
  { id: "SCH-2026-0122", student: "Dev Joshi", sid: "STU-24519", scheme: "Need-based Aid", requested: 95000, recommended: 0, approved: 0, status: "Pending Review" },
];

export const refunds = [
  { no: "RF-26-0091", student: "Saanvi Das", payment: "RCT-26-00744", amount: 45000, reason: "Excess payment", bank: "Pending", status: "Under Review" },
  { no: "RF-26-0089", student: "Arjun Joshi", payment: "RCT-26-00702", amount: 120000, reason: "Withdrawal – within policy", bank: "Processing", status: "Payment Processing" },
  { no: "RF-26-0086", student: "Nisha Kapoor", payment: "RCT-26-00655", amount: 18500, reason: "Hostel fee reversal", bank: "Paid", status: "Paid" },
  { no: "RF-26-0084", student: "Aditya Menon", payment: "RCT-26-00630", amount: 9000, reason: "Duplicate gateway charge", bank: "—", status: "Approved" },
  { no: "RF-26-0080", student: "Tara Sharma", payment: "RCT-26-00598", amount: 60000, reason: "Programme transfer", bank: "—", status: "Rejected" },
  { no: "RF-26-0079", student: "Vihaan Gupta", payment: "RCT-26-00591", amount: 25000, reason: "Scholarship awarded post-payment", bank: "—", status: "Requested" },
];

export const approvals = [
  { id: "AP-1", type: "Payment Batch", ref: "PB-000124", requester: "A. Khan (Accountant)", amount: 1842600, date: "05 Oct", risk: "High", due: "Today", status: "Pending" },
  { id: "AP-2", type: "Vendor Bill", ref: "BILL-7803", requester: "A. Khan (AP)", amount: 312000, date: "04 Oct", risk: "Medium", due: "07 Oct", status: "Pending" },
  { id: "AP-3", type: "Student Refund", ref: "RF-26-0091", requester: "P. Nair (Fees Desk)", amount: 45000, date: "04 Oct", risk: "Low", due: "08 Oct", status: "Pending" },
  { id: "AP-4", type: "Manual Journal", ref: "JV-26-00344", requester: "M. Rao (GL)", amount: 640000, date: "03 Oct", risk: "High", due: "06 Oct", status: "Pending" },
  { id: "AP-5", type: "Scholarship Award", ref: "SCH-2026-0141", requester: "Aid Committee", amount: 100000, date: "03 Oct", risk: "Low", due: "12 Oct", status: "Pending" },
  { id: "AP-6", type: "Budget Revision", ref: "BR-2026-012", requester: "IT Services HoD", amount: 500000, date: "02 Oct", risk: "Medium", due: "09 Oct", status: "Returned" },
  { id: "AP-7", type: "Student Invoice", ref: "INV-26-01068", requester: "P. Nair (Fees Desk)", amount: 210000, date: "01 Oct", risk: "Low", due: "—", status: "Approved" },
  { id: "AP-8", type: "Vendor Onboarding", ref: "VEN-3005", requester: "Procurement", amount: 0, date: "30 Sep", risk: "High", due: "—", status: "Rejected" },
];

export const auditLog = [
  { ts: "06 Oct 2026 10:42:18", user: "R. Menon", role: "Controller", action: "Approved", module: "Payables", record: "BILL-7801", before: "Pending Approval", after: "Approved", reason: "3-way match OK", ip: "10.20.4.18 / s-9f21" },
  { ts: "06 Oct 2026 10:15:02", user: "A. Khan", role: "Accountant", action: "Created", module: "Payments", record: "PB-000124", before: "—", after: "Draft", reason: "Weekly vendor run", ip: "10.20.4.33 / s-7ab0" },
  { ts: "06 Oct 2026 09:58:47", user: "P. Nair", role: "Fees Officer", action: "Edited", module: "Student Fees", record: "INV-26-01069", before: "Due 15 Oct", after: "Due 20 Oct", reason: "Dean's extension memo", ip: "10.20.6.11 / s-1c55" },
  { ts: "05 Oct 2026 18:20:11", user: "System", role: "Automation", action: "Auto-matched", module: "Banking", record: "RZP8812490", before: "Unmatched", after: "Matched", reason: "Rule: gateway settlement", ip: "— / batch" },
  { ts: "05 Oct 2026 16:04:39", user: "S. Iyer", role: "Bank Signatory", action: "Rejected", module: "Vendors", record: "VEN-3005", before: "Pending Verification", after: "Rejected", reason: "Bank letter mismatch", ip: "10.20.2.7 / s-44d2" },
  { ts: "05 Oct 2026 14:31:56", user: "M. Rao", role: "GL Accountant", action: "Reversed", module: "Accounting", record: "JV-26-00329", before: "Posted", after: "Reversed by JV-26-00342", reason: "Wrong cost centre", ip: "10.20.4.21 / s-0e18" },
  { ts: "05 Oct 2026 11:12:04", user: "J. Das", role: "Cashier", action: "Posted", module: "Collections", record: "RCT-26-00812", before: "—", after: "Posted (locked)", reason: "Counter receipt", ip: "10.20.6.40 / s-3b77" },
  { ts: "04 Oct 2026 17:45:22", user: "Admin", role: "System Admin", action: "Role changed", module: "Settings", record: "user: k.verma", before: "Accountant", after: "Accountant + AP Maker", reason: "Ticket #4412", ip: "10.20.1.2 / s-aa01" },
];

export const exceptions = [
  { id: "EX-0412", severity: "Critical", module: "Banking", desc: "Unidentified UPI credit ₹15,000 > 7 days", owner: "A. Khan", created: "29 Sep", sla: "Breached", status: "Open" },
  { id: "EX-0410", severity: "High", module: "Payables", desc: "Bill BILL-7803 price variance 6.2% vs PO", owner: "Procurement", created: "02 Oct", sla: "1d left", status: "In Progress" },
  { id: "EX-0408", severity: "Critical", module: "Budget", desc: "Technology cost centre over budget by ₹1.5L", owner: "Budget Officer", created: "03 Oct", sla: "Today", status: "Open" },
  { id: "EX-0405", severity: "Medium", module: "Student Fees", desc: "Gateway receipt without invoice mapping", owner: "Fees Desk", created: "03 Oct", sla: "3d left", status: "In Progress" },
  { id: "EX-0401", severity: "High", module: "Vendors", desc: "Bank account change request for Voltline", owner: "S. Iyer", created: "01 Oct", sla: "2d left", status: "Escalated" },
  { id: "EX-0398", severity: "Low", module: "Accounting", desc: "Suspense account balance ₹2,340", owner: "M. Rao", created: "28 Sep", sla: "5d left", status: "Open" },
  { id: "EX-0390", severity: "Medium", module: "Refunds", desc: "Refund RF-26-0089 bank return R03", owner: "P. Nair", created: "26 Sep", sla: "Met", status: "Resolved" },
];

export const documents = [
  { file: "Nimbus_Invoice_Sep26.pdf", type: "Vendor Invoice", by: "A. Khan", date: "04 Oct 2026", linked: "BILL-7801", size: "248 KB" },
  { file: "Receipt_RCT-26-00812.pdf", type: "Receipt", by: "System", date: "05 Oct 2026", linked: "RCT-26-00812", size: "92 KB" },
  { file: "Greenleaf_GST_Certificate.pdf", type: "Vendor KYC", by: "Procurement", date: "12 Aug 2026", linked: "VEN-3002", size: "1.1 MB" },
  { file: "PB-000124_Bank_File.txt", type: "Payment File", by: "A. Khan", date: "06 Oct 2026", linked: "PB-000124", size: "14 KB" },
  { file: "Ananya_Income_Certificate.jpg", type: "Scholarship Evidence", by: "Ananya Nair", date: "28 Sep 2026", linked: "SCH-2026-0141", size: "620 KB" },
  { file: "Withdrawal_Form_Arjun.pdf", type: "Refund Request", by: "P. Nair", date: "22 Sep 2026", linked: "RF-26-0089", size: "310 KB" },
  { file: "JV-26-00341_Electricity_Bill.pdf", type: "Journal Support", by: "M. Rao", date: "03 Oct 2026", linked: "JV-26-00341", size: "180 KB" },
  { file: "Budget_FY27_Approved_v3.xlsx", type: "Budget", by: "Budget Officer", date: "18 Mar 2026", linked: "BUD-FY27", size: "2.4 MB" },
  { file: "Audit_Case_AC-07_Evidence.zip", type: "Audit Case", by: "Internal Audit", date: "01 Oct 2026", linked: "AC-07", size: "8.2 MB" },
];

export const roles = [
  { role: "Fees Officer", can: "Create invoices, credit notes", cannot: "Approve own invoices, post receipts" },
  { role: "Cashier", can: "Record & post receipts", cannot: "Create invoices, issue refunds" },
  { role: "AP Accountant (Maker)", can: "Enter bills, prepare payment batches", cannot: "Approve or release batches" },
  { role: "Second Accountant (Checker)", can: "Check batches & journals", cannot: "Approve batches they prepared" },
  { role: "Financial Controller", can: "Approve bills, journals, batches ≤ ₹25L", cannot: "Edit vendor bank details" },
  { role: "Bank Signatory", can: "Release payment batches to bank", cannot: "Create vendors or bills" },
  { role: "Budget Officer", can: "Allocate & revise budgets", cannot: "Post expenditure" },
  { role: "Internal Auditor", can: "Read-only access to all records", cannot: "Create or modify any transaction" },
];

export const approvalMatrix = [
  { txn: "Student invoice / credit note", l1: "Fees Supervisor", l2: "> ₹2L: Controller", l3: "—" },
  { txn: "Vendor bill", l1: "HoD (budget owner)", l2: "Controller", l3: "> ₹10L: Finance Director" },
  { txn: "Payment batch", l1: "Second Accountant", l2: "Controller", l3: "Bank Signatory (dual)" },
  { txn: "Manual journal", l1: "GL Supervisor", l2: "Controller", l3: "Prior period: CFO" },
  { txn: "Student refund", l1: "Fees Supervisor", l2: "Controller", l3: "> ₹1L: Registrar" },
  { txn: "Scholarship award", l1: "Aid Committee", l2: "Dean", l3: "Controller (budget check)" },
  { txn: "Budget revision", l1: "Budget Officer", l2: "Finance Committee", l3: "—" },
  { txn: "Vendor onboarding / bank change", l1: "Procurement", l2: "Bank verification", l3: "Controller" },
];
