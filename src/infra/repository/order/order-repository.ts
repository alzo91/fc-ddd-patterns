import { Address } from "../../../domain/entities/address";
import { Customer } from "../../../domain/entities/customer";
import { Order } from "../../../domain/entities/order";
import { OrderItem } from "../../../domain/entities/order_items";
import OrderRepositoryInterface from "../../../domain/repository/order-repository-interface";
import CustomerModel from "../../db/sequelize/model/customer-model";
import OrderItemModel from "../../db/sequelize/model/order-item-model";
import OrderModel from "../../db/sequelize/model/order-model";

export class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
  async update(entity: Order): Promise<void> {
    await OrderItemModel.destroy({
      where: { order_id: entity.id },
    });

    const mapped_items = entity.items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      product_id: item.productId,
      quantity: item.quantity,
      order_id: entity.id,
    }));

    await OrderItemModel.bulkCreate(mapped_items);

    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
      },
      {
        where: { id: entity.id },
      }
    );
  }
  async find(id: string): Promise<Order | null> {
    try {
      const found_order = await OrderModel.findOne({
        where: { id },
        include: ["items", "customer"],
        rejectOnEmpty: true,
      });

      // total: order_items.reduce((acc, item) => acc + item.total(),0),

      return new Order({
        customerId: found_order.customer_id,
        items: found_order.items.map(
          (item) =>
            new OrderItem({
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              productId: item.product_id,
              id: item.id,
            })
        ),
        id: found_order.id,
      });
    } catch (error) {
      throw new Error("Order could not found");
    }
  }
  async findAll(): Promise<Order[]> {
    const found_orders = await OrderModel.findAll({
      include: ["items", "customer"],
    });

    return found_orders.map(
      (order) =>
        new Order({
          id: order.id,
          customerId: order.customer_id,
          items: order.items.map(
            (item) =>
              new OrderItem({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                productId: item.product_id,
              })
          ),
        })
    );
  }
}
