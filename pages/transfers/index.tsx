import TransferForm from "@/components/transfers/TransferForm";
import TransferHistory from "@/components/transfers/TransferHistory";
import { BankAccount } from "@/utils/types";
import { useEffect, useState } from "react";

export default function TransfersPage() {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const res = await fetch("/api/accounts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setAccounts(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <TransferForm accounts={accounts} />
      <TransferHistory accounts={accounts} />
    </div>
  );
}
