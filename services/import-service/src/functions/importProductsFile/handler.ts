import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { S3 } from 'aws-sdk';

import schema from './schema';

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const s3Params = { region: `${process.env.S3_REGION}` };
  const s3 = new S3(s3Params);

  const csvFileName = event.queryStringParameters?.name || "test.csv";

  const params = {
    Bucket: `${process.env.S3_IMPORT_CSV}`,
    Key: `uploaded/${csvFileName}`,
    ContentType: 'text/csv'
  }

  const url = await s3.getSignedUrlPromise("putObject", params);

  return formatJSONResponse(url);
};

export const main = middyfy(importProductsFile);
