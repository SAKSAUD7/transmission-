import { Router, type IRouter } from "express";

const router: IRouter = Router();

interface ContactEntry {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message?: string;
  receivedAt: string;
}

const contacts: ContactEntry[] = [];

router.post("/contact", (req, res) => {
  const { firstName, lastName, phone, email, message } = req.body as Record<string, string>;

  if (!firstName || !lastName || !phone || !email) {
    res.status(400).json({ error: "First name, last name, phone, and email are required." });
    return;
  }

  if (!email.includes("@")) {
    res.status(400).json({ error: "Invalid email address." });
    return;
  }

  const entry: ContactEntry = {
    firstName: String(firstName).trim(),
    lastName: String(lastName).trim(),
    phone: String(phone).trim(),
    email: String(email).trim().toLowerCase(),
    message: message ? String(message).trim() : undefined,
    receivedAt: new Date().toISOString(),
  };

  contacts.push(entry);
  req.log.info({ email: entry.email, name: `${entry.firstName} ${entry.lastName}` }, "New contact form submission");
  res.json({ success: true, message: "Thank you! We will contact you shortly." });
});

router.get("/contacts", (_req, res) => {
  res.json({ contacts, total: contacts.length });
});

export default router;
