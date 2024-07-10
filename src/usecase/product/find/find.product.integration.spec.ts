import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";
import FindProductUseCase from "./find.product.usecase";

describe("Integration Test find product use case", () => {
    let sequelize: Sequelize;
    beforeEach(async() => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        })
        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });
    
    afterEach(async() => {
        await sequelize.close();
        });

    it("Should find a product", async () => {
        const product = new Product("123", "Product 1", 1000);
        const productRepository = new ProductRepository();

        const useCase = new FindProductUseCase(productRepository);

        await productRepository.create(product);

        const input = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "Product 1",
            price: 1000
        }
        const result = await useCase.execute(input);
        expect(result).toEqual(output);
        


    });
})