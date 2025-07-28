const path = require('path');
// Load .env from root if it exists (for local development)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
}
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const cron = require('node-cron');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

const inviteRoute = require('./invite');
app.use(inviteRoute);

// Test endpoint to verify server is working
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Server is working!',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV
  });
});

app.post('/api/contact', async (req, res) => {
  console.log('Contact form submission received:', { email: req.body.email, hasMessage: !!req.body.message });
  
  const { email, message } = req.body;
  if (!email || !message) {
    console.log('Missing email or message');
    return res.status(400).json({ error: 'Email and message are required.' });
  }

  // Log environment variables (without sensitive data)
  console.log('SMTP Configuration:', {
    host: process.env.SMTP_HOST ? 'Set' : 'Missing',
    port: process.env.SMTP_PORT ? 'Set' : 'Missing',
    user: process.env.SMTP_USER ? 'Set' : 'Missing',
    pass: process.env.SMTP_PASS ? 'Set' : 'Missing',
    from: process.env.SMTP_FROM ? 'Set' : 'Missing',
    contactEmail: process.env.CONTACT_EMAIL ? 'Set' : 'Missing'
  });

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

    console.log('Email sent successfully');
    res.json({ success: true });
  } catch (err) {
    console.error('Nodemailer error:', err);
    console.error('Error details:', {
      message: err.message,
      code: err.code,
      command: err.command
    });
    res.status(500).json({ error: 'Failed to send email.', details: err.message });
  }
});

// Schedule job for July 31 at 00:00
cron.schedule('0 0 31 7 *', async () => {
  const filePath = path.join(__dirname, 'pendingInvites.json');
  if (!fs.existsSync(filePath)) return;
  const invites = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!Array.isArray(invites) || invites.length === 0) return;
  for (const email of invites) {
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
        to: email,
        subject: 'Invitation au Royaume Queen de Q',
        html: `
          <!DOCTYPE html>
          <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Invitation Queen de Q</title>
            <style>
              body { font-family: 'Raleway', 'Cinzel', Arial, sans-serif; background: #2d1457; color: #e9d8a6; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 24px auto; background: #2d1457; border-radius: 18px; box-shadow: 0 4px 24px rgba(0,0,0,0.18); overflow: hidden; }
              .header { background: #2d1457; color: #fff; padding: 28px 16px; text-align: center; }
              .header h2 { font-family: 'Cinzel', serif; margin: 0; font-size: 26px; color: #fff; letter-spacing: 1px; }
              .content { padding: 24px 16px; }
              .message { background: #1a093e; color: #fff; padding: 18px; border-radius: 10px; font-size: 16px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(107,33,168,0.08); }
              .footer { background: #2d1457; color: #A78BFA; text-align: center; padding: 16px 10px; font-size: 13px; border-top: 1px solid #A78BFA33; }
              .invite-btn { display:inline-block; margin-top:16px; padding:12px 24px; background:#A78BFA; color:#fff; border-radius:8px; text-decoration:none; font-weight:bold; font-size:16px; }
              @media (max-width: 600px) {
                .container, .header, .content, .footer { padding: 8px !important; }
                .header h2 { font-size: 20px; }
                .message { font-size: 15px; padding: 12px; }
                .invite-btn { font-size: 15px; padding: 10px 16px; }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Invitation au Royaume Queen de Q</h2>
              </div>
              <div class="content">
                <div class="message">
                  <strong>Bienvenue dans le Royaume Queen de Q !</strong><br><br>
                  Nous sommes ravies de t'inviter au lancement officiel de Queen de Q.<br><br>
                  <b>Date :</b> 31 Juillet 2025 | 19:00 - 20:00<br>
                  <b>Lieu :</b> En Ligne (le lien te sera envoyé prochainement)<br><br>
                  Découvre une communauté de femmes inspirantes, des outils pour révéler ta puissance intérieure, et une expérience royale unique.<br><br>
                  <a href="https://queen-de-q-platform-v2.vercel.app/" class="invite-btn" target="_blank">Accéder à la plateforme Queen de Q</a>
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
      console.log(`Invitation sent to ${email}`);
    } catch (err) {
      console.error(`Failed to send invitation to ${email}:`, err);
    }
  }
  // Clear invites after sending
  fs.writeFileSync(filePath, JSON.stringify([], null, 2));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
