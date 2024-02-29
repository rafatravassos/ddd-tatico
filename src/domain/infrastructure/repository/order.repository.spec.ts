import { Sequelize } from "sequelize-typescript";
import Order from "../../checkout/order";
import OrderItem from "../../entity/order_item";
import Customer from "../../entity/customer";
import Address from "../../customer/value-object/address";
import Product from "../../entity/product";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {

    let sequelize: Sequelize;
    beforeEach(async() => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        })
        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });
    
    afterEach(async() => {
        await sequelize.close();
        });

    it("Should create a new order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Rua dos bobo", 123, "12345000", "SP");
        customer.changeAddress(address);
        customer.addRewardPoints(10);
        customer.activate();

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        )
        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order)

        const orderModel = await OrderModel.findOne({
            where: {id: order.id},
            include: ["items"]
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "1"
                },
            ]
        }
        );
    });

    it("Shoud update an order", async () =>{
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Rua dos bobo", 123, "12345000", "SP");
        customer.changeAddress(address);
        customer.addRewardPoints(10);
        customer.activate();

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        )
        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order)

        const orderModel = await OrderModel.findOne({
            where: {id: order.id},
            include: ["items"]
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "1"
                },
            ]
        }
        );
        // Alterar a quantidade do item
        orderItem.changeQuantity(5);
        order.changeItems([orderItem]);
        
        await orderRepository.update(order)
        
        const orderModel2 = await OrderModel.findOne({
            where: {id: order.id},
            include: ["items"]
        });

        expect(orderModel2.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "1"
                },
            ]
        }
        );

    });

    it("Should find one order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Rua dos bobo", 123, "12345000", "SP");
        customer.changeAddress(address);
        customer.addRewardPoints(10);
        customer.activate();

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        )
        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order)

        const orderModel = await OrderModel.findOne({
            where: {id: order.id},
            include: ["items"]
        });

        const foundOrder = await orderRepository.find("123");

        expect(orderModel.toJSON()).toStrictEqual({
            id: foundOrder.id,
            customer_id: foundOrder.customerId,
            total: foundOrder.total(),
            items: [
                {
                    id: foundOrder.items[0].id,
                    name: foundOrder.items[0].name,
                    price: foundOrder.items[0].price,
                    quantity: foundOrder.items[0].quantity,
                    order_id: foundOrder.id,
                    product_id: foundOrder.items[0].productId
                },
            ]
        }
        );

    });

    it("Should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Rua dos bobo", 123, "12345000", "SP");
        customer.changeAddress(address);
        customer.addRewardPoints(10);
        customer.activate();

        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        )
        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository();


        const orderItem2 = new OrderItem(
            "2",
            product.name,
            product.price,
            product.id,
            7
        )
        const order2 = new Order("1234", "123", [orderItem2]);

        await orderRepository.create(order);
        await orderRepository.create(order2);

       
        const orders = [order, order2];
        const foundOrders = await orderRepository.findAll();

        expect(orders).toEqual(foundOrders);

    });

    
});