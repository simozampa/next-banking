export interface Database {
  accounts: BankAccount[];
  transfers: Transfer[];
}

export interface BankAccount {
  id: string;
  customerId: string;
  balance: number;
}

export interface Transfer {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  timestamp: Date;
}
