export interface Contact {
  email: string;
  phone: string;
  isPrimary: boolean;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Customer {
  id: string;
  fullName: string;
  birthDate: string;
  isActive: boolean;
  addresses: Address[];
  contacts: Contact[];
  createdAt: string;
  updatedAt: string;
}