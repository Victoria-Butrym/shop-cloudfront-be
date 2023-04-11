import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        responseData: {
          200: {
            description: 'Successful API response',
            bodyType: 'IProductStock[]'
          },
          500: {
            description: 'Internal server error!'
          }
        }
      },
    },
  ],
};
