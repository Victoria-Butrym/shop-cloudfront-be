import * as AWS from 'aws-sdk';

const dynamo = new AWS.DynamoDB();
const dynamoClient = new AWS.DynamoDB.DocumentClient();

const getStocksList = async () => await dynamo
    .scan({
        TableName: `${process.env.DB_STOCKS_TABLE}`
    })
    .promise();

const getStockByProductId = async (productId: string) => await dynamoClient
    .query({
        TableName: `${process.env.DB_STOCKS_TABLE}`,
        KeyConditionExpression: "product_id = :product_id",
        ExpressionAttributeValues: { ":product_id": productId },
    })
    .promise();


export default {
    getStocksList,
    getStockByProductId
}