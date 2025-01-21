import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { CustomerHandler } from './customer.handler';

const customerHandler = new CustomerHandler();

export const createCustomer = (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return customerHandler.create(event);
};

export const getCustomer = (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return customerHandler.get(event);
};

export const updateCustomer = (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return customerHandler.update(event);
};

export const deleteCustomer = (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return customerHandler.delete(event);
};

export const listCustomers = (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return customerHandler.list();
};