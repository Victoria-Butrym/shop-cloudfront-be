// import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        arn: "arn:aws:sqs:us-east-1:149435355961:catalogItemsQueue",
        batchSize: 5,
      },
    }
  ],
};
