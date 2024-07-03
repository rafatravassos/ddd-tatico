import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit tests", () => {
    it("should create a customer", () => {
        const customer = CustomerFactory.create("Customer 1");
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer 1");
        expect(customer.Address).toBeUndefined();
        expect(customer.constructor.name).toBe("Customer");
    });

    it("Should create a customer with an address", () => {
        const address = new Address("Street 1", 10, "11065", "Santos");
        let customer = CustomerFactory.createWithAddress("John", address);
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.Address).toBe(address);
        expect(customer.constructor.name).toBe("Customer");
    })
});