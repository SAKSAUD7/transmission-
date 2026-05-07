import { Router, type IRouter } from "express";
import { db, contactsTable } from "@workspace/db";
import { CreateContactBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const result = CreateContactBody.safeParse(req.body);

  if (!result.success) {
    const firstError = result.error.issues[0];
    res.status(400).json({
      error: firstError
        ? `${firstError.path.join(".")}: ${firstError.message}`
        : "Invalid request body.",
    });
    return;
  }

  const data = result.data;

  const [inserted] = await db
    .insert(contactsTable)
    .values({
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      phone: data.phone.trim(),
      email: data.email.trim().toLowerCase(),
      message: data.message?.trim() ?? null,
    })
    .returning();

  req.log.info(
    { id: inserted.id, email: inserted.email, name: `${inserted.firstName} ${inserted.lastName}` },
    "New contact form submission saved to DB",
  );

  res.json({
    success: true,
    message: "Thank you! We will contact you shortly.",
    id: inserted.id,
  });
});

router.get("/contacts", async (_req, res) => {
  const contacts = await db.select().from(contactsTable).orderBy(contactsTable.createdAt);
  res.json({ contacts, total: contacts.length });
});

export default router;
