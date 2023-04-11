import stocksDB from './stocks.database';
import { unmarshall } from "@aws-sdk/util-dynamodb";

const getStocksList = async () => {
   return (await stocksDB.getStocksList()).Items.map((stock) => unmarshall((stock) as Record<any, any>));
};

const getStockByProductId = async (productId: string) => (await stocksDB.getStockByProductId(productId)).Items[0];

export default {
    getStocksList,
    getStockByProductId,
}