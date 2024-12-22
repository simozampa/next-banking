import { Customer, NotificationType } from "@/utils/types";
import { useEffect, useState } from "react";
import Notification from "../Notification";

export default function CreateAccountForm({
  onAccountCreated,
}: {
  onAccountCreated: () => void;
}) {
  const [customerId, setCustomerId] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [initialDeposit, setInitialDeposit] = useState(0);
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
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await fetch("/api/customers");
      const data = await res.json();
      if (!res.ok) {
        console.error("Error fetching customers");
      }
      setCustomers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const createAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: customerId,
          initialDeposit: Number(initialDeposit),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data.error || "Error creating account");
        setDisplayNotification({
          type: NotificationType.ERROR,
          message: data.error,
        });

        return;
      }
      setCustomerId("");
      setInitialDeposit(0);
      onAccountCreated();
      console.log(`Account created: ${data.id}`);
      setDisplayNotification({
        type: NotificationType.CONFIRMATION,
        message: "Account created succesfully",
      });
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
      <form
        onSubmit={createAccount}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-md font-semibold mb-4">Create New Account</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="owner">
            Customer ID
          </label>
          <select
            className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="owner"
            defaultValue={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
            disabled={customers.length === 0}
          >
            {customers.map((customer) => (
              <option value={customer.id} key={customer.id}>
                {customer.id}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm mb-2"
            htmlFor="initialDeposit"
          >
            Initial Deposit
          </label>
          <input
            className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="initialDeposit"
            type="number"
            min="0"
            step="0.01"
            value={initialDeposit}
            onChange={(e) => setInitialDeposit(Number(e.target.value))}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-indigo-500 text-sm hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Account
          </button>
        </div>
      </form>
    </>
  );
}
