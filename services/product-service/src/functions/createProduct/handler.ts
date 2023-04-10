// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import productService from '../../resources/products/products.service';
import { v4 } from 'uuid';

// import schema from './schema';
import { APIGatewayEvent } from 'aws-lambda';
import { badRequestResponse } from '../../libs/api-gateway';

const createProduct = async (event: APIGatewayEvent) => {
  const { title, description, price, count } = JSON.parse(event.body);
  const productId = v4();

  if (!productService.isProductBodyValid(title, description, price, count)) {
    return badRequestResponse();
  }

  const product = {
      id: productId,
      title,
      description,
      price,
  }

  const stock = {
    product_id: productId,
    count
  }

  await productService.createProduct(product, stock)
  
  return formatJSONResponse({ product, stock });
}

export const main = middyfy(createProduct);
