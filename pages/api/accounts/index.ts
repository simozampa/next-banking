import { db } from "@/utils/db";
import { createAccount, getCustomerById } from "@/utils/helpers";
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

  if (
    !customerId ||
    typeof customerId !== "string" ||
    !initialDeposit ||
    typeof initialDeposit !== "number" ||
    initialDeposit === 0
  ) {
    return res.status(400).json({ error: "Invalid body parameters" });
  }

  const customer = getCustomerById(customerId);

  if (!customer) {
    return res.status(400).json({ error: "Customer not found." });
  }

  // Create a new account in the db
  const newAccount = createAccount(customerId, initialDeposit);
  return res.status(200).json(newAccount);
}

function GET(req: NextApiRequest, res: NextApiResponse) {
  // Retrieve all accounts from the db
  const accounts = db.accounts;

  return res.status(200).json(accounts);
}
