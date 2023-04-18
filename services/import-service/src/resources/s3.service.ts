import s3Repository from './s3.repository';
import logger from '../utils/logger.utils';

const csv = require("csv-parser");

const copyObject = async (key: string, bucket: string, startFolder: string, destinationFolder: string) => await s3Repository.copyObject(key, bucket, startFolder, destinationFolder);

const deleteObject = async (key: string, bucket: string) => await s3Repository.deleteObject(key, bucket);

const getSignedUrl = async (key: string, bucket: string) => await s3Repository.getSignedUrl(key, bucket);

const getObject = async (key: string, bucket: string) => {
    const object = await s3Repository.getObject(key, bucket);
    const readStream = object.createReadStream();

    const streamChunks = [];

    return await new Promise((resolve, reject) => {
      readStream
        .pipe(csv())
        .on("data", function (data: any) {
          streamChunks.push(data);
        })
        .on("end", function () {
          resolve(streamChunks);
        })
        .on("error", function (error) {
          logger.error(error.message)
          reject("error processing csv file");
        });
    });
}

export default {
    copyObject,
    deleteObject,
    getObject,
    getSignedUrl
}