import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
// import { IProduct } from 'src/interfaces/product.interface';
import productService from '../../resources/products/products.service';

import schema from './schema';
import { notFoundResponse, internalServerErrorResponse } from '../../libs/api-gateway';

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const { productId } = event.pathParameters;
    const product = await productService.getProductById(productId);

    return product
      ? formatJSONResponse(product)
      : notFoundResponse();
    
  } catch (error) {
      internalServerErrorResponse();
  }
}

export const main = middyfy(getProductById);
