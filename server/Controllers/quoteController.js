const quoteData = require("../Models/contactModel");
const nodemailer = require("nodemailer");

const quoteData = async (req, res) => {
  try {
    const { email, phone, name, message } = req.body;

    // Save data to MongoDB
    const contacts = new quoteData({
      name,
      email,
      phone,
      message,
    });

    await contacts.save();

    // Set up Node Mailer transport
    const transporter = nodemailer.createTransport({
      // Specify your email service details (SMTP or other service)
      service: "gmail",
      auth: {
        user: "sahanirakesh877@gmail.com",
        pass: "pnvh gmbs hzrd wdzc",
      },
    });

    // Compose email message for client
    const clientMailOptions = {
      from: "sahanirakesh877@gmail.com",
      to: email, // Client's email
      subject: "Your message has been recorded",
      html: `
        <h1>Hey, You Got Email From Clients</h1>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Subject: ${subject}</p>
        <p>Message: ${message}</p>
        <p>Your response has been sent.</p>
      `,
    };

    // Compose email message for admin
    const adminMailOptions = {
      from: "sahanirakesh877@gmail.com",
      to: "sahaniranzeth877@gmail.com", // Admin's email
      subject: "Contact Form Submission - You've Got Email!",
      html: `
        <h1>Hey, You Got Email From Clients</h1>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Subject: ${subject}</p>
        <p>Message: ${message}</p>
        <p>Your response has been sent.</p>
      `,
    };

    // Send email to client
    transporter.sendMail(clientMailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ error: "Email could not be sent to client" });
      }
      console.log("Client Email sent: " + info.response);
    });

    // Send email to admin
    transporter.sendMail(adminMailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ error: "Email could not be sent to admin" });
      }
      console.log("Admin Email sent: " + info.response);
    });

    res.status(200).json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { quoteData };
