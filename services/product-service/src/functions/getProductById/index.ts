import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{productId}',
        responseData: {
          200: {
            description: 'successful API response',
            bodyType: 'IProduct'
          },
          404: {
            description: 'Product not found!'
          },
          500: {
            description: 'Internal server error!'
          }
        }
      },
    },
  ],
};
