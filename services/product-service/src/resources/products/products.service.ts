import { IProduct } from 'src/interfaces/product.interface';
import productsDB from './products.database';

const getProductsList = async (): Promise<IProduct[]> => await productsDB.getProductsList();

const getProductById = async (id: string): Promise<IProduct> => await productsDB.getProductById(id);

export default {
    getProductsList,
    getProductById
}