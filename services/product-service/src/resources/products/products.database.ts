import { PRODUCT_LIST } from '../../mocks/products';
import { IProduct } from '../../interfaces/product.interface';

const getProductsList = (): Promise<IProduct[]> => Promise.resolve(PRODUCT_LIST);

const getProductById = (id: string): Promise<IProduct> =>
    Promise.resolve(PRODUCT_LIST.find((product) => product.id === id) || null);

export default {
    getProductsList,
    getProductById
}