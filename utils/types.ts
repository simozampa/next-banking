export interface Database {
  customers: Customer[];
  accounts: BankAccount[];
  transfers: Transfer[];
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BankAccount {
  id: string;
  customerId: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transfer {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  timestamp: Date;
}

export enum NotificationType {
  CONFIRMATION = "confimation",
  ERROR = "error",
}
