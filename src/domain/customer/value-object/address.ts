export default class Address {
    private _id: string="";
    private _street: string="";
    private _number: number=0;
    private _zip: string="";
    private _city: string="";

    constructor(street: string, number: number, zip: string, city: string){
        this._street=street;
        this._number=number;
        this._zip=zip;
        this._city = city
        this.validate();
    }

    get street() {
        return this._street;
    }

    get number() {
        return this._number;
    }

    get zip() {
        return this._zip;
    }

    get city() {
        return this._city;
    }

    validate() {
        if (this._street.length==0){
            throw new Error("The street is required.");
        }
        if (this._zip.length==0){
            throw new Error("The zip is required.");
        }
        if (this._city.length==0){
            throw new Error("The zip is required.");
        }
        if (this._number==0){
            throw new Error("The number is required.");
        }

    }
    toString() {
        return `${this._street}, ${this._number}, ${this._zip}, ${this._city}`
    }
}