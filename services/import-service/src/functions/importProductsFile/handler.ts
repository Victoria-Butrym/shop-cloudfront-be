import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { customErrorResponse, internalServerErrorResponse } from '../../libs/api-gateway';
import s3Repository from 'src/resources/s3.repository';

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const csvFileName = event.queryStringParameters.name;
    const bucketName = `${process.env.S3_IMPORT_CSV}`;

    if (!csvFileName) return customErrorResponse({ error: { message: 'query param [name] must be specified' } }, 404);

    const preassignedUrl = await s3Repository.getSignedUrl(`uploaded/${csvFileName}`, bucketName);

    return formatJSONResponse({ preassignedUrl });
  } catch (error) {
    return internalServerErrorResponse();
  }
};

export const main = middyfy(importProductsFile);
