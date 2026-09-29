import { IProduct } from "../models/Product";

export interface IProductRepository {
  create(product: IProduct): Promise<IProduct>;

  findAll(): Promise<IProduct[]>;

  findById(id: number): Promise<IProduct | null>;

  update(id: number, data: Partial<IProduct>): Promise<IProduct | null>;

  delete(id: number): Promise<boolean>;
}
