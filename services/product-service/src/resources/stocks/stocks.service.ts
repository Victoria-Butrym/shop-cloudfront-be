import stocksDB from './stocks.database';
import { unmarshall } from "@aws-sdk/util-dynamodb";

const getStocksList = async() => {
   return (await stocksDB.getStocksList()).Items.map((stock) => unmarshall((stock) as Record<any, any>));
};

export default {
    getStocksList,
}