import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for products", () => {
    beforeEach( async () => {
        await sequelize.sync({force: true});
    })

    afterAll( async () => {
        await sequelize.close();
    });

    it("Should create a product", async () => {
        const response = await request(app).post("/product").send({
            name: "Product 1",
            price: 11,
        });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product 1");
        expect(response.body.price).toBe(11);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("price");
    });

    it("Should return an error", async () => {

        const response = await request(app).post("/product").send({
            name: "Product 1",
        });

        expect(response.status).toBe(500);
    });

    it("Should list all products", async () => {
        const response = await request(app).post("/product").send({
            name: "Product 1",
            price: 11,
        });

        expect(response.status).toBe(200);

        const response2 = await request(app).post("/product").send({
            name: "Product 2",
            price: 11.99,
        });

        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/product").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);

        expect(listResponse.body.products[0].name).toBe("Product 1");
        expect(listResponse.body.products[1].price).toBe(11.99);

    });

});