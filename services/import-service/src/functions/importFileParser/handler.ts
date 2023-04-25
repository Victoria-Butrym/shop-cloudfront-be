import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';

import schema from './schema';
import { internalServerErrorResponse } from '../../libs/api-gateway';
import s3Service from 'src/resources/s3.service';
import { SQS } from 'aws-sdk';

const importFileParser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const bucketName = `${process.env.S3_IMPORT_CSV}`;
    const key = (event as any).Records[0].s3.object.key;
    const sqs = new SQS({ region: `${process.env.SQS_REGION}` });

    const stream = await s3Service.getObject(key, bucketName);

    for await (const data of stream) {
      await sqs
        .sendMessage({
          QueueUrl: `${process.env.SQS_PRODUCT_QUEUE}`,
          MessageBody: JSON.stringify(data),
        },
        (error, data) => {
                  if (error) {
                    console.log('ERROR 3----', error)
                  } else {
                    console.log('DATA SENT 3----', data)
                  }
                }
        ).promise();;
    }

    await s3Service.copyObject(key, bucketName, 'uploaded/', 'parsed/');
    await s3Service.deleteObject(key, bucketName);

    return formatJSONResponse({ message: 'succeed' });
    
  } catch (error) {
    return internalServerErrorResponse();
  }
};

export const main = importFileParser;
