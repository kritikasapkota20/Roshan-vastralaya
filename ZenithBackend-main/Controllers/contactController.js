const nodemailer = require("nodemailer");

const contactData = async (req, res) => {
  try {
    const { email, phone, name, message } = req.body;

    console.log(req.body);

    const transporter = nodemailer.createTransport({
      host: "mail.annapurnamediequip.com", // Replace with your SMTP server
      port: 587, // For SSL use port 465, otherwise 587 for TLS
      secure: false, // Set to true for port 465
      auth: {
        user: process.env.MAIL, // Your email address
        pass: process.env.MAIL_PASSWORD, // Your email password
      },
    });

    const adminMailOptions = {
      from: process.env.MAIL,
      to: "account@annapurnamediequip.com",
      subject: "Got Message from client.",
      html: `
        <h1>Hey, You Got Email From Clients</h1>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
      `,
    };

    const clientMailOptions = {
      from: process.env.MAIL,
      to: req.body.email, // Client's email
      subject: "Your message has been recorded",
      html: `
        <h3>Thank You for contacting us. We will reach back to you soon.</h3>
      `,
    };

    transporter.sendMail(adminMailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Email server Error" });
      }
      transporter.sendMail(clientMailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Email server Error" });
        }
      });
    });

    res
      .status(200)
      .json({ success: true, message: "Emails sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { contactData };
