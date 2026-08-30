"use client";

import {
  Activity,
  AlertTriangle,
  Bell,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Database,
  FileText,
  Filter,
  Gauge,
  Grid2X2,
  LifeBuoy,
  Menu,
  MoreHorizontal,
  PanelLeftClose,
  Search,
  Settings2,
  ShieldCheck,
  Siren,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  icon: LucideIcon;
  count?: number;
};

const navGroups: { label: string; items: NavItem[] }[] = [
  {
    label: "Workspace",
    items: [
      { label: "Overview", icon: Grid2X2 },
      { label: "Services", icon: Activity },
      { label: "SLOs", icon: Gauge },
    ],
  },
  {
    label: "Signals",
    items: [
      { label: "Logs", icon: FileText },
      { label: "Metrics", icon: Database },
      { label: "Traces", icon: PanelLeftClose },
    ],
  },
  {
    label: "Respond",
    items: [
      { label: "Alerts", icon: Siren, count: 3 },
      { label: "On-call", icon: Clock3 },
      { label: "Incidents", icon: ShieldCheck },
    ],
  },
];

const services = [
  {
    name: "checkout-api",
    team: "Payments",
    availability: "99.94%",
    latency: "148 ms",
    status: "healthy",
    path: "M1 30 C10 31 13 25 21 27 S34 17 42 21 S53 12 62 16 S77 8 95 10",
  },
  {
    name: "identity-service",
    team: "Core Platform",
    availability: "99.91%",
    latency: "91 ms",
    status: "healthy",
    path: "M1 20 C9 17 14 27 22 20 S33 11 43 18 S55 13 64 18 S78 11 95 14",
  },
  {
    name: "catalog-worker",
    team: "Commerce",
    availability: "99.76%",
    latency: "239 ms",
    status: "warning",
    path: "M1 31 C9 35 15 18 24 24 S35 29 43 24 S55 31 65 17 S80 22 95 7",
  },
  {
    name: "notification-gateway",
    team: "Developer Experience",
    availability: "99.97%",
    latency: "57 ms",
    status: "healthy",
    path: "M1 27 C10 22 17 26 25 16 S36 20 44 14 S56 21 65 12 S79 14 95 9",
  },
];

const chartBars = [31, 43, 27, 52, 39, 61, 48, 69, 36, 47, 29, 44, 22, 35, 28, 43, 32, 49, 38, 56, 44, 65, 51, 62];

export function Dashboard() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [range, setRange] = useState("24 hours");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [environment, setEnvironment] = useState("Production");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const navigate = (label: string) => {
    setActiveNav(label);
    setMobileOpen(false);
  };

  return (
    <TooltipProvider>
      <main className="min-h-[100dvh] bg-background text-foreground">
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-[248px] border-r border-border bg-sidebar lg:block">
          <SidebarContent activeNav={activeNav} onNavigate={navigate} />
        </aside>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent className="lg:hidden">
            <SheetTitle className="sr-only">Traceglow navigation</SheetTitle>
            <SheetDescription className="sr-only">Navigate through the observability workspace.</SheetDescription>
            <SidebarContent activeNav={activeNav} onNavigate={navigate} mobile />
          </SheetContent>
        </Sheet>

        <section className="min-w-0 lg:pl-[248px]">
          <Topbar
            activeNav={activeNav}
            onMenu={() => setMobileOpen(true)}
            onSearch={() => setSearchOpen(true)}
          />

          <div className="mx-auto w-full max-w-[1440px] px-4 py-7 sm:px-6 lg:px-8 lg:py-8">
            <section className="mb-7 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-success" />
                  All systems operational
                </div>
                <h1 className="text-[30px] font-medium leading-[1.15] text-foreground sm:text-[34px]">
                  System overview
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Live health across the Northstar production environment.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <EnvironmentMenu environment={environment} onChange={setEnvironment} />
                <ToggleGroup
                  type="single"
                  value={range}
                  onValueChange={(value) => value && setRange(value)}
                  aria-label="Time range"
                >
                  <ToggleGroupItem value="24 hours">24 hours</ToggleGroupItem>
                  <ToggleGroupItem value="7 days">7 days</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </section>

            <MetricsStrip />

            <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
              <ServiceHealth />
              <Incidents />
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
              <AlertActivity range={range} />
              <RecentEvents />
            </div>

            <footer className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-border py-5 text-[11px] text-muted-foreground">
              <span>Sample telemetry refreshes every 30 seconds</span>
              <span>Updated just now</span>
            </footer>
          </div>
        </section>

        <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      </main>
    </TooltipProvider>
  );
}

function SidebarContent({
  activeNav,
  onNavigate,
  mobile = false,
}: {
  activeNav: string;
  onNavigate: (label: string) => void;
  mobile?: boolean;
}) {
  return (
    <div className="flex h-full flex-col p-4">
      <div className="flex h-10 items-center px-2 pr-11">
        <div className="flex items-center gap-2.5">
          <Image
            src="/image/trace-glow-logo-black.webp"
            alt="Traceglow"
            width={28}
            height={28}
            className="size-7 rounded-md object-cover"
            priority
          />
          <span className="text-[15px] font-semibold text-foreground">Traceglow</span>
        </div>
      </div>

      <WorkspaceMenu />

      <nav className="mt-6 space-y-6" aria-label={mobile ? "Mobile navigation" : "Primary navigation"}>
        {navGroups.map((group) => (
          <div key={group.label}>
            <div className="mb-2 px-2 text-[10px] font-medium text-[#676e88]">
              {group.label.toUpperCase()}
            </div>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = item.label === activeNav;

                return (
                  <Button
                    key={item.label}
                    variant="ghost"
                    className={cn(
                      "h-8 w-full justify-between px-2.5 text-[13px]",
                      active
                        ? "bg-primary/15 text-white hover:bg-primary/20"
                        : "text-muted-foreground",
                    )}
                    onClick={() => onNavigate(item.label)}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={16} className={active ? "text-[#9da3ff]" : undefined} />
                      {item.label}
                    </span>
                    {item.count ? <Badge variant="destructive">{item.count}</Badge> : null}
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-auto">
        <Separator className="mb-3" />
        <Button variant="ghost" className="h-8 w-full justify-start px-2.5 text-muted-foreground">
          <Settings2 size={16} />
          Settings
        </Button>
        <Button variant="ghost" className="h-8 w-full justify-start px-2.5 text-muted-foreground">
          <LifeBuoy size={16} />
          Help center
        </Button>
        <UserMenu />
      </div>
    </div>
  );
}

function WorkspaceMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="mt-5 h-auto w-full justify-between px-3 py-2.5 text-left">
          <span>
            <span className="block text-[10px] font-medium text-muted-foreground">WORKSPACE</span>
            <span className="mt-1 block text-[13px] font-medium text-secondary-foreground">Northstar Cloud</span>
          </span>
          <ChevronDown size={14} className="text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[216px]">
        <DropdownMenuLabel>WORKSPACES</DropdownMenuLabel>
        <DropdownMenuItem className="justify-between">
          Northstar Cloud
          <Check size={14} className="text-primary" />
        </DropdownMenuItem>
        <DropdownMenuItem>Traceglow Labs</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Workspace settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="mt-3 h-auto w-full justify-start gap-3 px-2 py-2 text-left">
          <Avatar>
            <AvatarFallback>MP</AvatarFallback>
          </Avatar>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-xs font-medium text-secondary-foreground">Mina Park</span>
            <span className="mt-0.5 block text-[10px] text-muted-foreground">Platform admin</span>
          </span>
          <MoreHorizontal size={16} className="text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="top" className="w-[216px]">
        <DropdownMenuLabel>mina@northstar.dev</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem><UserRound size={14} />Profile</DropdownMenuItem>
        <DropdownMenuItem><Settings2 size={14} />Account settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Topbar({ activeNav, onMenu, onSearch }: { activeNav: string; onMenu: () => void; onSearch: () => void }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-[rgb(11_12_20/0.92)] px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden" onClick={onMenu} aria-label="Open navigation">
              <Menu size={18} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Open navigation</TooltipContent>
        </Tooltip>
        <div className="truncate text-sm font-medium text-secondary-foreground">
          Workspace <span className="px-1.5 text-[#555c73]">/</span> {activeNav}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" className="hidden w-[250px] justify-start text-muted-foreground md:flex" onClick={onSearch}>
          <Search size={15} />
          Search telemetry
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden" onClick={onSearch} aria-label="Search telemetry">
              <Search size={17} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Search telemetry</TooltipContent>
        </Tooltip>
        <NotificationPopover />
      </div>
    </header>
  );
}

function NotificationPopover() {
  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="relative" aria-label="Notifications">
              <Bell size={17} />
              <span className="absolute right-2 top-2 size-1.5 rounded-full bg-critical" />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>Notifications</TooltipContent>
      </Tooltip>
      <PopoverContent align="end">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold text-foreground">Notifications</h2>
          <Badge variant="destructive">1 new</Badge>
        </div>
        <div className="mt-3 rounded-md bg-card p-3 text-xs leading-5 text-secondary-foreground">
          Catalog worker latency exceeded its SLO threshold 6 minutes ago.
        </div>
      </PopoverContent>
    </Popover>
  );
}

function EnvironmentMenu({ environment, onChange }: { environment: string; onChange: (value: string) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Filter size={15} />
          {environment}
          <ChevronDown size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>ENVIRONMENT</DropdownMenuLabel>
        {["Production", "Staging", "All environments"].map((item) => (
          <DropdownMenuCheckboxItem
            key={item}
            checked={item === environment}
            onCheckedChange={() => onChange(item)}
          >
            {item}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MetricsStrip() {
  const metrics = [
    { label: "Availability", value: "99.94%", change: "+0.06%", icon: ShieldCheck, tone: "text-success" },
    { label: "P95 latency", value: "188 ms", change: "-14 ms", icon: Activity, tone: "text-[#9da3ff]" },
    { label: "Error rate", value: "0.21%", change: "+0.04%", icon: AlertTriangle, tone: "text-warning" },
    { label: "Active alerts", value: "3", change: "2 critical", icon: Siren, tone: "text-critical" },
  ];

  return (
    <Card className="grid sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;

        return (
          <CardContent
            key={metric.label}
            className={cn(
              "min-w-0 p-5",
              index > 0 && "border-t border-border sm:border-l sm:border-t-0",
              index === 2 && "sm:border-l-0 sm:border-t xl:border-l xl:border-t-0",
            )}
          >
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{metric.label}</span>
              <Icon size={16} className={metric.tone} />
            </div>
            <div className="mt-4 flex items-end gap-2">
              <span className="font-mono text-[25px] font-medium leading-none text-foreground">{metric.value}</span>
              <span className={cn("pb-0.5 text-[10px] font-semibold", metric.tone)}>{metric.change}</span>
            </div>
            <div className="mt-2 text-[10px] text-[#69718b]">Compared with previous period</div>
          </CardContent>
        );
      })}
    </Card>
  );
}

function ServiceHealth() {
  return (
    <Panel title="Service health" subtitle="SLO attainment by service" action="View services">
      <Table className="min-w-[560px]">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[42%]">SERVICE</TableHead>
            <TableHead>AVAILABILITY</TableHead>
            <TableHead>P95</TableHead>
            <TableHead className="w-[128px]">LAST 24H</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.name}>
              <TableCell>
                <div className="flex items-center gap-2 text-xs font-medium text-secondary-foreground">
                  <span className={cn("size-1.5 rounded-full", service.status === "warning" ? "bg-warning" : "bg-success")} />
                  <span className="truncate">{service.name}</span>
                </div>
                <div className="mt-1 pl-3.5 text-[10px] text-muted-foreground">{service.team}</div>
              </TableCell>
              <TableCell className="font-mono text-[11px] text-secondary-foreground">{service.availability}</TableCell>
              <TableCell className="font-mono text-[11px] text-secondary-foreground">{service.latency}</TableCell>
              <TableCell><Sparkline path={service.path} warning={service.status === "warning"} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Panel>
  );
}

function Incidents() {
  return (
    <Panel title="Open incidents" subtitle="Items that need attention" badge="2">
      <CardContent className="space-y-2 p-3">
        <Incident severity="SEV-2" title="Elevated 5xx on checkout-api" detail="Started 14 minutes ago" tone="critical" />
        <Incident severity="SEV-3" title="Catalog worker lag above SLO" detail="Started 41 minutes ago" tone="warning" />
      </CardContent>
      <PanelAction label="Open incident center" />
    </Panel>
  );
}

function AlertActivity({ range }: { range: string }) {
  return (
    <Panel title="Alert activity" subtitle={`Triggered alerts in the last ${range}`}>
      <CardContent className="px-5 pb-5 pt-6">
        <div className="flex h-40 items-end gap-1.5 border-b border-border">
          {chartBars.map((height, index) => {
            const highlighted = index === 7 || index === 21;
            const value = Math.round(height / 8);

            return (
              <Tooltip key={`${height}-${index}`}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="group relative flex h-full min-w-0 flex-1 items-end rounded-none p-0 hover:bg-transparent focus-visible:ring-1"
                    aria-label={`${value} alerts at hour ${index}`}
                  >
                    <span
                      className={cn("w-full rounded-t-[2px]", highlighted ? "bg-warning" : "bg-chart")}
                      style={{ height: `${height}%` }}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{value} alerts</TooltipContent>
              </Tooltip>
            );
          })}
        </div>
        <div className="mt-3 flex justify-between font-mono text-[9px] text-[#616980]">
          <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>NOW</span>
        </div>
      </CardContent>
    </Panel>
  );
}

function RecentEvents() {
  return (
    <Panel title="Recent events" subtitle="Latest production changes">
      <CardContent className="space-y-1 p-3">
        <Event icon={Activity} title="checkout-api deployed" detail="v2.14.0 by Hana Lee" time="9m" />
        <Event icon={Settings2} title="Alert policy updated" detail="checkout-api latency SLO" time="1h" />
        <Event icon={ShieldCheck} title="Incident resolved" detail="INC-248 payment timeout" time="3h" />
      </CardContent>
      <PanelAction label="View activity log" />
    </Panel>
  );
}

function Panel({
  title,
  subtitle,
  action,
  badge,
  children,
}: {
  title: string;
  subtitle: string;
  action?: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </div>
        {action ? (
          <Button variant="link" size="sm" className="px-0 text-[#9da3ff]">
            {action}<ChevronRight size={13} />
          </Button>
        ) : badge ? (
          <Badge variant="destructive" className="min-w-6 font-mono">{badge}</Badge>
        ) : (
          <PanelMenu title={title} />
        )}
      </CardHeader>
      {children}
    </Card>
  );
}

function PanelMenu({ title }: { title: string }) {
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon-xs" aria-label={`More ${title} options`}>
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>More options</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>View details</DropdownMenuItem>
        <DropdownMenuItem>Export data</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function PanelAction({ label }: { label: string }) {
  return (
    <CardFooter>
      <Button variant="ghost" className="h-11 w-full rounded-none text-[#9da3ff]">
        {label}<ChevronRight size={13} />
      </Button>
    </CardFooter>
  );
}

function Incident({
  severity,
  title,
  detail,
  tone,
}: {
  severity: string;
  title: string;
  detail: string;
  tone: "critical" | "warning";
}) {
  return (
    <Button variant="ghost" className="h-auto w-full items-start gap-3 border border-transparent bg-[#141621] p-3 text-left hover:border-strong">
      <AlertTriangle size={15} className={cn("mt-0.5", tone === "critical" ? "text-critical" : "text-warning")} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-xs font-medium text-secondary-foreground">{title}</span>
        <span className="mt-1 block text-[10px] text-muted-foreground">{detail}</span>
      </span>
      <Badge variant={tone === "critical" ? "destructive" : "warning"} className="font-mono text-[9px]">{severity}</Badge>
    </Button>
  );
}

function Event({ icon: Icon, title, detail, time }: { icon: LucideIcon; title: string; detail: string; time: string }) {
  return (
    <Button variant="ghost" className="h-auto w-full justify-start gap-3 px-2 py-2.5 text-left">
      <span className="grid size-8 shrink-0 place-items-center rounded-md border border-border bg-[#181a28] text-[#9da3ff]">
        <Icon size={14} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[11px] font-medium text-secondary-foreground">{title}</span>
        <span className="mt-1 block truncate text-[10px] text-muted-foreground">{detail}</span>
      </span>
      <span className="font-mono text-[9px] text-[#68708a]">{time}</span>
    </Button>
  );
}

function Sparkline({ path, warning }: { path: string; warning: boolean }) {
  return (
    <svg className="h-9 w-24" viewBox="0 0 96 38" fill="none" aria-hidden="true">
      <path d={path} stroke={warning ? "#f0b45c" : "#747dec"} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="max-w-xl gap-0 p-2">
        <DialogHeader className="sr-only">
          <DialogTitle>Search telemetry</DialogTitle>
          <DialogDescription>Search services, logs, metrics, and traces.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-3 border-b border-border px-3 py-2.5">
          <Search size={17} className="text-muted-foreground" />
          <Input
            autoFocus
            aria-label="Search telemetry"
            className="h-8 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            placeholder="Search services, logs, traces..."
          />
        </div>
        <div className="px-3 py-5 text-center text-xs text-muted-foreground">
          Search across your observability workspace
        </div>
      </DialogContent>
    </Dialog>
  );
}
