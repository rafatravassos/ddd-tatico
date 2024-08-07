import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export default class FindProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
        console.log("Executing FindProductUseCase with input:", input);
        const product = await this.productRepository.find(input.id);
        console.log("Product found:", product);
        return {
            id: product.id,
            name: product.name,
            price: product.price
        };
    }
}