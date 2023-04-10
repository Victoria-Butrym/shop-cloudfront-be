// import { IProduct } from 'src/interfaces/product.interface';
import productsDB from './products.database';
import { unmarshall } from "@aws-sdk/util-dynamodb";

const getProductsList = async () => {
    return (await productsDB.getProductsList()).Items.map((stock) => unmarshall((stock) as Record<any, any>));
};

const getProductById = async (id: string)=> await productsDB.getProductById(id);

export default {
    getProductsList,
    getProductById
}