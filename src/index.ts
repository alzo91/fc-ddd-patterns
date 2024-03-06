import { Address } from "./Entities/address";
import { Customer } from "./Entities/customer";

let customer = new Customer("uuid-0001", "Lavínia Zotarelli");
console.log(JSON.stringify({ customer }));
let address = new Address({
  city: "Campinas",
  neighborhood: "Jd. Samambaia",
  state: "SP",
  street: "Vitor Meirelles",
  zip_code: "13046-545",
});
customer.updateAddress(address);
customer.activate();
console.log(JSON.stringify({ customer }));
