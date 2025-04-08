// utils/sendConfirmationEmail.ts
import nodemailer from "nodemailer";

interface ConfirmationEmailProps {
  username: string;
  userEmail: string;
  date : Date
}

export async function sendAppointmentConfirmationEmail({
  username,
  userEmail,
  date
}: ConfirmationEmailProps): Promise<void> {
  // Format current date and time
  const now = new Date(date);
  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Set up the transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Chop Clock" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Your Appointment Confirmation | Chop Clock",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f0f4ff; color: #1e3a8a;">
        <h2>Hello ${username},</h2>
        <p>Thank you for booking with <strong>Chop Clock</strong>! Your appointment has been successfully confirmed.</p>
        <div style="margin: 20px 0; padding: 15px; background-color: #ffffff; border-left: 4px solid #3b82f6;">
          <p><strong>📅 Date:</strong> ${formattedDate}</p>
          <p><strong>⏰ Time:</strong> ${formattedTime}</p>
          <p><strong>📍 Location:</strong> 123 Barber St, Groom City</p>
        </div>
        <p>If you have any questions or need to reschedule, feel free to contact us.</p>
        <p>We look forward to seeing you soon!</p>
        <br />
        <p>Best regards,</p>
        <p><strong>Chop Clock Team</strong></p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Confirmation email sent to ${userEmail}`);
  } catch (error) {
    console.error("❌ Failed to send confirmation email:", error);
    throw new Error("Failed to send confirmation email");
  }
}
