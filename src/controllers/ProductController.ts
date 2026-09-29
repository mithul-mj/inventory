import { Request, Response } from "express";

import { IProductService } from "../interfaces/IProductService";
import { ApiResponse } from "../interfaces/ApiResponse";

import { IProduct } from "../models/Product";
import { CreateProductRequest } from "../models/requestModel";
import { ProductResponse } from "../models/responseModel";

export class ProductController {
  constructor(private service: IProductService) {}

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const body: CreateProductRequest = req.body;

      const { id, name, price, quantity } = body;

      // Runtime validation
      if (
        typeof id !== "number" ||
        typeof name !== "string" ||
        typeof price !== "number" ||
        typeof quantity !== "number"
      ) {
        res.status(400).json({
          success: false,
          message: "Invalid product data",
        });

        return;
      }

      const product: IProduct = {
        id,
        name,
        price,
        quantity,
      };

      const result = await this.service.createProduct(product);

      const response: ApiResponse<ProductResponse> = {
        success: true,
        data: result,
      };

      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  };

  getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const products = await this.service.getProducts();

      const response: ApiResponse<ProductResponse[]> = {
        success: true,
        data: products,
      };

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);

      const product = await this.service.getProduct(id);

      const response: ApiResponse<ProductResponse> = {
        success: true,
        data: product,
      };

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);

      const product = await this.service.updateProduct(id, req.body);

      const response: ApiResponse<ProductResponse> = {
        success: true,
        data: product,
      };

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);

      await this.service.deleteProduct(id);

      const response: ApiResponse<null> = {
        success: true,
        data: null,
        message: "Product deleted",
      };

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  };
}
