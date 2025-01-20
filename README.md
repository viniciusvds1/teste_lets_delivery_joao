# AWS Serverless CRUD API

This project implements a serverless CRUD API for customer management using AWS Lambda, API Gateway, and DynamoDB.

## Architecture Overview

The application follows a clean architecture pattern with the following components:

1. **Handlers**: API Gateway event handlers that process HTTP requests
2. **Services**: Business logic layer
3. **Repositories**: Data access layer for DynamoDB
4. **Types**: TypeScript interfaces and types

## Project Structure

```
src/
├── handlers/         # Lambda function handlers
├── services/        # Business logic
├── repositories/    # Data access layer
├── types/          # TypeScript types
└── tests/          # Unit tests
```

## Prerequisites

- Node.js v20.x
- AWS CLI configured with appropriate credentials
- Docker (for local DynamoDB)

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start local DynamoDB:
   ```bash
   npm run start:dynamodb
   ```

3. Run tests:
   ```bash
   npm test
   ```

4. Run test coverage:
   ```bash
   npm run test:coverage
   ```

## Deployment

1. Build the TypeScript code:
   ```bash
   npm run build
   ```

2. Deploy using AWS SAM:
   ```bash
   sam build
   sam deploy --guided
   ```

## API Endpoints

- POST /customers - Create a new customer
- GET /customers/{id} - Get a customer by ID
- PUT /customers/{id} - Update a customer
- DELETE /customers/{id} - Delete a customer
- GET /customers - List all customers

## Request/Response Examples

### Create Customer

Request:
```json
POST /customers
{
  "fullName": "John Doe",
  "birthDate": "1990-01-01",
  "isActive": true,
  "addresses": [
    {
      "street": "Main St",
      "number": "123",
      "neighborhood": "Downtown",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001"
    }
  ],
  "contacts": [
    {
      "email": "john@example.com",
      "phone": "1234567890",
      "isPrimary": true
    }
  ]
}
```

Response:
```json
{
  "id": "uuid",
  "fullName": "John Doe",
  "birthDate": "1990-01-01",
  "isActive": true,
  "addresses": [...],
  "contacts": [...],
  "createdAt": "2023-11-01T00:00:00.000Z",
  "updatedAt": "2023-11-01T00:00:00.000Z"
}
```

## Code Flow

1. **API Gateway** receives the HTTP request and triggers the corresponding Lambda function

2. **Lambda Handler** (src/handlers):
   - Validates the request
   - Parses the input
   - Calls the appropriate service method
   - Returns a formatted response

3. **Service Layer** (src/services):
   - Implements business logic
   - Validates business rules
   - Coordinates with the repository layer

4. **Repository Layer** (src/repositories):
   - Handles all DynamoDB operations
   - Implements data access patterns
   - Manages database transactions

5. **DynamoDB**:
   - Stores customer data
   - Provides fast, consistent access to data

## Testing Strategy

The project includes comprehensive unit tests focusing on:

1. Business logic in services
2. Data access patterns in repositories
3. Request handling in Lambda functions

Test coverage reports are generated using Jest.

## Security Considerations

1. Input validation at multiple layers
2. Proper IAM roles and policies
3. API Gateway authentication (can be added as needed)
4. DynamoDB encryption at rest

## Error Handling

The application implements a consistent error handling strategy:

1. Custom error types for different scenarios
2. HTTP status codes mapping to error conditions
3. Detailed error messages for debugging
4. Production-safe error responses

## Monitoring and Logging

AWS CloudWatch is used for:

1. Lambda function logs
2. API Gateway access logs
3. DynamoDB operation logs
4. Custom metrics and alarms