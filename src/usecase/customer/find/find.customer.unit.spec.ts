import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../domain/infrastructure/customer/repository/sequilize/customer.model";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "john");
const address = new Address("Streeet", 123, "123", "SP")
customer.changeAddress(address);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}
describe("Unit Test find customer use case", () => {
    let sequelize: Sequelize;
    beforeEach(async() => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        })
        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });
    
    afterEach(async() => {
        await sequelize.close();
        });

    it("Should find a customer", async () => {
        const customerRepository = MockRepository();
        const useCase = new FindCustomerUseCase(customerRepository);
        await customerRepository.create(customer);

        const input = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "john",
            address: {
                street: "Streeet",
                number: 123,
                zip: "123",
                city: "SP"
            }
        }
        const result = await useCase.execute(input);
        expect(result).toEqual(output);

    });

    it("Should return an error if customer not found", () => {
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found");
        })
        const useCase = new FindCustomerUseCase(customerRepository);
        const input = {
            id: "12"
        }
        expect( () => {
            return useCase.execute(input)
        }).rejects.toThrow("Customer not found");

    })
})