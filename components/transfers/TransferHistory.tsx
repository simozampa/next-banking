import { BankAccount, NotificationType, Transfer } from "@/utils/types";
import { useEffect, useState } from "react";
import Notification from "../Notification";

interface TransferHistoryProps {
  accounts: BankAccount[];
}

export default function TransferHistory({ accounts }: TransferHistoryProps) {
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [transferHistory, setTransferHistory] = useState<Transfer[]>([]);
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

  const getTransferHistory = async () => {
    if (!selectedAccountId) {
      setDisplayNotification({
        type: NotificationType.ERROR,
        message: "You must enter the account id",
      });
      return;
    }
    try {
      const res = await fetch(`/api/transfers?accountId=${selectedAccountId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.error || "Error fetching history");
        setDisplayNotification({
          type: NotificationType.ERROR,
          message: data.error,
        });
        return;
      }

      setTransferHistory(data);
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
        <h2 className="text-md font-semibold mb-4">Transfer History</h2>
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
            onChange={(e) => setSelectedAccountId(e.target.value)}
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
          Get History
        </button>
        {transferHistory.length > 0 && (
          <ul className="space-y-2">
            <li className="grid grid-cols-4 border-b pb-2 text-xs">
              <p>From:</p>
              <p>To:</p>
              <p>Amount:</p>
              <p>Date:</p>
            </li>
            {transferHistory.map((transfer, index) => (
              <li
                key={index}
                className="grid grid-cols-4 border-b pb-2 text-sm"
              >
                <p className="truncate">{transfer.fromAccountId}</p>
                <p className="truncate">{transfer.toAccountId}</p>
                <p>${transfer.amount.toFixed(2)}</p>
                <p>{new Date(transfer.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
