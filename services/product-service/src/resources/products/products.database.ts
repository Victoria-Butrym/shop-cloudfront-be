import * as AWS from 'aws-sdk';
import { IProduct, IStock } from 'src/interfaces/product.interface';

const dynamo = new AWS.DynamoDB();
const dynamoClient = new AWS.DynamoDB.DocumentClient();

const getProductsList = async () => await dynamo
    .scan({
        TableName: `${process.env.DB_PRODUCTS_TABLE}`
    })
    .promise();

const getProductById = async (id: string) => await dynamoClient
    .query({
        TableName: `${process.env.DB_PRODUCTS_TABLE}`,
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: { ":id": id },
    })
    .promise();

const createProduct = async (product: IProduct, stock: IStock) => dynamoClient
    .transactWrite({
        TransactItems: [
            {
                Put: { TableName: `${process.env.DB_PRODUCTS_TABLE}`, Item: product },
            },
            {
                Put: { TableName: `${process.env.DB_STOCKS_TABLE}`, Item: stock },
            },
        ],
    })
    .promise();

export default {
    getProductsList,
    getProductById,
    createProduct
}