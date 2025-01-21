import { v4 as uuidv4 } from 'uuid';
import { Customer, Contact, Address } from '../types/customer';
import { CustomerRepository } from '../repositories/customer.repository';

export class CustomerService {
  private repository: CustomerRepository;

  constructor() {
    this.repository = new CustomerRepository();
  }

  private validateContacts(contacts: Contact[]): void {
    if (!contacts.length) {
      throw new Error('At least one contact is required');
    }

    const primaryContacts = contacts.filter(contact => contact.isPrimary);
    if (primaryContacts.length !== 1) {
      throw new Error('Exactly one primary contact is required');
    }
  }

  private validateCustomer(customer: Partial<Customer>): void {
    if (customer.contacts) {
      this.validateContacts(customer.contacts);
    }
  }

  async createCustomer(customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Promise<Customer> {
    this.validateCustomer(customerData);

    const customer: Customer = {
      ...customerData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return this.repository.create(customer);
  }

  async getCustomer(id: string): Promise<Customer> {
    console.log('cai aqui 3')
    const customer = await this.repository.getById(id);
    console.log(customer)
    if (!customer) {
      throw new Error('Customer not found');
    }
    return customer;
  }

  async updateCustomer(id: string, customerData: Partial<Customer>): Promise<Customer> {
    this.validateCustomer(customerData);

    const customer = await this.repository.getById(id);
    if (!customer) {
      throw new Error('Customer not found');
    }

    const updatedCustomer = {
      ...customerData,
      updatedAt: new Date().toISOString()
    };

    return this.repository.update(id, updatedCustomer);
  }

  async deleteCustomer(id: string): Promise<void> {
    const customer = await this.repository.getById(id);
    if (!customer) {
      throw new Error('Customer not found');
    }

    await this.repository.delete(id);
  }

  async listCustomers(): Promise<Customer[]> {
    return this.repository.list();
  }
}