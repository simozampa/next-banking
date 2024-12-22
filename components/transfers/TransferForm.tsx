import { useState } from "react";
import ConfirmationModal from "../ConfirmationModal";

export default function TransferForm() {
  const [isDisplayingModal, setIsDisplayingModal] = useState(false);
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [transferAmount, setTransferAmount] = useState(0);

  const transferFunds = async () => {
    try {
      const res = await fetch("/api/transfers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromAccountId,
          toAccountId,
          amount: Number(transferAmount),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.error || "Error transferring funds");
      }

      console.log("Transfer Successful");
      setFromAccountId("");
      setToAccountId("");
      setTransferAmount(0);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <ConfirmationModal
        open={isDisplayingModal}
        amount={Number(transferAmount)}
        toAccount={toAccountId}
        onConfirm={() => {
          transferFunds();
        }}
        onCancel={() => setIsDisplayingModal(false)}
      />

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-md font-semibold mb-4">Transfer Funds</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm mb-2"
            htmlFor="fromAccountId"
          >
            From Account ID
          </label>
          <input
            className="shadow appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fromAccountId"
            type="text"
            value={fromAccountId}
            onChange={(e) => setFromAccountId(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm mb-2"
            htmlFor="toAccountId"
          >
            To Account ID
          </label>
          <input
            className="shadow appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="toAccountId"
            type="text"
            value={toAccountId}
            onChange={(e) => setToAccountId(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm mb-2"
            htmlFor="transferAmount"
          >
            Transfer Amount
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="transferAmount"
            type="number"
            min="0"
            step="0.01"
            value={transferAmount}
            onChange={(e) => setTransferAmount(Number(e.target.value))}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
            onClick={() => setIsDisplayingModal(true)}
          >
            Transfer Funds
          </button>
        </div>
      </div>
    </>
  );
}
