import s3Repository from './s3.repository';

const csv = require("csv-parser");

const copyObject = async (key: string, bucket: string, startFolder: string, destinationFolder: string) => await s3Repository.copyObject(key, bucket, startFolder, destinationFolder);

const deleteObject = async (key: string, bucket: string) => await s3Repository.deleteObject(key, bucket);

const getSignedUrl = async (key: string, bucket: string) => await s3Repository.getSignedUrl(key, bucket);

const getObject = async (key: string, bucket: string) => (await s3Repository.getObject(key, bucket)).createReadStream().pipe(csv());

export default {
    copyObject,
    deleteObject,
    getObject,
    getSignedUrl
}