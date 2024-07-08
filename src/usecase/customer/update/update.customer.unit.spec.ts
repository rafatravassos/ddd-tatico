import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress("John", 
    new Address("Street 1", 10, "11065", "Santos")
);


const input = {
    id: customer.id,
    name: "Name updated",
    address: {
        street: "Street Updated",
        number: 1234,
        zip: "updated",
        city: "SP updated"
    }
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        update: jest.fn(),
    }
}

describe("Unit test for customer update use case", () => {
    it("Should update customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);
        expect(output).toEqual(input);
    });
});