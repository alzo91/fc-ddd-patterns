import { Address } from "./entities/address";
import { Customer } from "./entities/customer";
import { Order } from "./entities/order";
import { OrderItem } from "./entities/order_items";

let customer = new Customer({ name: "Lavínia Zotarelli de Oliveira" });
console.log(JSON.stringify({ customer }));
let address = new Address({
  city: "Campinas",
  neighborhood: "Jd. Samambaia",
  state: "SP",
  street: "Vitor Meirelles",
  zip_code: "13046-545",
});

customer.Address = address;
customer.activate();
console.log(JSON.stringify({ customer }));

const item_one = new OrderItem({
  name: "mouse",
  quantity: 2,
  price: 10.9,
  productId: "product_uuid_001",
});
const item_two = new OrderItem({
  name: "pencil",
  quantity: 4,
  price: 2.5,
  productId: "product_uuid_002",
});

const order = new Order({
  customerId: customer.id,
  items: [item_one, item_two],
});

console.log(JSON.stringify(order));
