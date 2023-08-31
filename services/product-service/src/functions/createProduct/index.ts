import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'products',
        responseData: {
          200: {
            description: 'Product Created',
            bodyType: 'IProductStock'
          },
          400: {
            description: 'Bad Request',
          },
          500: {
            description: 'Internal server error!'
          }
        }
      },
    },
  ],
};
