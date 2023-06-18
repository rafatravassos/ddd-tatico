import { Sequelize } from "sequelize-typescript";
import Customer from "../../entity/customer";
import Address from "../../entity/address";
import CustomerRepository from "./customer.repository";
import CustomerModel from "../db/sequelize/model/customer.model";

describe("Customer repository test", () => {

    let sequelize: Sequelize;
    beforeEach(async() => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        })
        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });
    
    afterEach(async() => {
        await sequelize.close();
        });

    it ("Should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Rua dos bobo", 123, "12345000", "SP");
        customer.Address = address;
        customer.activate();

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({where: {id: "1"}});

        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zip: address.zip,
            city: address.city
        });
        
    });

    it ("Should find a customer", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Rua dos bobo", 123, "12345000", "SP");
        customer.changeAddress(address);

        await customerRepository.create(customer);
        
        const foundCustomer = await customerRepository.find(customer.id);

        expect(foundCustomer).toStrictEqual(customer);
    });
});