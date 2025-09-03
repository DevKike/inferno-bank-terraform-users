import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'User registered with success!',
        data: {
          id: 123,
          name: 'John',
          lastName: 'Doe',
          phoneNumber: '1234567890',
          document: '1234567990',
        },
      }),
    };
  } catch (error) {
    console.error('Error registering user: ', error);
    throw error;
  }
};
