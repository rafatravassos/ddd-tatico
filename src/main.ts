import Address from "./entity/address"
import Customer from "./entity/customer"
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

let customer = new Customer("123", "Rafael")
const address = new Address("Rua dois", 2, "05022-000", "São Paulo")
customer.Address = address;
customer.activate();


