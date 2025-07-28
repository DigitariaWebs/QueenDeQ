require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.post('/api/invite', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  try {
    // Store email in pendingInvites.json
    const filePath = path.join(__dirname, 'pendingInvites.json');
    let invites = [];
    if (fs.existsSync(filePath)) {
      invites = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    if (!invites.includes(email)) {
      invites.push(email);
      fs.writeFileSync(filePath, JSON.stringify(invites, null, 2));
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Error storing invite:', err);
    res.status(500).json({ error: 'Failed to store invitation.', details: err.message });
  }
});

module.exports = router;
