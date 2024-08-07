import { v4 as uuid } from "uuid";
import OrderFactory from "./order.factory";

describe("Order factory unit test", () => {
  it("Shoud create an order", () => {
    const orderProps = {
      id: uuid(),
      customerId: uuid(),
      items: [{ 
        id: uuid(), 
        name: "Product 1", 
        price: 100,
        quantity: 1, 
        productId: uuid(),
        }],
    };


    const order = OrderFactory.create(orderProps);
    expect(order.id).toEqual(orderProps.id);
    expect(order.customerId).toEqual(orderProps.customerId);
    expect(order.items.length).toEqual(1);
  });
});
