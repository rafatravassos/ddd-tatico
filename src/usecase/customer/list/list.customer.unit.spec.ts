import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
    "John Smith",
    new Address("Street 1", 10, "11065", "Santos")
);

const customer2 = CustomerFactory.createWithAddress(
    "Jane Smith",
    new Address("Street 2", 20, "21065", "Praia")
);

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        
    }
}

describe("Unit test form lis customer use case", () => {
    it("Should list a customer", async () => {
        const repository = MockRepository();
        const useCase = new ListCustomerUseCase(repository);
        const output = await useCase.execute({});
        
        expect(output.customers.length).toBe(2);
        
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.Address.street);
        expect(output.customers[0].address.number).toBe(customer1.Address.number);
        expect(output.customers[0].address.zip).toBe(customer1.Address.zip);
        expect(output.customers[0].address.city).toBe(customer1.Address.city);

        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.Address.street);
        expect(output.customers[1].address.number).toBe(customer2.Address.number);
        expect(output.customers[1].address.zip).toBe(customer2.Address.zip);
        expect(output.customers[1].address.city).toBe(customer2.Address.city);

    })
}
)