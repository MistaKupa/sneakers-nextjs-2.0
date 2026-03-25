import { Database } from "./database.types";

export type Review = Database["public"]["Tables"]["reviews"]["Row"];

export type ReviewInsert = Database["public"]["Tables"]["reviews"]["Insert"];
