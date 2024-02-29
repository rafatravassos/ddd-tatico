import Address from "../../customer/value-object/address";
import EventHandlerInterface from "../../@shared//event/event-handler.interface";
import AddressChangedEvent from "./address-change.event";
import CustomerCreatedEvent from "./customer-created.event";

export default class AddressChangedHandler
    implements EventHandlerInterface<AddressChangedEvent> {
        private _id: string="";
        private _name: string="";
        private _address: Address;

        constructor(id: string, name: string, address: Address) {
            this._id = id;
            this._name = name;
            this._address = address;
        }
        
        handle(event: AddressChangedEvent, ): void {
            console.log(`Esse é o Endereço do cliente: %s, %s alterado para: %s`, this._id, this._name, this._address.toString());
        }
}

