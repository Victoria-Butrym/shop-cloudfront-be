import * as AWS from 'aws-sdk';

const dynamo = new AWS.DynamoDB({ region: "us-east-1" })

const getProductsList = async () => await dynamo
    .scan({
        TableName: `${process.env.DB_PRODUCTS_TABLE}`
    })
    .promise();

// const getProductById = async (id: string) => await dynamo
//     .query({
//         TableName: `${process.env.DB_PRODUCTS_TABLE}`,
//         KeyConditionExpression: "id = :id",
//         ExpressionAttributeValues: { ":id": id },
//     })
//     .promise();

const getProductById = async (id: string) => {};

export default {
    getProductsList,
    getProductById
}