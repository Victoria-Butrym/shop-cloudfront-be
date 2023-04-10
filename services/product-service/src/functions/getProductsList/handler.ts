import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import productService from '../../resources/products/products.service';
import stocksService from '../../resources/stocks/stocks.service';

import schema from './schema';

const join = (productsList, stocksList) => {
  return productsList.map((product) => ({
    ...product,
    count: stocksList.find((stock) => stock.product_id === product.id)?.count,
  }))
}

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  const productsList = await productService.getProductsList();
  const stocksList = await stocksService.getStocksList();

  return formatJSONResponse(join(productsList, stocksList));
}

export const main = middyfy(getProductsList);
