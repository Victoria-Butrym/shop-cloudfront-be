
import { S3 } from 'aws-sdk';
import logger from '../utils/logger.utils';

const s3Params = { region: `${process.env.S3_REGION}` };
const s3 = new S3(s3Params);

const getObject = async (key, bucket) => {
    logger.log('---file parser log---');
    logger.log('--- KEY ---', key);

    const objectParams = {
      Bucket: bucket,
      Key: key,
    }

    return s3.getObject(objectParams)
}

const copyObject = async (key: string, bucket: string, startFolder: string, destinationFolder: string) => await s3.copyObject({
    Bucket: bucket,
    CopySource: `${bucket}/${key}`,
    Key: key.replace(startFolder, destinationFolder),
  })
  .promise();

const deleteObject = async (key, bucket) => await s3.deleteObject({
    Bucket: bucket,
    Key: key,
  })
  .promise();

const getSignedUrl = async (key, bucket) => {
    const params = {
        Bucket: bucket,
        Key: key,
        ContentType: 'text/csv'
      }
  
    return s3.getSignedUrl("putObject", params);
}

export default {
    copyObject,
    deleteObject,
    getObject,
    getSignedUrl
}