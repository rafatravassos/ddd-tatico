import Address from "../../entity/address";
import Customer from "../../entity/customer";
import CustomerRepositoryInterface from "../../repository/customer-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.Address.street,
            number: entity.Address.number,
            zipcode: entity.Address.zip,
            city: entity.Address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        })
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update( 
            {
                name: entity.name,
                street: entity.Address.street,
                number: entity.Address.number,
                zip: entity.Address.zip,
                city: entity.Address.city,
                active: entity.isActive(),
                rewardPoints: entity.rewardPoints
    
            },
            {where :
                {
                    id: entity.id        
                }
            },
        );

    }

    async find(id:string): Promise<Customer> {
        let customerModel;
        try {
            customerModel = await CustomerModel.findOne({
                where: {id},
                rejectOnEmpty: true,
            });
        } catch (error) {
            throw new Error("Customer not found");
        }
        const customer =  new Customer(
            customerModel.id,
            customerModel.name
        );
        const address = new Address(
            customerModel.street,
            customerModel.number,
            customerModel.zipcode,
            customerModel.city
        )
        customer.changeAddress(address);
        return customer;




    }


    async findAll(): Promise<Customer[]>{
        const customerModels = await CustomerModel.findAll();
        return customerModels.map((customerModel) => 
            new Customer(customerModel.id, customerModel.name));        
    }    
}