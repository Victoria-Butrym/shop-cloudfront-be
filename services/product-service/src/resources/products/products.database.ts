import * as AWS from 'aws-sdk';

AWS.config.credentials = new AWS.SharedIniFileCredentials({
    profile: "sandx",
});

const dynamo = new AWS.DynamoDB.DocumentClient();

const getProductsList = async () => dynamo
    .scan({
        TableName: 'productsTable'
    })
    .promise();

const getProductById = (id: string) => dynamo
    .query({
        TableName: 'productsTable',
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: { ":id": id },
    })
    .promise();

export default {
    getProductsList,
    getProductById
}