import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import logger from '../../utils/logger.utils';

import schema from './schema';
import { internalServerErrorResponse } from '../../libs/api-gateway';
import s3Service from 'src/resources/s3.service';

const importFileParser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    logger.log('---file parser log---')
    const bucketName = `${process.env.S3_IMPORT_CSV}`;
    const key = (event as any).Records[0].s3.object.key;

    logger.log('--- KEY ---', key);

    const file = await s3Service.getObject(key, bucketName);

    logger.log('--- file chunks ---', file)

    await s3Service.copyObject(key, bucketName, 'uploaded/', 'parsed/');
    await s3Service.deleteObject(key, bucketName);

    return formatJSONResponse({ message: 'succeed' });
    
  } catch (error) {
    return internalServerErrorResponse();
  }
};

// export const main = middyfy(importFileParser); check content-type error
export const main = importFileParser;
