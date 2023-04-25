import { formatJSONResponse } from '@libs/api-gateway';
import { internalServerErrorResponse } from '../../../../import-service/src/libs/api-gateway';
import { SQSEvent } from 'aws-lambda';
import productService from '../../resources/products/products.service';
import { SNS } from 'aws-sdk';

const catalogBatchProcess = async (event: SQSEvent) => {
  try {
    const sns = new SNS({ region: 'us-east-1' });
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
      await sns.publish({
        Message: `New product ${product.title} was created`,
        Subject: 'AWS Product Created Notification',
        TopicArn: 'arn:aws:sns:us-east-1:149435355961:createProductTopic',
        MessageAttributes: {
          price: {
            DataType: 'Number',
            StringValue: product.price
          }
        }
      }, (error) => {
        if (error) {
          console.log('---ERROR---', error);
        } else {
          console.log('Notification for product creation was sent')
        }
      })
    }

    return formatJSONResponse({ message: 'succeed' });
  } catch (error) {
    console.log('ERROR', error.message)
    return internalServerErrorResponse();
  }
};

export const main = catalogBatchProcess;
