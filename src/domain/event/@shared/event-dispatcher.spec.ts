import SendConsoleLog1Handler from "../customer/sendConsoleLog1.handler";
import SendConsoleLog2Handler from "../customer/sendConsoleLog2.handler";
import ProductCreatedEvent from "../product/product-created.event";
import SendEmailWhenProductIsCreatedHandler from "../product/sendEmailWhenProductIsCreated.handler";
import EventDispatcher from "./event-dispatcher";

describe("Domain event tests", () => {

    it("Should register event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
        
    });

    it("Should unregister event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    });

    it("Should unregister all events", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();

        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    });

    it("Should notify all eventHandlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Description 1",
            price: 10.5
            })
        eventDispatcher.notify(productCreatedEvent);
        expect(spyEventHandler).toHaveBeenCalled();

    });

    it("Should register a customer event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog1Handler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
        
    });

    it("Should register a second customer event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog1Handler();
        const eventHandler2 = new SendConsoleLog2Handler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler2);
    });

});