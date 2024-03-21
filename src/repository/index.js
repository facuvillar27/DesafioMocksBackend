import Products from "../dao/factory.js";
import ProductsRepository from "./Products.repository.js";

export const productService = new ProductsRepository(new Products());