import { Customer } from "../entities/customer";
import { RepositoryInterface } from "./repository-interface";

export abstract class CustomerRepositoryInterface extends RepositoryInterface<Customer> {}
