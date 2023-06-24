import Address from "./address";

export default class Customer {
    private _id: string="";
    private _name: string="";
    private _address: Address;
    private _active:boolean=true;
    private _rewardPoints:number = 0;

    constructor(id: string, name: string){
        this._id=id;
        this._name=name;
        this.validate()
    }

    validate(){
        if (this._id.length==0){
            throw new Error("The ID is required.");
        }
        if (this._name.length==0){
            throw new Error("The name is required.");
        }
    }

    get Address() {
        return this._address;
    }

    get name(): string {
        return this._name;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    get id(): string {
        return this._id;
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    isActive(): boolean {
        return this._active;
    }
    changeName(name: string) {
        this._name=name;
        this.validate()
    }

    activate(){
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate the customer")
        }
        this._active=true;
    }
    deactivate(){
        this._active=false;
    }

    set Address(address: Address){
        this._address = address;
    }

}