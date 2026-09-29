import { IProductRepository } from "../interfaces/IProductRepository";
import { IProductService } from "../interfaces/IProductService";
import { IProduct } from "../models/Product";

export class ProductService implements IProductService {
  constructor(private repository: IProductRepository) {}

  async createProduct(product: IProduct): Promise<IProduct> {
    const existingProduct = await this.repository.findById(product.id);

    if (existingProduct) {
      throw new Error("Product already exists");
    }

    return await this.repository.create(product);
  }

  async getProducts(): Promise<IProduct[]> {
    return await this.repository.findAll();
  }

  async getProduct(id: number): Promise<IProduct> {
    const product = await this.repository.findById(id);

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }

  async updateProduct(id: number, data: Partial<IProduct>): Promise<IProduct> {
    const product = await this.repository.update(id, data);

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    const deleted = await this.repository.delete(id);

    if (!deleted) {
      throw new Error("Product not found");
    }
  }
}
