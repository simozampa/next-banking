import CreateCustomerForm from "@/components/customers/CreateCustomerForm";
import CustomerList from "@/components/customers/CustomersList";
import { Customer } from "@/utils/types";
import { useState } from "react";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const refreshCustomers = async () => {
    try {
      const res = await fetch("/api/customers");
      const data = await res.json();
      if (!res.ok) {
        alert("Error fetching customers");
      }
      setCustomers(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <CreateCustomerForm onCustomerCreated={refreshCustomers} />
      <CustomerList customers={customers} />
    </div>
  );
}
