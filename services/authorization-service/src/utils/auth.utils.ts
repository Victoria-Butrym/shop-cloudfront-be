import { APIGatewayAuthorizerResult, PolicyDocument } from "aws-lambda"

export enum Effect {
    Allow = 'Allow',
    Deny = 'Deny'
}

const generatePolicyDocument = (effect: Effect, resource: string): PolicyDocument => ({
    Version: '2012-10-17',
    Statement: [{
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource
    }]
})

export const generateResponse = (principalId: string, effect: Effect, resource: string): APIGatewayAuthorizerResult => ({
    principalId,
    policyDocument: generatePolicyDocument(effect, resource)
})

export const tokenDecoder = (token: string): string[] => Buffer.from(token, 'base64').toString('utf-8').split(':')