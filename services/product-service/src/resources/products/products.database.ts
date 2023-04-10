import * as AWS from 'aws-sdk';

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

export default {
    getProductsList,
    getProductById
}