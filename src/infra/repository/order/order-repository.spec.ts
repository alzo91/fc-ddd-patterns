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

  it("should find order by uuid", async () => {
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
    const found_order = await orderRepository.find(order.id);

    expect(found_order.toJSON()).toStrictEqual(order.toJSON());
  });

  it("should not find an order if uuid does not exit", async () => {
    expect(async () => {
      await orderRepository.find("testing-find-order");
    }).rejects.toThrow("Order could not found");
  });

  it("should be able to list all orders", async () => {
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

    const product1 = new Product({ name: "Mouse", price: 15.9 });
    await productRepository.create(product1);

    const product2 = new Product({ name: "Keyboard", price: 25.9 });
    await productRepository.create(product2);

    const orderItem1 = new OrderItem({
      name: product1.name,
      quantity: 1,
      price: product1.price,
      productId: product1.id,
    });

    const orderItem2 = new OrderItem({
      name: product1.name,
      quantity: 1,
      price: product1.price,
      productId: product1.id,
    });

    const order1 = new Order({ customerId: customer.id, items: [orderItem1] });
    const order2 = new Order({ customerId: customer.id, items: [orderItem2] });

    const orders = [order1, order2];

    await orderRepository.create(order1);
    await orderRepository.create(order2);

    const found_orders = await orderRepository.findAll();

    expect(found_orders[0].toJSON()).toStrictEqual(orders[0].toJSON());
    expect(found_orders[1].toJSON()).toStrictEqual(orders[1].toJSON());
  });

  it("should be abel to update an existing order", async () => {
    const customer = new Customer({ name: "John Customer 001" });
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

    const product = new Product({ name: "Mouse", price: 20 });
    await productRepository.create(product);

    const orderItem = new OrderItem({
      name: product.name,
      quantity: 1,
      price: product.price,
      productId: product.id,
    });

    const order = new Order({ customerId: customer.id, items: [orderItem] });
    await orderRepository.create(order);

    const product2 = new Product({ name: "Keyboard", price: 40 });
    await productRepository.create(product2);
    const orderItem2 = new OrderItem({
      name: product2.name,
      quantity: 1,
      price: product2.price,
      productId: product2.id,
    });
    order.addItem(orderItem2);

    await orderRepository.update(order);
    const updated_order = await orderRepository.find(order.id);

    expect(updated_order.items.length).toEqual(order.items.length);
    expect(updated_order.total()).toEqual(order.total());
  });
});
