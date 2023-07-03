import SendEmailWhenProductIsCreatedHandler from "../product/sendEmailWhenProductIsCreated.handler";
import EventDispatcer from "./event-dispatcher";

describe("Domain event tests", () => {

    it("Should register event handler", () => {
        const eventDispatcher = new EventDispatcer();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
    });

});