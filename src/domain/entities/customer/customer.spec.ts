import { Customer } from "./index";
import { Address } from "../address";

describe("Customer", () => {
  it("should create a customer with valid properties", () => {
    const customer = new Customer({
      name: "John Doe Company",
      address: new Address({
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip_code: "12345",
        neighborhood: "Anytown",
      }),
    });

    expect(customer).toBeInstanceOf(Customer);
    expect(customer.name).toBe("John Doe Company");
    expect(customer.address).toBeDefined();
    expect(customer.isActive).toBe(false);
  });

  it("should not create a customer with an invalid name", () => {
    expect(() => {
      new Customer({
        name: "J",
        address: new Address({
          street: "123 Main St",
          city: "Anytown",
          state: "CA",
          zip_code: "12345",
          neighborhood: "Anytown",
        }),
      });
    }).toThrow("Name should be greater than 10 chars");
  });

  it("should not create a customer with an invalid id", () => {
    expect(() => {
      new Customer({
        id: "J1",
        name: "John Doe Company",
        address: new Address({
          street: "123 Main St",
          city: "Anytown",
          state: "CA",
          zip_code: "12345",
          neighborhood: "Anytown",
        }),
      });
    }).toThrow("Id should be greater than 5 chars");
  });

  it("should change the customer's name", () => {
    const customer = new Customer({
      name: "John Doe company",
      address: new Address({
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip_code: "12345",
        neighborhood: "Anytown",
      }),
    });

    customer.changeName("Jane Doe Company");

    expect(customer.name).toBe("Jane Doe Company");
  });

  it("should not change the customer's name to an invalid value", () => {
    const customer = new Customer({
      name: "John Doe Company",
      address: new Address({
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip_code: "12345",
        neighborhood: "Anytown",
      }),
    });

    expect(() => {
      customer.changeName("J");
    }).toThrow("Name should be greater than 10 chars");
  });

  it("should activate the customer", () => {
    const customer = new Customer({
      name: "John Doe Company",
    });

    const address = new Address({
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip_code: "12345",
      neighborhood: "Anytown",
    });
    customer.changeAddress(address);
    customer.activate();

    expect(customer.isActive).toBe(true);
  });

  it("should not activate the customer without an address", () => {
    const customer = new Customer({
      name: "John Doe Company",
    });

    expect(() => {
      customer.activate();
    }).toThrow("Address is mandatory to activate customer");
  });

  it("should deactivate the customer", () => {
    const customer = new Customer({
      name: "John Doe Company",
      address: new Address({
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip_code: "12345",
        neighborhood: "Anytown",
      }),
    });

    customer.activate();
    customer.deactivate();

    expect(customer.isActive).toBe(false);
  });

  it("should serialize the customer to JSON", () => {
    const customer = new Customer({
      name: "John Doe Company",
      address: new Address({
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip_code: "12345",
        neighborhood: "Anytown",
      }),
    });

    customer.activate();

    const json = customer.toJSON();

    expect(json).toEqual({
      id: expect.any(String),
      name: customer.name,
      address: customer.address,
      active: true,
    });
  });

  it("should be able to add rewards points", () => {
    const customer = new Customer({
      name: "John Doe Company",
      address: new Address({
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip_code: "12345",
        neighborhood: "Anytown",
      }),
    });
    expect(customer.rewards_points).toBe(0);
    customer.activate();

    customer.addRewards(100);
    expect(customer.rewards_points).toBe(100);

    customer.addRewards(100);
    expect(customer.rewards_points).toBe(200);
  });
});
