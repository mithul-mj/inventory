import { IProduct } from "../models/Product";

export interface IProductService {
  createProduct(product: IProduct): Promise<IProduct>;

  getProducts(): Promise<IProduct[]>;

  getProduct(id: number): Promise<IProduct>;

  updateProduct(id: number, data: Partial<IProduct>): Promise<IProduct>;

  deleteProduct(id: number): Promise<void>;
}
