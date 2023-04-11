import { internalServerErrorResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import productService from '../../resources/products/products.service';
import stocksService from '../../resources/stocks/stocks.service';

import schema from './schema';
import logger from '../../utils/logger.utils';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const productsList = await productService.getProductsList();
    const stocksList = await stocksService.getStocksList();

    logger.log(event.requestContext);

    return formatJSONResponse(productService.joinProductAndStockList(productsList, stocksList));
  } catch (error) {
    logger.log(event.requestContext, 500, error.message);
    return internalServerErrorResponse();
  }
}

export const main = middyfy(getProductsList);
