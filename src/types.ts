export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

export interface BusinessDetails {
  logo?: string;
  name: string;
  address: string;
  email: string;
  phone: string;
}

export interface ClientInfo {
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface Invoice {
  id: string;
  date: string;
  dueDate: string;
  invoiceNumber: string;
  business: BusinessDetails;
  client: ClientInfo;
  items: LineItem[];
  taxRate: number;
  notes: string;
}