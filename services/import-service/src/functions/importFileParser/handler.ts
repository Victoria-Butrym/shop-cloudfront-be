import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';

const csv = require("csv-parser");

import { S3 } from 'aws-sdk';

import schema from './schema';

const importFileParser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const s3Params = { region: `${process.env.S3_REGION}` };
  const s3 = new S3(s3Params);

  console.log('---file parser log---');

  const key = (event as any).Records[0].s3.object.key

  console.log('--- KEY ---', key);
  console.log('--- EVENT ---', event);

  const objectParams = {
    Bucket: `${process.env.S3_IMPORT_CSV}`,
    Key: key,
  }

  const readStream = s3.getObject(objectParams).createReadStream();

  const streamChunks = [];

  const file = await new Promise((resolve, reject) => {
    readStream
      .pipe(csv())
      .on("data", function (data: any) {
        streamChunks.push(data);
      })
      .on("end", function () {
        resolve(streamChunks);
      })
      .on("error", function () {
        reject("error processing csv file");
      });
  });

  console.log('--- file chunks ---', file)

  await s3.copyObject({
        Bucket: `${process.env.S3_IMPORT_CSV}`,
        CopySource: `${process.env.S3_IMPORT_CSV}/${key}`,
        Key: key.replace("uploaded/", "parsed/"),
      })
      .promise();

  await s3.deleteObject({
      Bucket: `${process.env.S3_IMPORT_CSV}`,
      Key: key,
    })
    .promise();

  return formatJSONResponse({ message: 'yessss' });
};

// export const main = middyfy(importFileParser);
export const main = importFileParser;
