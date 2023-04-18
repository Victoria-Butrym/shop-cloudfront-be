// import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        event: 's3:ObjectCreated:*',
        bucket: 'import-service-csv',
        existing: true,
        rules: [{ prefix: 'uploaded/' }]
      }
    }
  ],
};
