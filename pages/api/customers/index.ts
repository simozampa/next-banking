import { db } from "@/utils/db";
import { createCustomer } from "@/utils/helpers";
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
  const { firstName, lastName, email } = req.body;

  if (!firstName || !lastName || !email) {
    return res.status(400).json({ errorMessage: "Invalid body parameters" });
  }

  // Check if an account with this email already exists
  if (db.customers.some((x) => x.email === email)) {
    return res
      .status(400)
      .json({ errorMessage: "An account for this email already exists." });
  }

  // Create a new customer in the db
  const newAccount = createCustomer(firstName, lastName, email);
  return res.status(200).json(newAccount);
}

function GET(req: NextApiRequest, res: NextApiResponse) {
  // Retrieve all customers from the db
  const customers = db.customers;

  return res.status(200).json(customers);
}
