import { Database } from "./database.types";

export type Collection = Database["public"]["Tables"]["collections"]["Row"];

export type CollectionId = Collection["id"];
