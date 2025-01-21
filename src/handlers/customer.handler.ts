import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { CustomerService } from '../services/customer.service';

export class CustomerHandler {
  private service: CustomerService;

  constructor() {
    this.service = new CustomerService();
  }

  private createResponse(statusCode: number, body: any): APIGatewayProxyResult {
    return {
      statusCode,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }

  async create(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const customerData = JSON.parse(event.body || '');
      const customer = await this.service.createCustomer(customerData);
      return this.createResponse(201, customer);
    } catch (error) {
      return this.createResponse(400, { message: "error" });
    }
  }

  async get(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const id = event.pathParameters?.id;
      if (!id) {
        return this.createResponse(400, { message: 'Customer ID is required' });
      }
      const customer = await this.service.getCustomer(id);
      return this.createResponse(200, customer);
    } catch (error) {
      return this.createResponse(404, { message: error.message });
    }
  }

  async update(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const id = event.pathParameters?.id;
      if (!id) {
        return this.createResponse(400, { message: 'Customer ID is required' });
      }

      const customerData = JSON.parse(event.body || '');
      const customer = await this.service.updateCustomer(id, customerData);
      return this.createResponse(200, customer);
    } catch (error) {
      return this.createResponse(404, { message: error.message });
    }
  }

  async delete(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const id = event.pathParameters?.id;
      if (!id) {
        return this.createResponse(400, { message: 'Customer ID is required' });
      }

      await this.service.deleteCustomer(id);
      return this.createResponse(204, null);
    } catch (error) {
      return this.createResponse(404, { message: error.message });
    }
  }

  async list(): Promise<APIGatewayProxyResult> {
    try {
      const customers = await this.service.listCustomers();
      return this.createResponse(200, customers);
    } catch (error) {
      return this.createResponse(500, { message: error.message });
    }
  }
}