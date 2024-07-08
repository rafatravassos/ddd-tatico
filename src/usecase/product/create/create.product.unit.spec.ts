import CreateProductUsecase from "./create.product.usecase";

const input = {
    name: "Product 1",
    price: 100,
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}


describe("Unit test Create product usecase", () => {
    it("should create a product", async() => {
        const productRepository = MockRepository()
        const productCreateUseCase = new CreateProductUsecase(productRepository); 
        
        const output = await productCreateUseCase.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });

    });

    it("Should throw an error when name is missing", async () => {

        const productRepository = MockRepository()
        const productCreateUseCase = new CreateProductUsecase(productRepository); 
        input.name = "";
        
        await expect(productCreateUseCase.execute(input)).rejects.toThrow("Name is required");

    });


});