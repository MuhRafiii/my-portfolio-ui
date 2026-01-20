import type React from "react";
import { Sidebar } from "../Sidebar";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 bg-muted p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
