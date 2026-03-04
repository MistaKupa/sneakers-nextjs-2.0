import { Database } from "./database.types";

export type Product = Database["public"]["Tables"]["sneakers"]["Row"];

export type ProductId = Product["id"];

export type ProductUpdate = Database["public"]["Tables"]["sneakers"]["Update"];

export type ProductInsert = Database["public"]["Tables"]["sneakers"]["Insert"];

export interface ProductInsertFormValues extends Omit<ProductInsert, "images"> {
  imageInput: FileList;
}
