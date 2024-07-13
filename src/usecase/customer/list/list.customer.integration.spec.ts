import { Sequelize } from "sequelize-typescript";
import CustomerRepository from "../../../infrastructure/customer/repository/sequilize/customer.repository";
import CreateCustomerUseCase from "../create/create.customer.usecase";
import ListCustomerUseCase from "./list.customer.usecase";
import CustomerModel from "../../../infrastructure/customer/repository/sequilize/customer.model";
const customer1 = {
    name: "John",
    address: {
        street: "Street 1",
        number: 1,
        zip: "1000",
        city: "Miami"
    }
}
const customer2 = {
    name: "Jane",
    address: {
        street: "Street 2",
        number: 2,
        zip: "2000",
        city: "Los Angeles"
    }
}

describe("Integration tests for customers", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
      await sequelize.addModels([CustomerModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });
    it("Should list all customers", async () => {
        const customerRepository = new CustomerRepository();
        const customerUseCase = new CreateCustomerUseCase(customerRepository);
        await customerUseCase.execute(customer1);
        await customerUseCase.execute(customer2);

        const useCase = new ListCustomerUseCase(customerRepository);
        const customerList = await useCase.execute({});
        expect(customerList.customers.length).toBe(2);
    });
});