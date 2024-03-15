import { Address } from "../../../domain/entities/address";
import { Customer } from "../../../domain/entities/customer";
import { CustomerRepositoryInterface } from "../../../domain/repository/customer-repository-interface";
import CustomerModel from "../../db/sequelize/model/customer-model";

export class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    console.log(entity.toJSON());
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      active: entity.isActive,
      street: entity.address?.street,
      zipcode: entity.address?.zip_code,
      city: entity.address?.city,
      neighborhood: entity.address?.neighborhood,
      rewardPoints: entity.rewards_points,
      state: entity.address?.state,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        active: entity.isActive,
        zipcode: entity.address?.zip_code,
        state: entity.address?.state,
        neighborhood: entity.address?.neighborhood,
        street: entity.address?.street,
        city: entity.address?.city,
        rewardPoints: entity.rewards_points,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Customer not found");
    }

    const customer = new Customer({ id, name: customerModel.name });
    const address = new Address({
      city: customerModel.city,
      state: customerModel.state,
      zip_code: customerModel.zipcode,
      neighborhood: customerModel.neighborhood,
      street: customerModel.street,
    });

    customer.changeAddress(address);
    customer.activate();
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();

    const customers = customerModels.map((customerModels) => {
      let customer = new Customer({
        id: customerModels.id,
        name: customerModels.name,
      });
      customer.addRewards(customerModels.rewardPoints);
      const address = new Address({
        city: customerModels.city,
        state: customerModels.state,
        zip_code: customerModels.zipcode,
        neighborhood: customerModels.neighborhood,
        street: customerModels.street,
      });

      customer.changeAddress(address);
      if (customerModels.active) {
        customer.activate();
      }
      return customer;
    });

    return customers;
  }
}
