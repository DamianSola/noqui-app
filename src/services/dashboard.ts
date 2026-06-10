import type { DashboardData,
  ApiBusiness,
  ApiOrder,
  ApiExpense,
  ApiInventoryItem,
  ApiSupplier,
  ApiCustomer,
  ApiUser, BusinessRawResult } from "@/types/dashboard";

import { Business } from "@/types/business";
import { assembleDashboard,
  startOfMonth,
  startOfPrevMonth,
  endOfPrevMonth,
  startOfMonthsAgo, } 
from "@/helpers/dashboard";

import { getCurrentUser } from "@/services/authService";
import { businessService } from "@/services/business";




export async function getDashboardData(): Promise<DashboardData> {

    const businessesData = await businessService.getAll();
    
    const businesses = businessesData 


    const user = await getCurrentUser();

  if(!user) {
    alert("No se pudo obtener la información del usuario. Por favor, inicia sesión nuevamente.");
   
  }
   
  console.log(businesses);

  if (businesses.length === 0) {
    return {
      user:   { id: user.id, name: user.name, email: user.email },
      businesses:        [],
      monthlySeries:     [],
      recentOrders:      [],
      stockAlerts:       [],
      expenseByCategory: [],
    };
  }
 
  // Step 2 — all businesses in parallel
  // @ts-expect-error
  const rawResults: BusinessRawResult = await Promise.all(
    businesses.map((b) => businessService.getById(b.id))
  );
 
  // Step 3 — shape into the map format assembleDashboard expects
  const ordersByBusiness:   Record<string, { current: ApiOrder[]; prev: ApiOrder[] }> = {};
  const expensesByBusiness: Record<string, ApiExpense[]>       = {};
  const inventoryByBusiness:Record<string, ApiInventoryItem[]> = {};
  const suppliersByBusiness:Record<string, ApiSupplier[]>      = {};
  const customersByBusiness:Record<string, ApiCustomer[]>      = {};
 
  businesses.forEach((b:Business, i:number) => {
    // @ts-expect-error
    const r= rawResults[i];
    ordersByBusiness[b.id]    = { current: r.currentOrders, prev: r.prevOrders };
    expensesByBusiness[b.id]  = r.expenses;
    inventoryByBusiness[b.id] = r.inventory;
    suppliersByBusiness[b.id] = r.suppliers;
    customersByBusiness[b.id] = r.customers;
  });
 
  return assembleDashboard({
    user,
    businesses,
    ordersByBusiness,
    expensesByBusiness,
    inventoryByBusiness,
    suppliersByBusiness,
    customersByBusiness,
  });
}


// interface Business {
//   id: string;
//   name: string;
//   // otras propiedades...
// }

interface RawResult {
  currentOrders: number;
  prevOrders: number;
  expenses: number;
  inventory: number;
  suppliers: number;
  customers: number;
}