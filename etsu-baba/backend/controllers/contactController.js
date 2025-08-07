import nodemailer from "nodemailer";
import { validationResult } from "express-validator";

export const sendMessage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Inquiry: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}
Message:
${message}
      `,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Message sent successfully!" });

  } catch (error) {
    res.status(500).json({ error: "Failed to send message. Try again later." });
  }
};