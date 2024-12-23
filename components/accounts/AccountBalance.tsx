import { BankAccount, NotificationType } from "@/utils/types";
import { useEffect, useState } from "react";
import Notification from "../Notification";

interface TransferHistoryProps {
  accounts: BankAccount[];
}

export default function AccountBalance({ accounts }: TransferHistoryProps) {
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [accountBalance, setAccountBalance] = useState<number | null>(null);
  const [displayNotification, setDisplayNotification] = useState<{
    type: NotificationType;
    message: string;
  } | null>();

  useEffect(() => {
    if (!displayNotification) {
      return;
    }

    setTimeout(() => {
      setDisplayNotification(null);
    }, 4000);
  }, [displayNotification]);

  useEffect(() => {
    if (accounts.length === 0) {
      return;
    }

    setSelectedAccountId(accounts[0].id);
  }, [accounts]);

  const getTransferHistory = async () => {
    if (!selectedAccountId) {
      setDisplayNotification({
        type: NotificationType.ERROR,
        message: "You must enter the account id",
      });
      return;
    }
    try {
      const res = await fetch(`/api/accounts/${selectedAccountId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.error || "Error fetching balance");
        setDisplayNotification({
          type: NotificationType.ERROR,
          message: data.error,
        });
        return;
      }

      setAccountBalance(data.balance);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {displayNotification && (
        <Notification
          message={displayNotification.message}
          type={displayNotification.type}
        />
      )}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-md font-semibold mb-4">Account Balance</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm mb-2"
            htmlFor="selectedAccountId"
          >
            Account ID
          </label>
          <select
            className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="selectedAccountId"
            value={selectedAccountId}
            disabled={accounts.length === 0}
            onChange={(e) => {
              setSelectedAccountId(e.target.value);
              setAccountBalance(null);
            }}
          >
            {accounts.map((account) => (
              <option value={account.id} key={account.id}>
                {account.id}
              </option>
            ))}
          </select>
        </div>
        <button
          className="text-sm bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
          onClick={getTransferHistory}
        >
          Get Balance
        </button>
        {accountBalance !== null && (
          <ul className="space-y-2">
            <li className="grid grid-cols-1 border-b pb-2 text-xs">
              <p>Balance:</p>
            </li>
            <li className="grid grid-cols-1 border-b pb-2 text-sm">
              <p>${accountBalance.toFixed(2)}</p>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}
