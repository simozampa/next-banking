// pages/api/accounts/[id].ts
import { getAccountById } from "@/utils/helpers";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return GET(req, res);
  }

  return res.status(405).json({ error: "Method not allowed" });
}

function GET(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid account ID" });
  }

  const account = getAccountById(id);
  if (!account) {
    return res.status(404).json({ error: "Account not found" });
  }

  return res.status(200).json({
    id: account.id,
    customerId: account.customerId,
    balance: account.balance,
  });
}
