# EduFinance Hub

Design and build a modern Finance & Accounts ERP web application for an educational institution, using the overall UX quality and information architecture of Zoho Books / Zoho Finance applications as inspiration, but do not copy Zoho's branding, logo, proprietary assets, or exact interface.

The application should feel like a polished commercial SaaS product: clean, minimal, professional, fast, highly organized and easy for finance teams to use.

DESIGN DIRECTION

Use a Zoho-style enterprise SaaS interface:

Clean white/light-gray workspace

Compact left navigation sidebar

Professional blue/neutral accent palette

Rounded cards with subtle borders

Minimal shadows

Clean typography

Dense but readable financial tables

Clear status badges

Professional forms

Slide-over panels where appropriate

Modal dialogs for quick actions

Breadcrumb navigation

Global search

Advanced filtering

Command/action buttons

Responsive desktop-first design

Do NOT make it look like a generic admin dashboard.

It should look like a real accounting SaaS product.

1. APPLICATION SHELL

Create a persistent application layout.

Left Sidebar

Display:

Dashboard

Banking

Sales / Student Fees

Purchases

Expenses

Payments

Scholarships & Aid

Refunds

Vendors

Accounting

Budget

Reports

Reconciliation

Audit & Compliance

Documents

Approvals

Exceptions

Settings

Sidebar should support:

Expand/collapse

Icons + labels

Active menu state

Submenus

Tooltip when collapsed

Top Navigation

Include:

Global search

Quick Create (+)

Notifications

Help

Organization/Campus selector

Financial year selector

User profile

Quick Create should open:

Student Invoice

Receipt

Vendor

Vendor Bill

Payment

Journal

Budget

Scholarship

Refund

2. DASHBOARD

Create a Zoho-style finance dashboard.

Top section:

"Good morning, Finance Team"

Display financial KPIs as compact cards:

Total Receivables

Overdue Receivables

Total Payables

Cash & Bank

Budget Available

Pending Approvals

Each card should include:

Amount

Percentage change

Comparison period

Small trend indicator

Dashboard Charts

Create clean professional charts:

Revenue Overview

Line/bar chart:

Month → Revenue → Collections

Receivables

Ageing chart:

Current
1–30 Days
31–60 Days
61–90 Days
90+ Days

Budget vs Actual

Grouped bar chart:

Budget
Commitments
Actual
Available

Cash Flow

Incoming vs outgoing cash.

Expense Breakdown

Donut chart by:

Salaries

Infrastructure

Academic

Operations

Technology

Other

3. ACTION REQUIRED

Create a prominent "Action Required" section.

Cards/list:

12 invoices awaiting approval

5 payment batches awaiting approval

8 bank reconciliation exceptions

23 overdue student accounts

3 budget breaches

4 scholarship applications awaiting review

Each item should have:

Severity

Count

Owner

Due date

View button

4. STUDENT FEES

Create a Zoho Books-style receivables module.

Main page:

Student Fees

Top action buttons:

New Invoice

Record Payment

Credit Note

Refund

Import

Filters:

Student

Programme

Campus

Academic Year

Term

Status

Due Date

Table columns:

Student ID
Student Name
Invoice #
Invoice Date
Due Date
Amount
Paid
Balance
Status
Actions

Statuses:

Draft
Sent
Partially Paid
Paid
Overdue
Cancelled

5. STUDENT PROFILE

Create a detailed student finance profile.

Header:

Student photo/avatar
Student ID
Student name
Programme
Batch
Campus
Current balance

Tabs:

Overview
Invoices
Payments
Credits
Refunds
Scholarships
Transactions
Documents
Activity

Right-side summary:

Outstanding
Overdue
Total Paid
Scholarship
Refundable Credit

6. INVOICE SCREEN

Design a professional invoice creation page.

Header:

New Student Invoice

Fields:

Student
Academic Year
Term
Programme
Invoice Date
Due Date

Invoice table:

Fee Head
Description
Quantity
Rate
Discount
Tax
Amount

Bottom summary:

Subtotal
Discount
Scholarship/Aid
Tax
Total
Paid
Balance Due

Right panel:

Accounting Preview

Debit:
Student Receivable

Credit:
Fee Revenue / Tax Payable

Actions:

Save Draft
Save & Send
Submit for Approval

7. PAYMENTS / COLLECTIONS

Create a payment screen similar to a professional accounting SaaS.

Payment information:

Student
Invoice
Payment Method
Amount
Reference Number
Payment Date
Bank/Cash Account

Payment methods:

Cash
Bank Transfer
Card
Payment Gateway
Cheque

Show:

Payment Allocation

Invoice
Original Amount
Paid
Current Payment
Balance

After posting:

Generate Receipt

Receipt should be immutable.

8. VENDORS

Create a Vendors module.

Header:

Vendors

Actions:

New Vendor
Import Vendors
Export

Search/filter:

Vendor name
Category
Status
Tax ID
Bank verification

Vendor table:

Vendor
Category
Tax ID
Payables
Overdue
Status
Actions

9. VENDOR PROFILE

Create a detailed vendor page.

Header:

Vendor Name
Vendor ID
Status
Tax information

Summary cards:

Outstanding
Overdue
Paid
Pending Payments

Tabs:

Overview
Bills
Payments
Purchase Orders
Bank Details
Documents
Activity

10. ACCOUNTS PAYABLE

Create a Zoho-style Bills screen.

Actions:

New Bill
Import Bills
Scan Invoice

Table:

Bill #
Vendor
Bill Date
Due Date
Amount
Balance
Status

Statuses:

Draft
Pending Approval
Approved
Partially Paid
Paid
Overdue
On Hold
Rejected

Add three-way matching UI:

Purchase Order
Receipt
Invoice

Display:

MATCHED
VARIANCE
NON-PO REVIEW

11. PAYMENT BATCH

Create a professional payment-batch workflow.

Header:

Payment Batch #PB-000124

Status:

DRAFT → CHECKED → APPROVED → READY FOR RELEASE → SENT → SETTLED → RECONCILED

Show:

Number of Payments
Total Amount
Bank Account
Payment Date
Currency

Payment table:

Vendor
Invoice
Bank
Amount
Due Date
Status

Approval timeline:

Accountant
↓
Second Accountant
↓
Controller
↓
Bank Signatory
↓
Bank

Each approval should display:

Name
Role
Date
Time
Status

12. BANKING

Create a Banking module inspired by modern accounting SaaS products.

Display bank accounts as cards:

Bank Name
Account Number ****1234
Current Balance
Last Synced
Reconciliation Status

Actions:

Connect Bank
Import Statement
Reconcile

Bank transaction table:

Date
Description
Reference
Debit
Credit
Balance
Match Status

Match statuses:

Matched
Unmatched
Suggested Match
Excluded

13. BANK RECONCILIATION

Create a split-screen reconciliation experience.

Left:

Bank Transactions

Right:

System Transactions

Allow:

Auto Match

Manual Match

Split Transaction

Create Journal

Exclude

Mark as Reconciled

Top summary:

Bank Balance
Book Balance
Difference
Unreconciled Amount

Use a clear green/amber/red status indicator.

14. GENERAL LEDGER

Create:

Accounting → General Ledger

Features:

Chart of Accounts

Journal Entries

Trial Balance

Ledger

Manual Journals

Adjustments

Accruals

Reversals

Period Close

Ledger table:

Date
Account
Reference
Description
Debit
Credit
Balance

Clicking a transaction opens a detailed slide-over panel.

15. CHART OF ACCOUNTS

Create a professional tree-based COA interface.

Example:

Assets
Cash & Bank
Accounts Receivable
Fixed Assets

Liabilities
Accounts Payable
Tax Payable

Income
Tuition Fees
Other Revenue

Expenses
Salaries
Infrastructure
Operations
Technology

Actions:

New Account
Edit
Deactivate
View Transactions

16. BUDGET

Create a modern budgeting interface.

Dashboard:

Approved Budget
Actual
Committed
Available
Variance

Budget table:

Account
Cost Centre
Budget
Commitments
Actual
Available
Variance

Use visual indicators for:

Under Budget
Near Limit
Over Budget

Budget revisions should display version history.

17. SCHOLARSHIPS & AID

Create:

Scholarship Dashboard

Cards:

Applications
Pending Review
Approved
Rejected
Total Awarded

Application table:

Student
Scheme
Requested
Recommended
Approved
Status

Application detail page:

Student information
Eligibility
Documents
Recommendation
Approval history
Accounting impact

18. REFUNDS

Create a Refund Center.

Table:

Refund #
Student
Original Payment
Refund Amount
Reason
Bank Status
Approval Status

Refund workflow:

Requested
Under Review
Approved
Payment Processing
Paid
Rejected

Show complete audit history.

19. APPROVAL CENTER

Create a centralized approval inbox.

Tabs:

My Approvals
Pending
Approved
Rejected
Returned

Cards should show:

Transaction Type
Reference
Requester
Amount
Date
Risk
Due Date

Actions:

Approve
Reject
Return
Request Clarification

Before approval, show:

Transaction
Supporting Documents
Accounting Impact
Budget Impact
Previous Changes
Approval History

20. AUDIT TRAIL

Create a professional audit log screen.

Filters:

User
Module
Action
Date
Transaction
Entity

Table:

Timestamp
User
Role
Action
Record
Before
After
Reason
IP/Session

Click an entry to open a detailed audit drawer.

Audit records must be read-only.

21. REPORTS CENTER

Create a report library with categories.

Receivables

Student Ageing

Outstanding Fees

Collection Summary

Defaulter Report

Payables

AP Ageing

Vendor Due List

Payment Report

Accounting

Trial Balance

General Ledger

Profit & Loss

Balance Sheet

Cash Flow

Budget

Budget vs Actual

Budget Variance

Commitment Report

Banking

Bank Reconciliation

Unmatched Transactions

Audit

Audit Trail

User Access

Approval History

Reports should have:

Filter
Customize Columns
Save View
Schedule
Export PDF
Export Excel
Print

22. DOCUMENTS

Create a centralized Documents module.

Documents can be attached to:

Invoice

Receipt

Vendor

Payment

Scholarship

Refund

Journal

Budget

Audit case

Show:

File
Type
Uploaded By
Date
Linked Record

23. EXCEPTIONS

Create an Exception Center.

Display severity:

Critical
High
Medium
Low

Exception table:

Exception ID
Module
Description
Owner
Created
SLA
Status

Click exception to open:

Details
Root Cause
Evidence
Comments
Actions
Resolution
Audit Trail

24. SETTINGS

Create Zoho-style settings.

Categories:

Organization
Users & Roles
Permissions
Campuses
Financial Year
Accounting Periods
Chart of Accounts
Taxes
Fee Heads
Payment Methods
Bank Accounts
Approval Workflows
Notifications
Email
Integrations
Audit
Data Retention
Backup

25. DESIGN SYSTEM

Use a consistent design system.

Typography:

Modern SaaS typography with clear hierarchy.

Components:

Buttons

Inputs

Selects

Date pickers

Dropdowns

Tables

Cards

Tabs

Drawers

Modals

Toast notifications

Status badges

Timelines

Charts

Pagination

Tables should feel similar to professional accounting software: compact, sortable, filterable and information-dense.

Use generous whitespace around major sections while keeping financial tables compact.

26. UX PRINCIPLES

Prioritize:

Fast data entry

Minimal clicks

Clear accounting information

Strong approval visibility

Excellent search

Powerful filters

Keyboard-friendly workflows

Clear error messages

Visible audit history

Consistent navigation

Every transaction should answer:

What is it?

Who created it?

Who approved it?

What is its amount?

What is its accounting impact?

What is its current status?

What documents support it?

What happened to it previously?

27. IMPORTANT

Use the uploaded Finance & Accounts SOP as the functional source of truth.

Implement its:

Roles

Segregation of duties

Approval matrix

Transaction statuses

Budget controls

Student billing

Collections

Scholarships

Refunds

Vendor onboarding

Accounts payable

Payment batches

General ledger

Bank reconciliation

Audit trail

Period close

Exception management

Do not simplify the application into a basic CRUD dashboard.

The final product should feel like a premium accounting SaaS platform, with the usability and polish of modern products such as Zoho Finance, while being specifically designed for an educational institution's Finance & Accounts operations.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/be5081b3-b07d-43c5-819d-618605ae60ed).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
