const awsSDK = require('aws-sdk');

require('dotenv').config();

awsSDK.config.credentials = new awsSDK.SharedIniFileCredentials({
  profile: "sandx",
});

const dynamo = new awsSDK.DynamoDB({ region: process.env.DB_REGION });

const PRODUCTS = [
  {
    id: 'b63f81b2-873e-4ab6-aba3-09ede5c6b485',
    title: 'seed 1',
    description: 'from seed script 1',
    price: 11,
  },
  {
    id: '6a31db68-98ec-45ee-ac62-91588079abd9',
    title: 'seed 2',
    description: 'from seed script 2',
    price: 19,
  },
  {
    id: '5f240243-10c3-4674-856c-8951432145a7',
    title: 'seed 3',
    description: 'from seed script 3',
    price: 4,
  },
  {
    id: '9d1b1d66-3895-48da-9ad3-4540c7b2a5aa',
    title: 'seed 4',
    description: 'from seed script 4',
    price: 7,
  },
]

const STOCKS = [
  {
    product_id: 'b63f81b2-873e-4ab6-aba3-09ede5c6b485',
    count: 11,
  },
  {
    product_id: '6a31db68-98ec-45ee-ac62-91588079abd9',
    count: 19,
  },
  {
    product_id: '5f240243-10c3-4674-856c-8951432145a7',
    count: 4,
  },
  {
    product_id: '9d1b1d66-3895-48da-9ad3-4540c7b2a5aa',
    count: 7,
  },
]

const productsSeedData = PRODUCTS.map(({ id, title, price, description }) => ({
  TableName: process.env.DB_PRODUCTS_TABLE,
  Item: {
    id: { S: id },
    title: { S: title },
    price: { N: price.toString() },
    description: { S: description },
  },
}));

const stocksSeedData = STOCKS.map(({ product_id, count }) => ({
  TableName: process.env.DB_STOCKS_TABLE,
  Item: {
    product_id: { S: product_id },
    count: { N: count.toString() },
  },
}));

const seedData = (items) => {
  items.forEach((item) =>
    dynamo.putItem(item, (error) => {
      error ? console.error("---Error---", error) : console.log("---Data seed success---");
    })
  );
};

seedData(productsSeedData);
seedData(stocksSeedData);