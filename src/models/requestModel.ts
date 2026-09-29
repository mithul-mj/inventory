import { IProduct } from "./Product";

export type CreateProductRequest = Pick<
  IProduct,
  "id" | "name" | "price" | "quantity"
>;
