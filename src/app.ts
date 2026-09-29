import express from "express";
import "dotenv/config";

import { Database } from "./config/database";
import { ProductRepository } from "./repositories/ProductRepository";
import { ProductService } from "./services/ProductService";
import { ProductController } from "./controllers/ProductController";
import { createProductRoutes } from "./routes/productRoutes";

async function bootstrap() {
  const app = express();

  app.use(express.json());

  // Database
  const database = new Database();
  await database.connect();

  // Dependency Injection
  const repository = new ProductRepository();

  const service = new ProductService(repository);

  const controller = new ProductController(service);

  // Routes
  app.use(createProductRoutes(controller));

  const port = Number(process.env.PORT) || 3000;

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

bootstrap().catch(console.error);
