import * as AWS from 'aws-sdk';

const dynamo = new AWS.DynamoDB();

const getStocksList = async () => await dynamo
    .scan({
        TableName: `${process.env.DB_STOCKS_TABLE}`
    })
    .promise();


export default {
    getStocksList
}