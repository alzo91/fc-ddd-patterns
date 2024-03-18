import { Sequelize } from "sequelize-typescript";
// Repositories
import { CustomerRepository } from "../customer/customer-repository";
import { ProductRepository } from "../product/product-repository";
import { OrderRepository } from "./order-repository";
// Infrastructure Models
import ProductModel from "../../db/sequelize/model/product-model";
import CustomerModel from "../../db/sequelize/model/customer-model";
import OrderModel from "../../db/sequelize/model/order-model";
import OrderItemModel from "../../db/sequelize/model/order-item-model";
// Domain
import { Customer } from "../../../domain/entities/customer";
import { Address } from "../../../domain/entities/address";
import { Product } from "../../../domain/entities/product";
import { OrderItem } from "../../../domain/entities/order_items";
import { Order } from "../../../domain/entities/order";
import { db_sequelize_options_for_test } from "../../db/sequelize/db-sequelize-options-for-test";
describe("Customer repository test", () => {
  let sequelize: Sequelize;
  let customerRepository: CustomerRepository;
  let productRepository: ProductRepository;
  let orderRepository: OrderRepository;

  beforeEach(async () => {
    sequelize = new Sequelize({
      ...db_sequelize_options_for_test,
    });

    await sequelize.addModels([
      CustomerModel,
      ProductModel,
      OrderItemModel,
      OrderModel,
    ]);
    await sequelize.sync();

    customerRepository = new CustomerRepository();
    productRepository = new ProductRepository();
    orderRepository = new OrderRepository();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customer = new Customer({ name: "John Customer 001" });
    const address = new Address({
      city: "City 001",
      state: "SP",
      zip_code: "Zipcode 001",
      neighborhood: "Neighborhood",
      street: "Street 001",
    });

    customer.changeAddress(address);
    await customerRepository.create(customer);

    const product = new Product({ name: "Mouse", price: 20.9 });
    await productRepository.create(product);

    const orderItem = new OrderItem({
      name: product.name,
      quantity: 1,
      price: product.price,
      productId: product.id,
    });

    const order = new Order({ customerId: customer.id, items: [orderItem] });

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: orderItem.productId,
        },
      ],
    });
  });
});
