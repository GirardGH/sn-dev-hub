// src/app/clients/layout.tsx
import { ClientSidebar } from "../app/components/ClientSidebar";
import React from "react";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SN Dev Hub",
  description: "Mini ClickUp pour consultants ServiceNow",
};


export default function ClientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
    <div className="flex">
      <ClientSidebar />
      <main className="flex-1 p-6 overflow-y-auto h-screen">{children}</main>
    </div>
    </body>
    </html>
  );
}
