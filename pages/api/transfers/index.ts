import { getTransferHistory, transferFunds } from "@/utils/helpers";
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
  const { fromAccountId, toAccountId, amount } = req.body;

  if (
    !fromAccountId ||
    typeof fromAccountId !== "string" ||
    !toAccountId ||
    typeof toAccountId !== "string" ||
    !amount ||
    typeof amount !== "number"
  ) {
    return res.status(400).json({ error: "Invalid body parameters" });
  }

  // Attempt to transfer the funds
  const result = transferFunds(fromAccountId, toAccountId, amount);

  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }

  return res.status(201).json({ message: "Transfer successful" });
}

function GET(req: NextApiRequest, res: NextApiResponse) {
  // If an accountId is specified in query, return the transfer history
  const { accountId } = req.query;
  if (typeof accountId === "string") {
    const history = getTransferHistory(accountId);
    return res.status(200).json(history);
  }

  return res
    .status(400)
    .json({ error: "Please provide an accountId to get history" });
}
