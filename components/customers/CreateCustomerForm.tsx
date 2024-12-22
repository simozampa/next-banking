import { useState } from "react";

export default function CreateCustomerForm({
  onCustomerCreated,
}: {
  onCustomerCreated: () => void;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const createNewCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.errorMessage || "Error creating customer");
      }

      console.log(`Customer created: ${JSON.stringify(data)}`);
      setFirstName("");
      setLastName("");
      setEmail("");
      onCustomerCreated();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={createNewCustomer}
      className="bg-white max-w-3xl shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-lg font-semibold mb-4">Create New Customer</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-2" htmlFor="firstName">
          First Name
        </label>
        <input
          className="shadow text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-2" htmlFor="lastName">
          Last Name
        </label>
        <input
          className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="shadow text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Create Customer
        </button>
      </div>
    </form>
  );
}
