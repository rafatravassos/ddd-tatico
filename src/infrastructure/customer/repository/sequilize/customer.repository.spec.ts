import { Sequelize } from "sequelize-typescript";
import Customer from "../../../../domain/customer/entity/customer"; 
import Address from "../../../../domain/customer/value-object/address";
import CustomerRepository from "./customer.repository";
import CustomerModel from "./customer.model";

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

        const customerModel = await CustomerModel.findOne({where: {id: "123"}});

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city
        });
        
    });

    it("Should update a customer", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Rua dos bobo", 123, "12345000", "SP");
        customer.changeAddress(address);
        customer.activate();

        await customerRepository.create(customer);

        customer.changeName("Customer 2");

        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({where: {id: "1"}});


        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city
        });
    });

    it ("Should find a customer", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Rua dos bobo", 123, "12345000", "SP");
        customer.changeAddress(address);
        customer.activate();

        await customerRepository.create(customer);
        
        const foundCustomer = await customerRepository.find(customer.id);

        expect(foundCustomer).toStrictEqual(customer);
    });

    it("Should throw an error when find a customer", async() => {
        const customerRepository = new CustomerRepository();

        expect(async () => {
            await customerRepository.find("ABC1");
        }).rejects.toThrow("Customer not found");
        
    });

    it("Should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Rua dos bobo", 123, "12345000", "SP");
        customer.Address = address;
        customer.addRewardPoints(10);
        customer.activate();

        const customer2 = new Customer("2", "Customer 2");
        const address2 = new Address("Rua dos antonio", 12345, "12345002", "SaP");
        customer2.Address = address2;
        customer2.addRewardPoints(25);

        await customerRepository.create(customer);
        await customerRepository.create(customer2);

        const customers = await customerRepository.findAll();

        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer);
        expect(customers).toContainEqual(customer2);
    });

    
});