import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
// import { IProduct } from 'src/interfaces/product.interface';
import productService from '../../resources/products/products.service';

import schema from './schema';

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { productId } = event.pathParameters;
  const product = await productService.getProductById(productId);

  return product
    ? formatJSONResponse(product)
    : formatJSONResponse({ error: { message: 'Product not found!' } }, 404);
}

export const main = middyfy(getProductById);
