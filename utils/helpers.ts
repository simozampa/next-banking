import { db } from "./db";
import { BankAccount, Transfer } from "./types";

/**
 * Create a new account with an initial deposit.
 * Returns the created account.
 */
export function createAccount(
  customerId: string,
  initialDeposit: number
): BankAccount {
  const newAccount: BankAccount = {
    id: `account_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    customerId: customerId,
    balance: initialDeposit,
  };

  // Store the new account in the db
  db.accounts.push(newAccount);
  return newAccount;
}

/**
 * Find an account by ID.
 */
export function getAccountById(accountId: string): BankAccount | undefined {
  return db.accounts.find((x) => x.id === accountId);
}

/**
 * Transfer an amount between two accounts.
 */
export function transferFunds(
  fromAccountId: string,
  toAccountId: string,
  amount: number
): { success: boolean; error?: string } {
  if (amount <= 0) {
    return { success: false, error: "Transfer amount must be positive" };
  }

  const fromAccount = getAccountById(fromAccountId);
  const toAccount = getAccountById(toAccountId);

  if (!fromAccount) {
    return { success: false, error: "From account not found" };
  }

  if (!toAccount) {
    return { success: false, error: "To account not found" };
  }

  if (fromAccount.balance < amount) {
    return { success: false, error: "Insufficient balance" };
  }

  // Record this transaction in the db
  const transfer: Transfer = {
    fromAccountId,
    toAccountId,
    amount,
    timestamp: new Date(),
  };

  db.transfers.push(transfer);

  // Finally update the of the from account in the db
  const fromAccountNewBalance = fromAccount.balance - amount;
  fromAccount.balance = fromAccountNewBalance;

  // And the balance of the to account in the db
  const toAccountNewBalance = toAccount.balance + amount;
  toAccount.balance = toAccountNewBalance;

  return { success: true };
}

/**
 * Get transfer history for a given account.
 */
export function getTransferHistory(accountId: string): Transfer[] {
  if (!accountId) {
    return [];
  }

  // Retrieve all transfers from and to the account
  const history = db.transfers.filter((x) => x.fromAccountId || x.toAccountId);

  return history;
}
