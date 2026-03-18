import { Database } from "./database.types";

export type Product = Database["public"]["Tables"]["sneakers"]["Row"];

export type ProductId = Product["id"];
export type ProductDetailsPublic = Omit<
  Product,
  "category" | "collection" | "tags" | "stock" | "created_at" | "availability"
>;
export type ProductPriceDetails = Pick<Product, "price" | "discount">;

export type ProductImages = Product["images"];

/////////////////////// SIZES //////////////////////////
export type ProductSizes =
  Database["public"]["Tables"]["sneakers_sizes"]["Row"];

export type ProductSizeAndQuantity = Pick<ProductSizes, "size" | "quantity">;

export type ProductSize = ProductSizes["size"];

/////////////////////// UPDATE /////////////////////////

export type ProductUpdate = Database["public"]["Tables"]["sneakers"]["Update"];

/////////////////////// INSERT /////////////////////////

export type ProductInsert = Database["public"]["Tables"]["sneakers"]["Insert"];

export interface ProductInsertFormValues extends Omit<ProductInsert, "images"> {
  imageInput: FileList;
}

///////////////////////  /////////////////////////

export type SearchParams = Promise<
  Record<string, string | string[] | undefined>
>;

export type SortOptions = "Name A-Z" | "Name Z-A" | "Price A-Z" | "Price Z-A";
