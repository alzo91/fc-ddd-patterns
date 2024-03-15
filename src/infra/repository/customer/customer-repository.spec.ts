import { Sequelize } from "sequelize-typescript";

import CustomerModel from "../../db/sequelize/model/customer-model";
import { CustomerRepository } from "./customer-repository";
import { Customer } from "../../../domain/entities/customer";
import { Address } from "../../../domain/entities/address";

describe("Customer repository test", () => {
  let sequelize: Sequelize;
  let customerRepository: CustomerRepository;

  beforeAll(() => {
    customerRepository = new CustomerRepository();
  });
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customer = new Customer({ id: "012345", name: "Customer 001" });
    const address = new Address({
      city: "City 001",
      state: "SP",
      zip_code: "Zipcode 001",
      neighborhood: "Neighborhood",
      street: "Street 001",
    });
    customer.changeAddress(address);
    customer.activate();
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: customer.id },
    });

    expect(customerModel?.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive,
      rewardPoints: customer.rewards_points,
      street: address.street,
      zipcode: address.zip_code,
      city: address.city,
      neighborhood: address.neighborhood,
      state: address.state,
    });
  });

  it("should update a customer", async () => {
    const customer = new Customer({ id: "012345", name: "Customer 001" });
    const address = new Address({
      city: "City 001",
      state: "SP",
      zip_code: "Zipcode 001",
      neighborhood: "Neighborhood",
      street: "Street 001",
    });
    customer.changeAddress(address);
    customer.activate();

    await customerRepository.create(customer);

    customer.changeName("Customer 002");
    customer.activate();
    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: "012345" },
    });

    expect(customerModel?.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive,
      rewardPoints: customer.rewards_points,
      zipcode: address.zip_code,
      state: address.state,
      city: address.city,
      neighborhood: address.neighborhood,
      street: address.street,
    });
  });

  it("should find a customer", async () => {
    const customer = new Customer({ id: "012345", name: "Customer 001" });
    const address = new Address({
      city: "City 001",
      state: "SP",
      zip_code: "Zipcode 001",
      neighborhood: "Neighborhood",
      street: "Street 001",
    });
    customer.changeAddress(address);
    customer.activate();
    await customerRepository.create(customer);

    const customerResult = await customerRepository.find(customer.id);

    expect(customer).toStrictEqual(customerResult);
  });

  it("should throw an error when customer is not found", async () => {
    expect(async () => {
      await customerRepository.find("456ABC");
    }).rejects.toThrow("Customer not found");
  });

  it("should find all customers", async () => {
    const customer1 = new Customer({ id: "012345", name: "Customer 001" });
    const address1 = new Address({
      city: "City 001",
      state: "SP",
      zip_code: "Zipcode 001",
      neighborhood: "Neighborhood",
      street: "Street 001",
    });

    customer1.Address = address1;
    customer1.addRewards(10);
    customer1.activate();

    const customer2 = new Customer({ id: "567890", name: "Customer 002" });
    const address2 = new Address({
      city: "City 002",
      state: "MG",
      zip_code: "Zipcode 002",
      neighborhood: "Neighborhood",
      street: "Street 002",
    });
    customer2.Address = address2;
    customer2.addRewards(20);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer1);
    expect(customers).toContainEqual(customer2);
  });
});
