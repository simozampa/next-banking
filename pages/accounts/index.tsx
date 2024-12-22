import AccountList from "@/components/accounts/AccountsList";
import CreateAccountForm from "@/components/accounts/CreateAccountForm";
import { BankAccount } from "@/utils/types";
import { useState } from "react";

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);

  const refreshAccounts = async () => {
    try {
      const res = await fetch("/api/accounts");
      const data = await res.json();
      setAccounts(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <CreateAccountForm onAccountCreated={refreshAccounts} />
      {accounts.length > 0 && <AccountList accounts={accounts} />}
    </div>
  );
}
