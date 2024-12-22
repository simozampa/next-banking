import TransferForm from "@/components/transfers/TransferForm";
import TransferHistory from "@/components/transfers/TransferHistory";
import { useState } from "react";

export default function TransfersPage() {
  const [selectedAccountId, setSelectedAccountId] = useState("");

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <TransferForm />
      <TransferHistory
        selectedAccountId={selectedAccountId}
        setSelectedAccountId={setSelectedAccountId}
      />
    </div>
  );
}
