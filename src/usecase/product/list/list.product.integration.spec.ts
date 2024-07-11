import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";
import CreateProductUsecase from "../create/create.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import ListProductUseCase from "./list.product.usecase";

const product1 = { name: "Product 1", price: 100 };
const product2 = { name: "Product 2", price: 200 };

describe("Integration tests for list product usecase", () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });
  it("Should list all products", async () => {
    const productRepository = new ProductRepository();
    const productCreateUseCase = new CreateProductUsecase(productRepository);
    const productCreated1 = await productCreateUseCase.execute(product1);
    const productCreated2 = await productCreateUseCase.execute(product2);

    const useCase = new ListProductUseCase(productRepository);
    const output = await useCase.execute({});    
    expect(output.products.length).toBe(2);

    expect(output.products[0].id).toBe(productCreated1.id);
    expect(output.products[0].name).toBe(productCreated1.name);
    expect(output.products[0].price).toBe(productCreated1.price);

    expect(output.products[1].id).toBe(productCreated2.id);
    expect(output.products[1].name).toBe(productCreated2.name);
    expect(output.products[1].price).toBe(productCreated2.price);

  });
});
