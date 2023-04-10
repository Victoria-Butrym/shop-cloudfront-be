import * as AWS from 'aws-sdk';

// AWS.config.credentials = new AWS.SharedIniFileCredentials({
//     profile: "sandx",
// });

const dynamo = new AWS.DynamoDB({ region: "us-east-1" })

const getStocksList = async() => await dynamo
    .scan({
        TableName: `${process.env.DB_STOCKS_TABLE}`
    })
    .promise();


export default {
    getStocksList,
}