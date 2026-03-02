import { Activity } from "lucide-react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30">
      <header className="border-b border-border/40 bg-card/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/20 p-1.5 rounded-lg border border-primary/30">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              QuantLux
            </span>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a
              href="#"
              className="text-primary transition-colors hover:text-primary/80 drop-shadow-[0_0_8px_var(--color-primary)]"
            >
              Dashboard
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Strategies
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Settings
            </a>
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
