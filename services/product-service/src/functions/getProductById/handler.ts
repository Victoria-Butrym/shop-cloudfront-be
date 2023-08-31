import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import productService from '../../resources/products/products.service';

import schema from './schema';
import { notFoundResponse, internalServerErrorResponse } from '../../libs/api-gateway';
import logger from '../../utils/logger.utils';
import stocksService from 'src/resources/stocks/stocks.service';

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const { productId } = event.pathParameters;
    const product = await productService.getProductById(productId);
    const stock = await stocksService.getStockByProductId(productId);

    if (product) {
      logger.log(event.requestContext);
      return formatJSONResponse({ ...product, count: stock.count });
    } else {
      logger.log(event.requestContext, 404);
      return notFoundResponse();
    };
    
  } catch (error) {
      logger.log(event.requestContext, 500, error.message);
      return internalServerErrorResponse();
  }
}

export const main = middyfy(getProductById);
