import { Database } from "./database.types";

export type Product = Database["public"]["Tables"]["sneakers"]["Row"];

export type ProductId = Product["id"]

export type ProductUpdate = Database["public"]["Tables"]["sneakers"]["Update"]
