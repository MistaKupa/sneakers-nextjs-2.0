import { Database } from "./database.types";

export type User = Database["public"]["Tables"]["profiles"]["Row"];

export type UserId = User["user_id"];
export type UserCardData = Pick<
  User,
  "user_id" | "display_name" | "email" | "user_phone" | "gender" | "role"
>;

export type UserBasicInfo = Pick<User, "display_name" | "user_phone" | "email">;
export type UserIdentityAccess = Pick<User, "gender" | "role">;
export type UserPersonalDetails = Pick<User, "birth_date" | "display_name">;

export type UserUpdate = Database["public"]["Tables"]["profiles"]["Update"];
