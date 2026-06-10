import type {
  DashboardData,
  BusinessSummary,
  MonthlyPoint,
  RecentOrder,
  StockAlert,
  CategoryExpense,
} from "@/types/dashboard";




// ── Formatters ─────────────────────────────────────────────────────────────
export function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}k`;
  return `$${n.toLocaleString("es-AR")}`;
}

export function formatDelta(current: number, prev: number): string {
  if (prev === 0) return "+0%";
  const pct = ((current - prev) / prev) * 100;
  return `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`;
}

export function isDeltaPositive(current: number, prev: number): boolean {
  return current >= prev;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

// ── Global aggregates (computed from BusinessSummary[]) ───────────────────
export function getTotalRevenue(businesses: BusinessSummary[]): number {
  return businesses.reduce((s, b) => s + b.monthlyRevenue, 0);
}

export function getTotalExpenses(businesses: BusinessSummary[]): number {
  return businesses.reduce((s, b) => s + b.monthlyExpenses, 0);
}

export function getTotalPrevRevenue(businesses: BusinessSummary[]): number {
  return businesses.reduce((s, b) => s + b.prevMonthRevenue, 0);
}

export function getNetBalance(businesses: BusinessSummary[]): number {
  return getTotalRevenue(businesses) - getTotalExpenses(businesses);
}

export function getTotalPendingOrders(businesses: BusinessSummary[]): number {
  return businesses.reduce((s, b) => s + b.pendingOrders, 0);
}

export function getTotalLowStock(businesses: BusinessSummary[]): number {
  return businesses.reduce((s, b) => s + b.lowStockCount, 0);
}

// ── Mock data (replace with real Prisma queries in service.ts) ────────────
export const MOCK_DASHBOARD: DashboardData = {
  user: { id: "user_001", name: "Roberto Villalba", email: "roberto@empresa.com" },
  businesses: [
    {
      id: "biz_001",
      name: "Ferretería El Tornillo",
      slug: "ferreteria-el-tornillo",
      monthlyRevenue: 284_500,
      monthlyExpenses: 48_200,
      prevMonthRevenue: 261_000,
      pendingOrders: 14,
      lowStockCount: 7,
      activeSuppliers: 18,
      customerCount: 284,
      guests: ["u2", "u3"],
    },
    {
      id: "biz_002",
      name: "Pinturas del Norte",
      slug: "pinturas-del-norte",
      monthlyRevenue: 142_300,
      monthlyExpenses: 31_800,
      prevMonthRevenue: 158_000,
      pendingOrders: 6,
      lowStockCount: 2,
      activeSuppliers: 9,
      customerCount: 121,
      guests: ["u4"],
    },
    {
      id: "biz_003",
      name: "Eléctricos Rápido",
      slug: "electricos-rapido",
      monthlyRevenue: 98_700,
      monthlyExpenses: 22_400,
      prevMonthRevenue: 91_200,
      pendingOrders: 9,
      lowStockCount: 4,
      activeSuppliers: 6,
      customerCount: 89,
      guests: [],
    },
  ],
  monthlySeries: [
    { month: "Dic", revenue: 398_000, expenses: 92_000 },
    { month: "Ene", revenue: 421_000, expenses: 98_000 },
    { month: "Feb", revenue: 387_000, expenses: 88_000 },
    { month: "Mar", revenue: 462_000, expenses: 102_000 },
    { month: "Abr", revenue: 510_200, expenses: 96_400 },
    { month: "May", revenue: 525_500, expenses: 102_400 },
  ],
  recentOrders: [
    { id: "ORD-0092", customerName: "Martín García",   businessName: "Ferretería El Tornillo", total: 18_400, status: "PENDING",   createdAt: "2025-05-28T10:00:00Z" },
    { id: "ORD-0091", customerName: "Ana López",        businessName: "Pinturas del Norte",     total:  7_250, status: "COMPLETED", createdAt: "2025-05-28T08:30:00Z" },
    { id: "ORD-0090", customerName: "Carlos Ruiz",      businessName: "Eléctricos Rápido",      total: 32_100, status: "COMPLETED", createdAt: "2025-05-27T16:00:00Z" },
    { id: "ORD-0089", customerName: "Sofía Pérez",      businessName: "Ferretería El Tornillo", total:  4_800, status: "CANCELED",  createdAt: "2025-05-27T11:00:00Z" },
    { id: "ORD-0088", customerName: "Jorge Molina",     businessName: "Pinturas del Norte",     total: 12_600, status: "COMPLETED", createdAt: "2025-05-26T14:00:00Z" },
    { id: "ORD-0087", customerName: "Laura Fernández",  businessName: "Eléctricos Rápido",      total:  9_300, status: "PENDING",   createdAt: "2025-05-26T09:00:00Z" },
  ],
  stockAlerts: [
    { productName: "Tornillo galv. 3/8\"",  businessName: "Ferretería El Tornillo", quantity: 3,  minStock: 50 },
    { productName: "Cinta aisladora 20m",   businessName: "Eléctricos Rápido",      quantity: 5,  minStock: 30 },
    { productName: "Pintura látex blanca",  businessName: "Pinturas del Norte",     quantity: 8,  minStock: 40 },
    { productName: "Llave inglesa 12\"",    businessName: "Ferretería El Tornillo", quantity: 2,  minStock: 20 },
    { productName: "Cable unipolar 1.5mm",  businessName: "Eléctricos Rápido",      quantity: 12, minStock: 60 },
  ],
  expenseByCategory: [
    { category: "Alquiler",   amount: 78_000, color: "#5b8def" },
    { category: "Servicios",  amount: 27_300, color: "#1D9E75" },
    { category: "Marketing",  amount: 14_500, color: "#BA7517" },
    { category: "Seguros",    amount: 12_400, color: "#E24B4A" },
    { category: "Otros",      amount:  8_200, color: "#888780" },
  ],
};


import type {
  
  ApiOrder,
  ApiExpense,
  ApiInventoryItem,
  ApiBusiness,
  ApiUser,
  ApiSupplier,
  ApiCustomer,
} from "@/types/dashboard";

// ─────────────────────────────────────────────────────────────────────────────
// Formatters
// ─────────────────────────────────────────────────────────────────────────────


// ─────────────────────────────────────────────────────────────────────────────
// Date helpers
// ─────────────────────────────────────────────────────────────────────────────

export function startOfMonth(date: Date = new Date()): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function startOfPrevMonth(date: Date = new Date()): Date {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
}

export function endOfPrevMonth(date: Date = new Date()): Date {
  return new Date(date.getFullYear(), date.getMonth(), 0, 23, 59, 59, 999);
}

/** Returns the first day of N months ago */
export function startOfMonthsAgo(n: number, date: Date = new Date()): Date {
  return new Date(date.getFullYear(), date.getMonth() - n, 1);
}

/** Short month label "Ene", "Feb" … for a Date */
export function shortMonth(date: Date): string {
  return new Intl.DateTimeFormat("es-AR", { month: "short" })
    .format(date)
    .replace(".", "")
    .replace(/^\w/, (c) => c.toUpperCase());
}

// ─────────────────────────────────────────────────────────────────────────────
// Aggregators over computed BusinessSummary[]
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// Expense category color map
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  Alquiler:   "#5b8def",
  Servicios:  "#1D9E75",
  Marketing:  "#BA7517",
  Seguros:    "#E24B4A",
  Logística:  "#9b59b6",
  Personal:   "#e67e22",
};

export function colorForCategory(category: string): string {
  return CATEGORY_COLORS[category] ?? "#888780";
}

// ─────────────────────────────────────────────────────────────────────────────
// Transformers: raw API data → UI types
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Builds one BusinessSummary from the raw pieces fetched for a single business.
 */
export function buildBusinessSummary(
  business: ApiBusiness,
  currentOrders: ApiOrder[],       // orders createdAt >= startOfMonth
  prevOrders: ApiOrder[],          // orders from previous month
  currentExpenses: ApiExpense[],   // expenses date >= startOfMonth
  inventory: ApiInventoryItem[],
  suppliers: ApiSupplier[],
  customers: ApiCustomer[]
): BusinessSummary {
  const monthlyRevenue  = currentOrders
    .filter((o) => o.status === "COMPLETED")
    .reduce((s, o) => s + o.total, 0);

  const prevMonthRevenue = prevOrders
    .filter((o) => o.status === "COMPLETED")
    .reduce((s, o) => s + o.total, 0);

  const monthlyExpenses = currentExpenses.reduce((s, e) => s + e.amount, 0);

  const pendingOrders  = currentOrders.filter((o) => o.status === "PENDING").length;
  const lowStockCount  = inventory.filter((i) => i.quantity <= i.minStock).length;

  return {
    id:              business.id,
    name:            business.name,
    slug:            business.slug,
    guests:          business.guests,
    monthlyRevenue,
    prevMonthRevenue,
    monthlyExpenses,
    pendingOrders,
    lowStockCount,
    activeSuppliers: suppliers.length,
    customerCount:   customers.length,
  };
}

/**
 * Builds the 6-month aggregated series from all orders + expenses across all businesses.
 */
export function buildMonthlySeries(
  allOrders: ApiOrder[],
  allExpenses: ApiExpense[],
  months = 6
): MonthlyPoint[] {
  const now = new Date();

  return Array.from({ length: months }, (_, i) => {
    const monthStart = startOfMonthsAgo(months - 1 - i, now);
    const monthEnd   = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0, 23, 59, 59);

    const revenue = allOrders
      .filter((o) => {
        const d = new Date(o.createdAt);
        return o.status === "COMPLETED" && d >= monthStart && d <= monthEnd;
      })
      .reduce((s, o) => s + o.total, 0);

    const expenses = allExpenses
      .filter((e) => {
        const d = new Date(e.date);
        return d >= monthStart && d <= monthEnd;
      })
      .reduce((s, e) => s + e.amount, 0);

    return { month: shortMonth(monthStart), revenue, expenses };
  });
}

/**
 * Picks the N most recent orders across all businesses, enriched with business name.
 */
export function buildRecentOrders(
  allOrders: ApiOrder[],
  businessMap: Record<string, string>, // businessId → businessName
  limit = 6
): RecentOrder[] {
  return [...allOrders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)
    .map((o) => ({
      id:           o.id,
      customerName: o.customer.name,
      businessName: businessMap[o.businessId] ?? "—",
      total:        o.total,
      status:       o.status,
      createdAt:    o.createdAt,
    }));
}

/**
 * Picks inventory items that are at or below minStock, sorted by severity (% remaining).
 */
export function buildStockAlerts(
  allInventory: ApiInventoryItem[],
  businessMap: Record<string, string>,
  limit = 5
): StockAlert[] {
  return allInventory
    .filter((i) => i.quantity <= i.minStock)
    .sort((a, b) => a.quantity / a.minStock - b.quantity / b.minStock)
    .slice(0, limit)
    .map((i) => ({
      productName:  i.product.name,
      businessName: businessMap[i.businessId] ?? "—",
      quantity:     i.quantity,
      minStock:     i.minStock,
    }));
}

/**
 * Groups expenses by category and assigns colors.
 */
export function buildExpenseByCategory(allExpenses: ApiExpense[]): CategoryExpense[] {
  const map: Record<string, number> = {};
  for (const e of allExpenses) {
    map[e.category] = (map[e.category] ?? 0) + e.amount;
  }
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .map(([category, amount]) => ({
      category,
      amount,
      color: colorForCategory(category),
    }));
}

/**
 * Builds the full DashboardData from raw API responses.
 * Called inside dashboard.service.ts after all fetches resolve.
 */
export function assembleDashboard(params: {
  user: ApiUser;
  businesses: ApiBusiness[];
  ordersByBusiness: Record<string, { current: ApiOrder[]; prev: ApiOrder[] }>;
  expensesByBusiness: Record<string, ApiExpense[]>;
  inventoryByBusiness: Record<string, ApiInventoryItem[]>;
  suppliersByBusiness: Record<string, ApiSupplier[]>;
  customersByBusiness: Record<string, ApiCustomer[]>;
}): DashboardData {
  const {
    user,
    businesses,
    ordersByBusiness,
    expensesByBusiness,
    inventoryByBusiness,
    suppliersByBusiness,
    customersByBusiness,
  } = params;

  const businessMap: Record<string, string> = Object.fromEntries(
    businesses.map((b) => [b.id, b.name])
  );

  const summaries = businesses.map((b) =>
    buildBusinessSummary(
      b,
      ordersByBusiness[b.id]?.current ?? [],
      ordersByBusiness[b.id]?.prev    ?? [],
      expensesByBusiness[b.id]        ?? [],
      inventoryByBusiness[b.id]       ?? [],
      suppliersByBusiness[b.id]       ?? [],
      customersByBusiness[b.id]       ?? []
    )
  );

  const allCurrentOrders  = businesses.flatMap((b) => ordersByBusiness[b.id]?.current ?? []);
  const allPrevOrders     = businesses.flatMap((b) => ordersByBusiness[b.id]?.prev    ?? []);
  const allOrders         = [...allCurrentOrders, ...allPrevOrders];
  const allExpenses       = businesses.flatMap((b) => expensesByBusiness[b.id]        ?? []);
  const allInventory      = businesses.flatMap((b) => inventoryByBusiness[b.id]       ?? []);

  // Need 6 months of orders → fetch window is already wide in the service
  return {
    user:   { id: user.id, name: user.name, email: user.email },
    businesses: summaries,
    monthlySeries:      buildMonthlySeries(allOrders, allExpenses),
    recentOrders:       buildRecentOrders(allCurrentOrders, businessMap),
    stockAlerts:        buildStockAlerts(allInventory, businessMap),
    expenseByCategory:  buildExpenseByCategory(allExpenses),
  };
}