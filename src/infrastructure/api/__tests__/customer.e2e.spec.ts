import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
    beforeEach( async () => {
        await sequelize.sync({force: true});
    })

    afterAll( async () => {
        await sequelize.close();
    });

    it("Should create a customer", async () => {
        const response = await request(app).post("/customer").send({
            name: "Customer 1",
            address: {
                street: "Rua dos bobo",
                number: 123,
                zip: "12345000",
                city: "SP"
            }
        });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Customer 1");
        expect(response.body.address.city).toBe("SP");
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("address");
    });
    
    it("Should return error 500", async () => {
        const response = await request(app).post("/customer").send({
            name: "Customer 1",
        });

        expect(response.status).toBe(500);
    });

    it("Should list all customers", async () => {
        const response = await request(app).post("/customer").send({
            name: "Customer 1",
            address: {
                street: "Rua dos bobo",
                number: 123,
                zip: "12345000",
                city: "SP"
            }
        });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Customer 1");

        const response2 = await request(app).post("/customer").send({
            name: "Customer 2",
            address: {
                street: "Rua dos bobo",
                number: 1234,
                zip: "12345012300",
                city: "Osasco"
            }
        });
        expect(response2.status).toBe(200);
        expect(response2.body.name).toBe("Customer 2");

        const listResponse = await request(app).get("/customer").send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);
        const customer=listResponse.body.customers[0];
        expect(customer.name).toBe("Customer 1");
        expect(customer.address.city).toBe("SP");

        const customer2=listResponse.body.customers[1];
        expect(customer2.name).toBe("Customer 2");
        expect(customer2.address.city).toBe("Osasco");

        const listResponseXML = await request(app)
        .get("/customer")
        .set("Accept", "application/xml")
        .send();

        expect(listResponseXML.status).toBe(200);
        expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
        expect(listResponseXML.text).toContain(`<Customers>`);
        expect(listResponseXML.text).toContain(`<customer>`);
        expect(listResponseXML.text).toContain(`<name>Customer 1</name>`);
        expect(listResponseXML.text).toContain(`<address>`);
        expect(listResponseXML.text).toContain(`<street>Rua dos bobo</street>`);
        expect(listResponseXML.text).toContain(`<number>123</number>`);
        expect(listResponseXML.text).toContain(`<zip>12345000</zip>`);
        expect(listResponseXML.text).toContain(`<city>SP</city>`);
        expect(listResponseXML.text).toContain(`</address>`);
        expect(listResponseXML.text).toContain(`</customer>`);
        expect(listResponseXML.text).toContain(`<customer>`);
        expect(listResponseXML.text).toContain(`<name>Customer 2</name>`);
        expect(listResponseXML.text).toContain(`<address>`);
        expect(listResponseXML.text).toContain(`<street>Rua dos bobo</street>`);
        expect(listResponseXML.text).toContain(`<number>1234</number>`);
        expect(listResponseXML.text).toContain(`<zip>12345012300</zip>`);
        expect(listResponseXML.text).toContain(`<city>Osasco</city>`);
        expect(listResponseXML.text).toContain(`</address>`);
        expect(listResponseXML.text).toContain(`</customer>`);
        expect(listResponseXML.text).toContain(`</Customers>`);



    });
});