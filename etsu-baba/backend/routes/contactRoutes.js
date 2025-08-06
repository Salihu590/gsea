import express from "express";
import { body } from "express-validator";
import { sendMessage } from "../controllers/contactController.js";

const router = express.Router();

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("subject").notEmpty().withMessage("Subject is required"),
    body("message").notEmpty().withMessage("Message is required"),
  ],
  sendMessage
);

export default router;