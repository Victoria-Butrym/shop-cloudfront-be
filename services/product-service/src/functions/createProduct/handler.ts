// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import productService from '../../resources/products/products.service';
import { v4 } from 'uuid';

// import schema from './schema';
import { APIGatewayEvent } from 'aws-lambda';
import { badRequestResponse, internalServerErrorResponse } from '../../libs/api-gateway';
import { IStock } from 'src/interfaces/product.interface';
import { IProduct } from '../../interfaces/product.interface';
import logger from '../../utils/logger.utils';

const createProduct = async (event: APIGatewayEvent) => {
  try {
    const { title, description, price, count } = JSON.parse(event.body);

    if (!productService.isProductBodyValid(title, description, price, count)) {
      logger.log(event.requestContext, 400);
      return badRequestResponse();
    }

    const productId = v4();

    const product: IProduct = {
        id: productId,
        title,
        description,
        price,
    }

    const stock: IStock = {
      product_id: productId,
      count
    }

    await productService.createProduct(product, stock);

    logger.log(event.requestContext);
    
    return formatJSONResponse({ product, stock });
    
  } catch (error) {
    logger.log(event.requestContext, 500);
    return internalServerErrorResponse();
  }
}

export const main = middyfy(createProduct);
