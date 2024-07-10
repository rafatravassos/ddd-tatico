import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";
import CreateProductUsecase from "./create.product.usecase";

describe("Integration test for create product use case", () => {
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

    it("Should create a product", async () => {
        const productRepository = new ProductRepository();
        const productCreateUseCase = new CreateProductUsecase(productRepository);

        const input = {
            name: "Product 1",
            price: 1000
        }

        const output = {
            id: expect.any(String),
            name: "Product 1",
            price: 1000
        }
        const result = await productCreateUseCase.execute(input);
        expect(result).toEqual(output);
    });
})