import {
  APIGatewayAuthorizerResult,
  APIGatewayRequestAuthorizerEventV2,
} from 'aws-lambda';
import { IJwtPayload } from '../../../domain/providers/jwt/interface/jwt-payload.interface';
import { JwtProvider } from '../../providers/jwt/jwt.provider';
import { ConfigurationProvider } from '../../providers/configuration/configuration.provider';

const generatePolicy = (
  principalId: string,
  effect: 'Allow' | 'Deny',
  resource: string,
  context?: Record<string, any>
): APIGatewayAuthorizerResult => ({
  principalId,
  policyDocument: {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource,
      },
    ],
  },
  ...(context && { context }),
});

const generateDenyPolicy = (principalId: string, resource: string) =>
  generatePolicy(principalId, 'Deny', resource);

const generateAllowPolicy = (
  principalId: string,
  resource: string,
  context: Record<string, any>
) => generatePolicy(principalId, 'Allow', resource, context);

export const handler = async (
  event: APIGatewayRequestAuthorizerEventV2
): Promise<APIGatewayAuthorizerResult> => {
  const jwtProvider = new JwtProvider(ConfigurationProvider.getInstance());

  try {
    let token: string | undefined;

    if (event.headers?.authorization) {
      const authHeader = event.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      } else if (authHeader.startsWith('token ')) {
        token = authHeader.substring(6);
      }
    }

    if (!token) {
      console.error('401 - No authorization token provided');
      return generateDenyPolicy('unauthorized', event.routeArn);
    }

    const decoded = jwtProvider.verify<IJwtPayload>(token);

    const apiArn = event.routeArn.replace(/\/routes\/.*/, '/*');

    return generateAllowPolicy(decoded.id, event.routeArn, {
      userId: decoded.id,
      email: decoded.email,
      name: decoded.name,
    });
  } catch (error) {
    console.error('401 - JWT verification failed', error);

    return generateDenyPolicy('unauthorized', event.routeArn);
  }
};
