import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";
import CreateProductUsecase from "../create/create.product.usecase";
import UpdateProductUseCase from "./update.product.usecase";

describe("Integration test for update product use case", () => {
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

  it("Should update a product using usecases", async () => {
    const productRepository = new ProductRepository();
    const productCreateUseCase = new CreateProductUsecase(productRepository);

    const inputCreate = {
        name: "Product 1",
        price: 1000,
    };
    const createdProduct = await productCreateUseCase.execute(inputCreate);
    const expectedOutputCreate = {
        id: expect.any(String),
        name: "Product 1",
        price: 1000,
    };
    expect(createdProduct).toEqual(expectedOutputCreate);

    const inputToUpdate = {
      id: createdProduct.id,
      name: "Product 1 Updated",
      price: 2000,
    };

    const updateUseCase = new UpdateProductUseCase(productRepository);
    const result = await updateUseCase.execute(inputToUpdate);

    expect(result.id).toEqual(inputToUpdate.id);
    expect(result.name).toEqual(inputToUpdate.name);
    expect(result.price).toEqual(inputToUpdate.price);
  });

});
