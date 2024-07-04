interface baseInterface {
    name: string;
    address: {
        street: string;
        number: number;
        zip: string;
        city: string;
    }

}
export interface InputCreateCustomerDto extends baseInterface {
}

export interface OutputCreateCustomerDto extends baseInterface {
    id: string;
}