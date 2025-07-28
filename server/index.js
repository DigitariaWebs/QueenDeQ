require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/contact', async (req, res) => {
  const { email, message } = req.body;
  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: `Contact Form Submission from ${email}`,
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Queen de Q - Contact Form</title>
          <style>
            body { font-family: 'Raleway', 'Cinzel', Arial, sans-serif; background: #1a093e; color: #e9d8a6; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 32px auto; background: #2d1457; border-radius: 18px; box-shadow: 0 4px 24px rgba(0,0,0,0.18); overflow: hidden; }
            .header { background: linear-gradient(90deg, #6B21A8 0%, #A78BFA 100%); color: #fff; padding: 36px 28px; text-align: center; }
            .header h2 { font-family: 'Cinzel', serif; margin: 0; font-size: 30px; color: #fff; letter-spacing: 1px; }
            .content { padding: 36px 28px; }
            .info { margin-bottom: 28px; font-size: 16px; }
            .info strong { color: #A78BFA; }
            .info span { color: #e9d8a6; }
            .message { background: linear-gradient(90deg, #6B21A8 0%, #A78BFA 100%); color: #fff; padding: 22px; border-radius: 10px; font-size: 18px; margin-bottom: 28px; box-shadow: 0 2px 8px rgba(107,33,168,0.08); }
            .footer { background: #2d1457; color: #A78BFA; text-align: center; padding: 20px 14px; font-size: 14px; border-top: 1px solid #A78BFA33; }
            @media (max-width: 600px) { .container, .header, .content, .footer { padding: 14px !important; } }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Queen de Q - Contact Form</h2>
            </div>
            <div class="content">
              <div class="info">
                <p><strong>From:</strong> <span style="color: #fff;">${email}</span></p>
              </div>
              <div class="message">
                <strong>Message:</strong><br>
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <div class="footer">
              © 2025 Queen de Q. Tous droits réservés.
            </div>
          </div>
        </body>
        </html>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Nodemailer error:', err);
    res.status(500).json({ error: 'Failed to send email.', details: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
