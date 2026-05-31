import { Sidebar } from "./Sidebar";
import { MarketTicker } from "./MarketTicker";
import { TopNav } from "./TopNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pb-10">
      <TopNav />
      <div className="lg:flex">
        <Sidebar />
        <main className="min-w-0 flex-1 p-3 lg:p-5">{children}</main>
      </div>
      <MarketTicker />
    </div>
  );
}
