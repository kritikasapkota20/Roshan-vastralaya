const nodemailer = require("nodemailer");

const contactData = async (req, res) => {
  try {
    const { email, phone, name, message } = req.body;

    console.log(req.body);

    const transporter = nodemailer.createTransport({
      host: "mail.zenithsns.com", // cPanel mail server
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const adminMailOptions = {
      from: process.env.MAIL,
      to: "info@zenithsns.com",
      subject: "New Contact Form Submission",
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Send admin notification email only
    await transporter.sendMail(adminMailOptions);

    res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { contactData };
