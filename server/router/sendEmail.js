const nodemailer = require("nodemailer");

exports.sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP,
    port: 587,
    service: process.env.SMTP_SERVICE, // Corrected typo in SMPT_SERVICE
    auth: {
      user: process.env.EMAIL, // Corrected typo in SMPT_EMAIL
      pass: process.env.SMPT_PASSWORD, // Corrected typo in SMPT_PASSWORD
    },
  });

  const mailOptions = {
    from: process.env.SMTP_EMAIL, // Set the sender's email address
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Message sent successfully: ${info.messageId}`);
  } catch (error) {
    console.log(`Error sending message: ${error}`);
  }
};
