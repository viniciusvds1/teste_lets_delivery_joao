import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export class DynamoDBService {
  private static instance: DynamoDBService;
  private client: DynamoDBClient;
  private docClient: DynamoDBDocumentClient;

  private constructor() {
    this.client = new DynamoDBClient({
      region: "us-east-1",
      endpoint: "http://localhost:8000",
      credentials: {
        accessKeyId: "fakeMyKeyId",
        secretAccessKey: "fakeSecretKey"
      }
    });
    this.docClient = DynamoDBDocumentClient.from(this.client);
  }

  public static getInstance(): DynamoDBService {
    if (!DynamoDBService.instance) {
      DynamoDBService.instance = new DynamoDBService();
    }
    return DynamoDBService.instance;
  }

  public getDocumentClient(): DynamoDBDocumentClient {
    return this.docClient;
  }
}