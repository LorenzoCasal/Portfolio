import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      replyTo: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `Nuevo mensaje de ${name}`,
      text: `
      Nombre: ${name}
      Email: ${email}

      Mensaje:
      ${message}
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Error enviando mensaje" });
  }
}