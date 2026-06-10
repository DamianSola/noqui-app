export type DashboardTab = "financiero" | "operaciones" | "negocios";

export interface BusinessSummary {
  id: string;
  name: string;
  slug: string;
  monthlyRevenue: number;
  monthlyExpenses: number;
  prevMonthRevenue: number;
  pendingOrders: number;
  lowStockCount: number;
  activeSuppliers: number;
  customerCount: number;
  guests: string[];
}

export interface BusinessRawResult {
  currentOrders: ApiOrder[];
  prevOrders: ApiOrder[];
  expenses: ApiExpense[];
  inventory: ApiInventoryItem[];
  suppliers: ApiSupplier[];
  customers: ApiCustomer[];
}

export interface DashboardData {
  user: {
    id: string;
    name: string | null;
    email: string;
  };
  businesses: BusinessSummary[];
  monthlySeries: MonthlyPoint[];
  recentOrders: RecentOrder[];
  stockAlerts: StockAlert[];
  expenseByCategory: CategoryExpense[];
}

export interface MonthlyPoint {
  month: string;
  revenue: number;
  expenses: number;
}

export interface RecentOrder {
  id: string;
  customerName: string;
  businessName: string;
  total: number;
  status: "PENDING" | "COMPLETED" | "CANCELED";
  createdAt: string;
}

export interface StockAlert {
  productName: string;
  businessName: string;
  quantity: number;
  minStock: number;
}

export interface CategoryExpense {
  category: string;
  amount: number;
  color: string;
}
// ─────────────────────────────────────────────────────────────────────────────
// UI / computed types (lo que usa el componente)
// ─────────────────────────────────────────────────────────────────────────────

// export type DashboardTab = "financiero" | "operaciones" | "negocios";

// export interface BusinessSummary {
//   id: string;
//   name: string;
//   slug: string;
//   monthlyRevenue: number;
//   monthlyExpenses: number;
//   prevMonthRevenue: number;
//   pendingOrders: number;
//   lowStockCount: number;
//   activeSuppliers: number;
//   customerCount: number;
//   guests: string[];
// }

// export interface DashboardData {
//   user: {
//     id: string;
//     name: string | null;
//     email: string;
//   };
//   businesses: BusinessSummary[];
//   monthlySeries: MonthlyPoint[];
//   recentOrders: RecentOrder[];
//   stockAlerts: StockAlert[];
//   expenseByCategory: CategoryExpense[];
// }

// export interface MonthlyPoint {
//   month: string;       // "Ene", "Feb", ...
//   revenue: number;
//   expenses: number;
// }

// export interface RecentOrder {
//   id: string;
//   customerName: string;
//   businessName: string;
//   total: number;
//   status: "PENDING" | "COMPLETED" | "CANCELED";
//   createdAt: string;
// }

// export interface StockAlert {
//   productName: string;
//   businessName: string;
//   quantity: number;
//   minStock: number;
// }

// export interface CategoryExpense {
//   category: string;
//   amount: number;
//   color: string;
// }

// ─────────────────────────────────────────────────────────────────────────────
// Raw API response types (lo que devuelve Express)
// ─────────────────────────────────────────────────────────────────────────────

export interface ApiUser {
  id: string;
  name: string | null;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: string;
}

export interface ApiBusiness {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  guests: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiOrder {
  id: string;
  customerId: string;
  businessId: string;
  subtotal: number;
  taxAmount: number;
  total: number;
  status: "PENDING" | "COMPLETED" | "CANCELED";
  createdAt: string;
  updatedAt: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
}

export interface ApiExpense {
  id: string;
  businessId: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export interface ApiInventoryItem {
  id: string;
  productId: string;
  businessId: string;
  quantity: number;
  minStock: number;
  product: {
    id: string;
    name: string;
    sku: string | null;
  };
}

export interface ApiSupplier {
  id: string;
  name: string;
  businessId: string;
  createdAt: string;
}

export interface ApiCustomer {
  id: string;
  name: string;
  email: string;
  businessId: string;
}