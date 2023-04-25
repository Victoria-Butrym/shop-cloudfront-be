import { formatJSONResponse } from '@libs/api-gateway';
import { internalServerErrorResponse } from '../../../../import-service/src/libs/api-gateway';
import { SQSEvent } from 'aws-lambda';
import productService from '../../resources/products/products.service';

const catalogBatchProcess = async (event: SQSEvent) => {
  try {
    const records = event.Records.map(({ body }) => JSON.parse(body));

    const joined = await Promise.all(
      records.map(({ title, description, price, count, id }) => {
        return {
          product: { title, description, price, id },
          stock: { product_id: id, count }
        }
      })
    );

    for await (let { product, stock } of joined) {
      console.log('---PRODUCT_STOCK---', { product, stock });
      await productService.createProduct(product, stock);
    }

    return formatJSONResponse({ message: 'succeed' });
  } catch (error) {
    console.log('ERROR', error.message)
    return internalServerErrorResponse();
  }
};

export const main = catalogBatchProcess;
