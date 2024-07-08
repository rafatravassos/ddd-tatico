interface baseProduct {
    id: string;
    name: string;
    price: number;

}
export interface InputUpdateProductDto extends baseProduct{}

export interface OutputUpdateProductDto extends baseProduct{}