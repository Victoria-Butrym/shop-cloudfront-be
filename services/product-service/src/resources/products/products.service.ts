// import { IProduct } from 'src/interfaces/product.interface';
import productsDB from './products.database';

const getProductsList = async () => await productsDB.getProductsList();

const getProductById = async (id: string)=> await productsDB.getProductById(id);

export default {
    getProductsList,
    getProductById
}