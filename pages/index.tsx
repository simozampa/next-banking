import CreateCustomerForm from "@/components/customers/CreateCustomerForm";
import CustomerList from "@/components/customers/CustomersList";
import { Customer } from "@/utils/types";
import { useEffect, useState } from "react";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    refreshCustomers();
  }, []);

  const refreshCustomers = async () => {
    try {
      const res = await fetch("/api/customers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error fetching customers");
        return;
      }

      setCustomers(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <CreateCustomerForm onCustomerCreated={refreshCustomers} />
      {customers.length > 0 && <CustomerList customers={customers} />}
    </div>
  );
}
