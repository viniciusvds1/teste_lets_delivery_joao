import { CustomerService } from '../services/customer.service';
import { CustomerRepository } from '../repositories/customer.repository';
import { Customer } from '../types/customer';

jest.mock('../repositories/customer.repository');

describe('CustomerService', () => {
  let service: CustomerService;
  let mockRepository: jest.Mocked<CustomerRepository>;

  beforeEach(() => {
    mockRepository = new CustomerRepository() as jest.Mocked<CustomerRepository>;
    service = new CustomerService();
  });

  const mockCustomer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'> = {
    fullName: 'John Doe',
    birthDate: '1990-01-01',
    isActive: true,
    addresses: [{
      street: 'Main St',
      number: '123',
      neighborhood: 'Downtown',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    }],
    contacts: [{
      email: 'john@example.com',
      phone: '1234567890',
      isPrimary: true
    }]
  };

  describe('createCustomer', () => {
    it('should create a customer successfully', async () => {
      const createdCustomer = {
        ...mockCustomer,
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      };

      mockRepository.create.mockResolvedValue(createdCustomer);

      const result = await service.createCustomer(mockCustomer);

      expect(result).toEqual(createdCustomer);
      expect(mockRepository.create).toHaveBeenCalled();
    });

    it('should throw error when no primary contact is provided', async () => {
      const invalidCustomer = {
        ...mockCustomer,
        contacts: [{
          email: 'john@example.com',
          phone: '1234567890',
          isPrimary: false
        }]
      };

      await expect(service.createCustomer(invalidCustomer))
        .rejects
        .toThrow('Exactly one primary contact is required');
    });
  });
});