import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("A","Product 1", 1000);
const input = {
    id: product.id,
    name: "Product 1 Updated",
    price: 1100
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        update: jest.fn(),
    }
}

describe("Unit test for product update use case", () => {
    it("Should update product", async () => {
        const productRepository = MockRepository();
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);

        const output = await productUpdateUseCase.execute(input);
        expect(output).toEqual(input);
    });
});