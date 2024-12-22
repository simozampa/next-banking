import { BankAccount } from "@/utils/types";

export default function AccountList({ accounts }: { accounts: BankAccount[] }) {
  return (
    <div className="shadow-md px-8 py-6 rounded">
      <h2 className="text-md font-semibold mb-4">Account List</h2>
      <ul className="space-y-2">
        <li className="text-xs grid grid-cols-3 space-x-2 p-4">
          <p>ID</p>
          <p className="hidden sm:block">Customer ID</p>
          <p>Balance</p>
        </li>
        {accounts.map((account) => (
          <li
            key={account.id}
            className="grid grid-cols-2 sm:grid-cols-3 text-sm bg-white shadow rounded-lg p-4"
          >
            <p className="truncate">{account.id}</p>
            <p className="hidden sm:block text-gray-600">
              {account.customerId}
            </p>
            <p className="text-gray-600">${account.balance.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
