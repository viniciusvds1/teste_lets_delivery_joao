import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, DeleteCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { Customer } from '../types/customer';
import { DynamoDBService } from '../services/dynamodb.service';
import { error } from 'console';

export class CustomerRepository {
  private readonly tableName = 'Customers';
  private readonly docClient: DynamoDBDocumentClient;

  constructor() {
    this.docClient = DynamoDBService.getInstance().getDocumentClient();
  }

  async create(customer: Customer): Promise<Customer> {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: customer,
      ConditionExpression: 'attribute_not_exists(id)'
    });
    try{
      await this.docClient.send(command)
      return customer 
    }catch{
      throw error

    }  
  }

  async getById(id: string): Promise<Customer | null> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: { id }
    });

    const response = await this.docClient.send(command);
    return response.Item as Customer || null;
  }

  async update(id: string, customer: Partial<Customer>): Promise<Customer> {
    const updateExpression = Object.keys(customer)
      .map(key => `#${key} = :${key}`)
      .join(', ');

    const expressionAttributeNames = Object.keys(customer).reduce((acc, key) => ({
      ...acc,
      [`#${key}`]: key
    }), {});

    const expressionAttributeValues = Object.entries(customer).reduce((acc, [key, value]) => ({
      ...acc,
      [`:${key}`]: value
    }), {});

    const command = new UpdateCommand({
      TableName: this.tableName,
      Key: { id },
      UpdateExpression: `SET ${updateExpression}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    });

    const response = await this.docClient.send(command);
    return response.Attributes as Customer;
  }

  async delete(id: string): Promise<void> {
    const command = new DeleteCommand({
      TableName: this.tableName,
      Key: { id }
    });

    await this.docClient.send(command);
  }

  async list(): Promise<Customer[]> {
    const command = new QueryCommand({
      TableName: this.tableName
    });

    const response = await this.docClient.send(command);
    return response.Items as Customer[];
  }
}