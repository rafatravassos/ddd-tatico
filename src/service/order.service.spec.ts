import Order from "../entity/order";
import OrderItem from "../entity/order_item"
import OrderService from "./order.service";

describe("Order service unit tests", () => {
    
    it("Should get total of all orders", () => {

        const item1 = new OrderItem("i1", "Item 1", 100, "Produto 1", 1);
        const item2 = new OrderItem("i2", "Item 2", 200, "Produto 2", 2);
        const order = new Order("o1", "c1", [item1]);
        const order2 = new Order("o1", "c1", [item2]);

        const total = OrderService.total([order, order2]);

        expect(total).toBe(500);

    })
})