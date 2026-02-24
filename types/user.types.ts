import { Database } from "./database.types";

export type User = Database["public"]["Tables"]["profiles"]["Row"];

export type UserCardData = Pick<
  User,
  "user_id" | "display_name" | "email" | "user_phone" | "gender" | "role"
>;
export type UserId = User["user_id"];
