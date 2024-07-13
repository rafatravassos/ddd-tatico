import express, {Request, Response} from 'express';
import CreateProductUsecase from '../../../usecase/product/create/create.product.usecase';
import ProductRepository from '../../product/repository/sequilize/product.repository';
import ListProductUseCase from '../../../usecase/product/list/list.product.usecase';
export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {

    const useCase = new CreateProductUsecase(new ProductRepository());
    try {
        const productDto = {
            name: req.body.name,
            price: req.body.price,
        }

        const output = await useCase.execute(productDto);
        res.send(output);

    } catch (err) {
        res.status(500).send(err);
    }
});

productRoute.get("/", async (req: Request, res: Response) => {
    const usecase = new ListProductUseCase(new ProductRepository());
    const productList = await usecase.execute({});
    res.send(productList);
});