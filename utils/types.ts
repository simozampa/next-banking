export interface Database {
  accounts: Account[];
  transfers: Transfer[];
}

export interface Account {
  id: string;
  owner: string;
  balance: number;
}

export interface Transfer {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  timestamp: Date;
}
