import { internalServerErrorResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import productService from '../../resources/products/products.service';
import stocksService from '../../resources/stocks/stocks.service';

import schema from './schema';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  try {
    const productsList = await productService.getProductsList();
    const stocksList = await stocksService.getStocksList();

    return formatJSONResponse(productService.joinProductAndStockList(productsList, stocksList));
  } catch (error) {
    return internalServerErrorResponse();
  }
}

export const main = middyfy(getProductsList);
