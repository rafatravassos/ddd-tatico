import OrderItem from "./order_item";
export default class Order {
    private _id: string;
    private _customerId: string;
    private _items: OrderItem[] = [];
    private _total: number;

    constructor(id: string, customerId:string, items: OrderItem[]){
        this._id = id;
        this._customerId=customerId;
        this._items = items;
        this._total = this.total();
        this.validate();
    }
    validate(): boolean {
        if (this._id.length==0) {
            throw("Id is required");
        }
        if (this._customerId.length==0) {
            throw("CustomerId is required");
        }
        if (this._items.length==0) {
            throw("item qtd must be greater than zero")
        }
        if (this._items.some(item => item.quantity <=0)) {
            throw("Quantity must be greater than zero");
        }
        return true;
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
    }
}