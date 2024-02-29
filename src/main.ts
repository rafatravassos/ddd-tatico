import Address from "./domain/customer/value-object/address"
import Customer from "./domain/entity/customer"
import Order from "./domain/checkout/order";
import OrderItem from "./domain/entity/order_item";

let customer = new Customer("123", "Rafael")
const address = new Address("Rua dois", 2, "05022-000", "São Paulo")
customer.Address = address;
customer.activate();


