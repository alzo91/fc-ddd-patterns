import { Product } from "../entities/product";
import { RepositoryInterface } from "./repository-interface";

export abstract class ProductRepositoryInterface extends RepositoryInterface<Product> {}
