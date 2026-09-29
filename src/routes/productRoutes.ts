import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

export function createProductRoutes(controller: ProductController): Router {
  const router = Router();

  router.post("/products", controller.create);

  router.get("/products", controller.getAll);

  router.get("/products/:id", controller.getById);

  router.put("/products/:id", controller.update);

  router.delete("/products/:id", controller.delete);

  return router;
}
