import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";
import { corsHeaders } from "src/utils/response.utils";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const formatJSONResponse = (response: any, statusCode = 200) => {
  return {
    statusCode,
    body: JSON.stringify(response),
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    }
  }
}

export const notFoundResponse = (response = { error: { message: 'Not Found:(' } }, statusCode = 404) => {
  return {
    statusCode,
    body: JSON.stringify(response),
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    }
  }
}

export const badRequestResponse = (response = { error: { message: 'Bad Request:(' } }, statusCode = 400) => {
  return {
    statusCode,
    body: JSON.stringify(response),
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    }
  }
}

export const internalServerErrorResponse = (response = { error: { message: 'Internal server error:(' } }, statusCode = 500) => {
  return {
    statusCode,
    body: JSON.stringify(response),
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    }
  }
}
