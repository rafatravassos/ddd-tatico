import ProductFactory from "./product.factory";

describe("Product factory unit tests", () => {
    it("Should create a product type a", () => {
        const product = ProductFactory.create("A", "Product A", 100);
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(100);
        expect(product.constructor.name).toBe("Product");
    });
    it("Should create a product type B", () => {
        const product = ProductFactory.create("B", "Product B", 100);
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product B");
        expect(product.price).toBe(200);
        expect(product.constructor.name).toBe("ProductB");
    });
    it("Should throw error when product type is not supported", () => {
        expect(() => {
            ProductFactory.create("C", "Product C", 100);
        }
        ).toThrowError("Product type not supported");
    });
});