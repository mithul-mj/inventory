import { Product, IProduct } from "../models/Product";
import { IProductRepository } from "../interfaces/IProductRepository";

export class ProductRepository implements IProductRepository {
  async create(product: IProduct): Promise<IProduct> {
    const newProduct = await Product.create(product);

    return newProduct;
  }

  async findAll(): Promise<IProduct[]> {
    return await Product.find();
  }

  async findById(id: number): Promise<IProduct | null> {
    return await Product.findOne({ id });
  }

  async update(id: number, data: Partial<IProduct>): Promise<IProduct | null> {
    return await Product.findOneAndUpdate(
      { id },
      { $set: data },
      { new: true },
    );
  }

  async delete(id: number): Promise<boolean> {
    const result = await Product.deleteOne({ id });

    return result.deletedCount === 1;
  }
}
