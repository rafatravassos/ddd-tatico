import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "123", []);
        }
        ).toThrowError("Id is required")
    });

    it("should throw error when Customer id is empty", () => {
        expect(() => {
            let order = new Order("123", "", []);
        }
        ).toThrowError("CustomerId is required")
    });

    it("should throw error when items is empty", () => {
        expect(() => {
            let order = new Order("123", "123", []);
        }
        ).toThrowError("item qtd must be greater than zero")
    });

    it("should calculate total", () => {
        const item = new OrderItem("i1", "item 1", 100, "p1", 2);
        const order = new Order("123","123", [item]);
        expect(order.total()).toBe(200);

        const item2 = new OrderItem("i2", "item 2",  200, "p2", 2 );
        const order2 = new Order("123", "123", [item, item2]);
        expect(order2.total()).toBe(600);
    })
    it("should check if qty is greater than zero", () => {
        expect (() => {
            const item = new OrderItem("i1", "item 1", 100, "p1", -1);    
            const order = new Order("123","123", [item]);
        }).toThrowError("Quantity must be greater than zero");

    })})