import { Database } from "./database.types";

export type Collection = Database["public"]["Tables"]["collections"]["Row"];

export type CollectionId = Collection["id"];
export type CollectionDetail = Pick<Collection, "id" | "image_url" | "name">;
