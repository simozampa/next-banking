// pages/api/accounts.ts
import { db } from "@/utils/db";
import { createAccount } from "@/utils/helpers";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return POST(req, res);
  }

  if (req.method === "GET") {
    return GET(req, res);
  }

  return res.status(405).json({ error: "Method not allowed" });
}

function POST(req: NextApiRequest, res: NextApiResponse) {
  const { customerId, initialDeposit } = req.body;

  if (typeof customerId !== "string" || typeof initialDeposit !== "number") {
    return res.status(400).json({ errorMessage: "Invalid body parameters" });
  }

  const newAccount = createAccount(customerId, initialDeposit);
  return res.status(200).json(newAccount);
}

function GET(req: NextApiRequest, res: NextApiResponse) {
  const accounts = db.accounts;

  return res.status(200).json(accounts);
}
