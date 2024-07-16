import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "John Smith");
        }
        ).toThrowError("customer: The ID is required.");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "");
        }
        ).toThrowError("customer: The name is required.");
    });

    it("Should throw error when name and id are empty", () => {
        expect(() => {
            let customer = new Customer("", "");
        }
        ).toThrowError("customer: The ID is required.,customer: The name is required.");

    });

    it("should change name", () => {
        const customer = new Customer("123", "John Smith");
        customer.changeName("Jane");
        expect(customer.name).toBe("Jane");
    });

    it("should activate customer", () => {
        const customer = new Customer("1", "Customer 1");
        const address = new Address("street 1", 1, "02250000", "city 1");
        customer.Address = address;
        customer.activate()
        expect(customer.isActive()).toBe(true);
    });

    it("should deactivate customer", () => {
        const customer = new Customer("1", "Customer 1");
        customer.deactivate()
        expect(customer.isActive()).toBe(false);
    });

    it("should throw error when address is undefined", () => {
        expect(() => {
            const customer = new Customer("1", "Customer 1");
            customer.activate()
        }).toThrowError("Address is mandatory to activate the customer");;
    });
})