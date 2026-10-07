import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { FeesList } from "@/components/pages/FeesList";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/fees")({
  head: () => meta("Student Invoices", "Manage student fee invoices, balances and collections across programmes and campuses."),
  component: FeesLayout,
});

function FeesLayout() {
  const { pathname } = useLocation();
  return pathname === "/fees" ? <FeesList /> : <Outlet />;
}
