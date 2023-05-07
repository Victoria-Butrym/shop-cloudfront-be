import { APIGatewayAuthorizerResult, APIGatewayRequestAuthorizerEvent } from 'aws-lambda';
import { Effect, generateResponse } from 'src/utils/auth.utils';
import { tokenDecoder } from '../../utils/auth.utils'

const basicAuthorizer = async (event: APIGatewayRequestAuthorizerEvent): Promise<APIGatewayAuthorizerResult | Error> => {
  try {
    const { headers, methodArn } = event;

    if (!headers.Authorization) throw new Error('Not Authorized');

    const token = headers.Authorization.split(' ')[1];
    const [username, password] = tokenDecoder(headers.Authorization.split(' ')[1]);

    
    const response = (username === process.env.USERNAME && password === process.env.PASSWORD)
      ? generateResponse(token, Effect.Allow, methodArn)
      : generateResponse(token, Effect.Deny, methodArn);

    console.log('---Auth---', { event, response });
    return response;
  } catch (error) {
    return new Error(error.message);
  }
};
export const main = basicAuthorizer;
