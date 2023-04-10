// import { IProduct } from 'src/interfaces/product.interface';
import productsDB from './products.database';
import { unmarshall } from "@aws-sdk/util-dynamodb";

const getProductsList = async () => {
    return (await productsDB.getProductsList()).Items.map((stock) => unmarshall((stock) as Record<any, any>));
};

const getProductById = async (id: string) => (await productsDB.getProductById(id)).Items[0];

const createProduct = async (product, stock) => await productsDB.createProduct(product, stock)

const isProductBodyValid = (title: string, description: string, price: number, count: number): boolean => {
    return !!title && !!description && !!price && !!count;
}

const joinProductAndStockList = (productsList, stocksList) => {
    return productsList.map((product) => ({
      ...product,
      count: stocksList.find((stock) => stock.product_id === product.id)?.count,
    }))
  }

export default {
    getProductsList,
    getProductById,
    createProduct,
    isProductBodyValid,
    joinProductAndStockList,
}