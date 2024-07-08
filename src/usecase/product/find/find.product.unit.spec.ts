import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";
import CustomerModel from "../../../infrastructure/customer/repository/sequilize/customer.model"; 

const product = new Product("123", "product", 100);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Product unit tests use case", () => {
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

  it("Should return a product", async () => {
    const productRepository = MockRepository();
    const useCase = new FindProductUseCase(productRepository);
    await productRepository.create(product);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "product",
      price: 100,
    };

    const result = await useCase.execute(input);
    expect(result).toEqual(output);
  });

  it("Should return an error if product not found", () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const useCase = new FindProductUseCase(productRepository);
    const input = {
      id: "12",
    };

    expect(() => {
      return useCase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
