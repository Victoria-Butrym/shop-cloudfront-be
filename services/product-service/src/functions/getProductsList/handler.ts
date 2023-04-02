import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import productService from '../../resources/products/products.service';

import schema from './schema';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  const productsList = await productService.getProductsList();
  
  return formatJSONResponse({
    content: productsList,
    meta: {
      count: productsList.length
    }
  });
}

export const main = middyfy(getProductsList);
