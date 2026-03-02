import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  TrendingUp,
  DollarSign,
  Percent,
  ArrowUpRight,
} from "lucide-react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useDashboardStore } from "@/lib/store";
import {
  useSystemStatus,
  usePerformanceMetrics,
} from "@/hooks/useDashboardData";

const data = [
  { time: "09:00", equity: 10000 },
  { time: "10:00", equity: 10050 },
  { time: "11:00", equity: 10020 },
  { time: "12:00", equity: 10100 },
  { time: "13:00", equity: 10080 },
  { time: "14:00", equity: 10150 },
  { time: "15:00", equity: 10200 },
];

export default function Dashboard() {
  const { autoRefresh } = useDashboardStore();
  const { data: status } = useSystemStatus(autoRefresh);
  const { data: metrics } = usePerformanceMetrics(autoRefresh);

  const isOnline = status?.is_online ?? true;
  const totalEquity = metrics?.total_equity ?? 10200.0;
  const winRate = metrics?.win_rate ?? 68.5;
  const profitFactor = metrics?.profit_factor ?? 1.84;
  const activeTradesCount = metrics?.active_trades_count ?? 3;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          System Performance
        </h2>
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${isOnline ? "bg-success/10 border-success/20" : "bg-destructive/10 border-destructive/20"}`}
        >
          <span
            className={`flex h-2 w-2 rounded-full ${isOnline ? "bg-success animate-pulse shadow-[0_0_8px_var(--color-success)]" : "bg-destructive"}`}
          ></span>
          <span
            className={`text-xs font-medium tracking-wide uppercase ${isOnline ? "text-success" : "text-destructive"}`}
          >
            {isOnline ? "Systems Online" : "Systems Offline"}
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/40 backdrop-blur-md border-border/50 shadow-lg hover:border-primary/30 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Equity
            </CardTitle>
            <div className="p-2 bg-primary/10 rounded-md">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">
              $
              {totalEquity.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <p className="text-xs text-success flex items-center mt-2 font-medium">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +2.0% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/40 backdrop-blur-md border-border/50 shadow-lg hover:border-primary/30 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Win Rate
            </CardTitle>
            <div className="p-2 bg-primary/10 rounded-md">
              <Percent className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">
              {winRate.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-2">
              Based on last 100 trades
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/40 backdrop-blur-md border-border/50 shadow-lg hover:border-primary/30 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Profit Factor
            </CardTitle>
            <div className="p-2 bg-primary/10 rounded-md">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">
              {profitFactor.toFixed(2)}
            </div>
            <p className="text-xs text-success flex items-center mt-2 font-medium">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +0.12 this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/40 backdrop-blur-md border-border/50 shadow-lg hover:border-primary/30 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Trades
            </CardTitle>
            <div className="p-2 bg-primary/10 rounded-md">
              <Activity className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight mb-2">
              {activeTradesCount}
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="bg-success/10 text-success border-success/30 font-medium tracking-wide text-[10px]"
              >
                EURUSD +$45
              </Badge>
              <Badge
                variant="outline"
                className="bg-destructive/10 text-destructive border-destructive/30 font-medium tracking-wide text-[10px]"
              >
                GBPUSD -$12
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4 bg-card/40 backdrop-blur-md border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Equity Curve</CardTitle>
            <CardDescription>
              Intraday performance for the current session.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-0 pb-2">
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorEquity"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="var(--color-primary)"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-primary)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="var(--color-border)"
                    strokeOpacity={0.5}
                  />
                  <XAxis
                    dataKey="time"
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$$${value}`}
                    domain={["auto", "auto"]}
                    dx={-10}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      borderColor: "var(--color-border)",
                      borderRadius: "calc(var(--radius) - 2px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                    }}
                    itemStyle={{
                      color: "var(--color-foreground)",
                      fontWeight: 600,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="equity"
                    stroke="var(--color-primary)"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{
                      r: 6,
                      fill: "var(--color-primary)",
                      stroke: "var(--color-background)",
                      strokeWidth: 2,
                    }}
                    style={{
                      filter: "drop-shadow(0px 4px 8px rgba(0, 220, 255, 0.4))",
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 bg-card/40 backdrop-blur-md border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Recent Execution</CardTitle>
            <CardDescription>
              Latest events from the execution engine.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  time: "15:02:11",
                  action: "BUY",
                  symbol: "EURUSD",
                  price: "1.08450",
                  status: "FILLED",
                  pnl: null,
                },
                {
                  time: "14:15:00",
                  action: "SELL",
                  symbol: "GBPUSD",
                  price: "1.26500",
                  status: "FILLED",
                  pnl: "-$12.50",
                },
                {
                  time: "13:45:22",
                  action: "BUY",
                  symbol: "USDJPY",
                  price: "150.250",
                  status: "CLOSED",
                  pnl: "+$85.20",
                },
                {
                  time: "11:30:00",
                  action: "SELL",
                  symbol: "EURGBP",
                  price: "0.85600",
                  status: "CLOSED",
                  pnl: "+$42.10",
                },
                {
                  time: "10:05:10",
                  action: "BUY",
                  symbol: "XAUUSD",
                  price: "2045.50",
                  status: "CLOSED",
                  pnl: "+$115.00",
                },
              ].map((trade, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-border/40 pb-4 last:border-0 last:pb-0 hover:bg-muted/10 p-2 -mx-2 rounded-md transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold tracking-wider ${trade.action === "BUY" ? "text-success drop-shadow-[0_0_2px_var(--color-success)]" : "text-destructive drop-shadow-[0_0_2px_var(--color-destructive)]"}`}
                      >
                        {trade.action}
                      </span>
                      <span className="font-semibold">{trade.symbol}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      @ {trade.price} &middot; {trade.time}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant="outline"
                      className={
                        trade.status === "FILLED"
                          ? "border-primary/50 text-primary bg-primary/10"
                          : "border-muted text-muted-foreground bg-muted/20"
                      }
                    >
                      {trade.status}
                    </Badge>
                    {trade.pnl && (
                      <div
                        className={`text-xs font-bold mt-1.5 ${trade.pnl.startsWith("+") ? "text-success" : "text-destructive"}`}
                      >
                        {trade.pnl}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
