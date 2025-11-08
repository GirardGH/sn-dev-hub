import type { Metadata } from "next";
import "./globals.css";
// import Sidebar from "@/components/Sidebar";
import { Shell } from "@/components/layout/Shell"
import { ThemeProvider } from "@/components/theme/ThemeProvider";


export const metadata: Metadata = {
  title: "SN Dev Hub",
  description: "Manage ServiceNow clients, stories & developments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="h-full bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        {/* <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div> */}
        <ThemeProvider>
          <Shell>{children}</Shell>
        </ThemeProvider>
      </body>
    </html>
  );
}
