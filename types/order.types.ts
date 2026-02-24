import { Database } from "./database.types";

export type Order = Database["public"]["Tables"]["orders"]["Row"];

export type OrderId = Order["id"];
export type OrderStatus = Order["status"];

export type OrderUpdate = Database["public"]["Tables"]["orders"]["Update"];

export type OrderProduct = Database["public"]["Tables"]["order_items"]["Row"];
