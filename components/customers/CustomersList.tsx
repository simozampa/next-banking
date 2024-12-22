import { Customer } from "@/utils/types";

export default function CustomerList({ customers }: { customers: Customer[] }) {
  return (
    <div className="shadow-md px-8 py-6 rounded">
      <h2 className="text-gray-900 text-md font-semibold mb-4">
        Customer List
      </h2>
      <ul className="space-y-2">
        <li className="text-xs grid grid-cols-2 sm:grid-cols-3 space-x-2 p-4">
          <p className="hidden sm:block">ID</p>
          <p>Name</p>
          <p>Email</p>
        </li>
        {customers.map((customer) => (
          <li
            key={customer.id}
            className="text-sm grid whitespace-nowrap grid-cols-2 sm:grid-cols-3 space-x-2 bg-white shadow rounded p-4"
          >
            <p className="hidden sm:block">{customer.id}</p>
            <p className="">
              {customer.firstName} {customer.lastName}
            </p>
            <p className="text-gray-600 text-sm">{customer.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
