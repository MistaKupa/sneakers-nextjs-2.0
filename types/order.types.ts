import { Database } from "./database.types";

export type Order = Database["public"]["Tables"]["orders"]["Row"];

export type OrderId = Order["id"];
export type OrderStatus = Order["status"];

export type OrderUpdate = Database["public"]["Tables"]["orders"]["Update"];

export type OrderProduct = Database["public"]["Tables"]["order_items"]["Row"];

export type OrderItemsCardProp = Pick<
  OrderProduct,
  | "product_id"
  | "quantity"
  | "price_at_time"
  | "product_name"
  | "product_image"
  | "product_size"
>;

////////////////////// ORDER PAYLOAD //////////////////

export interface OrderPayload {
  order: {
    adress: {
      email: string;
      name: string;
      country: string;
      city: string;
      street: string;
      postal: string;
      phone: string;
    };
    total_price: number;
    paid: boolean;
    products_total_quantity: number;
    products: {
      productId: number;
      productName: string;
      productImage: string;
      productSize: string;
      quantity: number;
      price: number;
    }[];
  };
}
