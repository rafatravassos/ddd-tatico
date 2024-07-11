import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import CreateProductUsecase from "../create/create.product.usecase";

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
        const productRepository = new ProductRepository();
        const productCreateUseCase = new CreateProductUsecase(productRepository);
    
        const inputCreate = {
            name: "Product 1",
            price: 1000,
        };
        const createdProduct = await productCreateUseCase.execute(inputCreate);


        const input = {
            id: createdProduct.id
        }

        const useCase = new FindProductUseCase(productRepository);
        const output = {
            id: createdProduct.id,
            name: "Product 1",
            price: 1000
        }
        const result = await useCase.execute(input);
        expect(result).toEqual(output);
        


    });
})