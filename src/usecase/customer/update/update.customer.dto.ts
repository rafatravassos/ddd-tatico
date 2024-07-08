interface baseInterface {
    id: string;
    name: string;
    address: {
        street: string;
        number: number;
        zip: string;
        city: string;
    }

}
export interface InputUpdateCustomerDto extends baseInterface {
}

export interface OutputUpdateCustomerDto extends baseInterface {
}