import { Customer } from "@/utils/types";

export default function CustomerList({ customers }: { customers: Customer[] }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Customer List</h2>
      <ul className="space-y-2">
        <li className="text-sm grid grid-cols-3 space-x-2 p-4">
          <p>id</p>
          <p>name</p>
          <p>email</p>
        </li>
        {customers.map((customer) => (
          <li
            key={customer.id}
            className="text-sm grid grid-cols-3 space-x-2 bg-white shadow rounded p-4"
          >
            <p>{customer.id}</p>
            <p className="font-semibold">
              {customer.firstName} {customer.lastName}
            </p>
            <p className="text-gray-600">({customer.email})</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
