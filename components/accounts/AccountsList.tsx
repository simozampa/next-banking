import { BankAccount } from "@/utils/types";

export default function AccountList({ accounts }: { accounts: BankAccount[] }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Account List</h2>
      <ul className="space-y-2">
        <li className="text-xs grid grid-cols-3 space-x-2 p-4">
          <p>ID</p>
          <p>Customer ID</p>
          <p>Balance</p>
        </li>
        {accounts.map((account) => (
          <li
            key={account.id}
            className="grid grid-cols-3 text-sm bg-white shadow rounded-lg p-4"
          >
            <p className="font-semibold">{account.id}</p>
            <p className="text-gray-600">{account.customerId}</p>
            <p className="text-gray-600">${account.balance.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
