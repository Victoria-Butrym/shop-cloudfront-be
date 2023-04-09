import type { AWS } from '@serverless/typescript';
import * as dotenv from "dotenv";

import getProductsList from '@functions/getProductsList';
import getProductById from '@functions/getProductById';


dotenv.config();

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: ['serverless-auto-swagger', 'serverless-esbuild', 'serverless-dynamodb-local', 'serverless-offline'],
  provider: {
    name: 'aws',
    region: 'us-east-1',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      DB_PRODUCTS_TABLE: `${process.env.DB_PRODUCTS_TABLE}`,
      DB_STOCKS_TABLE: `${process.env.DB_STOCKS_TABLE}`,
    },
    profile: 'sandx',
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: ["dynamodb:*", "rds:*"],
            Resource: [
              "arn:aws:dynamodb:us-east-1:149435355961:table/productsTable",
              "arn:aws:dynamodb:us-east-1:149435355961:table/stock"
            ],
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: { getProductsList, getProductById },
  package: { individually: true },
  custom: {
    autoswagger: {
      typefiles: ['./src/interfaces/product.interface.ts'],
      host: '50tdgqcex4.execute-api.us-east-1.amazonaws.com/dev'
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    }
  },
  resources: {
    Resources: {
      productsTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: 'productsTable',
          AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
          KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          }
        }
      },
      stock: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: 'stock',
          AttributeDefinitions: [{ AttributeName: 'product_id', AttributeType: 'S' }],
          KeySchema: [{ AttributeName: 'product_id', KeyType: 'HASH' }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          }
        }
      },
    }
  }
};

module.exports = serverlessConfiguration;
