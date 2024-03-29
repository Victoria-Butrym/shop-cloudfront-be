import type { AWS } from '@serverless/typescript';
import * as dotenv from "dotenv";

import importProductsFile from '@functions/importProductsFile';
import importFileParser from '@functions/importFileParser';

dotenv.config();

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-1',
    profile: 'sandx',
    stage: 'dev',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      S3_REGION: `${process.env.S3_REGION}`,
      S3_IMPORT_CSV: `${process.env.S3_IMPORT_CSV}`,
      SQS_PRODUCT_QUEUE: `${process.env.SQS_PRODUCT_QUEUE}`,
      SQS_REGION: `${process.env.SQS_REGION}`
    },
    httpApi: {
      authorizers: {
        customAuthorizer: {
          type: "request",
          functionArn: "arn:aws:lambda:us-east-1:149435355961:function:authorization-service-dev-basicAuthorizer",
        }
      }
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: "sqs:*",
            Resource: "arn:aws:sqs:us-east-1:149435355961:catalogItemsQueue"
          },
          {
            Effect: 'Allow',
            Action: [
              "s3:ListBucket"
            ],
            Resource: "arn:aws:s3:::import-service-csv"
          },
          {
            Effect: 'Allow',
            Action: [
              "s3:*"
            ],
            Resource: "arn:aws:s3:::import-service-csv/*"
          }
        ]
      }
    }
  },
  // import the function via paths
  functions: { importProductsFile, importFileParser },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },resources: {
    Resources: {
      GatewayUnauthorized: {
        Type: 'AWS::ApiGateway::GatewayResponse',
        Properties: {
          ResponseParameters: {
            'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
            'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
            'gatewayresponse.header.WWW-Authenticate': "'Basic'",
          },
          RestApiId: {
            Ref: 'ApiGatewayRestApi'
          },
          ResponseType: 'UNAUTHORIZED',
          StatusCode: '401'
        }
      },
      GatewayForbidden: {
        Type: 'AWS::ApiGateway::GatewayResponse',
        Properties: {
          ResponseParameters: {
            'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
            'gatewayresponse.header.Access-Control-Allow-Headers': "'*'"
          },
          RestApiId: {
            Ref: 'ApiGatewayRestApi'
          },
          ResponseType: 'ACCESS_DENIED',
          StatusCode: '403'
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
