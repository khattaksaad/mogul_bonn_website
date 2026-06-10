import { sql } from '@vercel/postgres';
import { Resend } from 'resend';
import crypto from 'crypto';

// Disable default body parser so we can get the raw string for cryptographic signature
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 1. Read the raw request body as a string
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    const rawBody = Buffer.concat(chunks).toString('utf8');

    // 2. Cryptographic Signature Verification
    const signature = req.headers['tally-signature'];
    const signingSecret = process.env.TALLY_SIGNING_SECRET;

    if (!signingSecret) {
      console.error('CRITICAL: TALLY_SIGNING_SECRET environment variable is missing.');
      return res.status(500).json({ error: 'Server misconfiguration: Missing signing secret.' });
    }

    if (!signature) {
      return res.status(401).json({ error: 'Missing tally-signature header.' });
    }

    const calculatedSignature = crypto
      .createHmac('sha256', signingSecret)
      .update(rawBody)
      .digest('base64');

    if (signature !== calculatedSignature) {
      console.error('SECURITY ALERT: Invalid webhook signature detected. Possible attacker.');
      return res.status(401).json({ error: 'Invalid cryptographic signature.' });
    }

    // 3. Parse Payload
    let payload;
    try {
      payload = JSON.parse(rawBody);
    } catch (err) {
      return res.status(400).json({ error: 'Invalid JSON payload' });
    }

    if (!payload || payload.eventType !== 'FORM_RESPONSE' || !payload.data) {
      return res.status(400).json({ error: 'Invalid payload structure' });
    }

    const fields = payload.data.fields || [];
    
    const getValue = (labelKeywords) => {
      const field = fields.find(f => 
        labelKeywords.some(keyword => f.label.toLowerCase().includes(keyword.toLowerCase()))
      );
      if (field && Array.isArray(field.value)) return field.value.join(', ');
      return field ? field.value : 'N/A';
    };

    const name = getValue(['name', 'vorname']);
    const email = getValue(['email', 'mail']);
    const phone = getValue(['telefon', 'phone', 'nummer']);
    const date = getValue(['datum', 'date']);
    const time = getValue(['uhrzeit', 'time']);
    const guests = getValue(['personen', 'guests']);

    // 4. Anti-Spam Rate Limiting
    // Check if this email or phone made a reservation in the last 1 hour
    const recentCheck = await sql`
      SELECT id FROM reservations 
      WHERE (email = ${email} OR phone = ${phone}) 
      AND created_at >= NOW() - INTERVAL '1 hour'
    `;

    if (recentCheck.rowCount > 0) {
      console.log(`Spam prevented: Ignored duplicate reservation from ${email} / ${phone}`);
      // Return 200 so Tally stops retrying, but don't insert into DB or send emails
      return res.status(200).json({ success: true, message: 'Duplicate submission blocked' });
    }

    // 5. Insert into Database
    const dbResult = await sql`
      INSERT INTO reservations (name, email, phone, date, time, guests, status)
      VALUES (${name}, ${email}, ${phone}, ${date}, ${time}, ${guests}, 'Pending')
      RETURNING id;
    `;
    
    const reservationId = dbResult.rows[0].id;

    // 6. Generate URLs & Send Email
    const approveUrl = `https://mogulbonn.com/api/manage-reservation?id=${reservationId}&action=approve`;
    const rejectUrl = `https://mogulbonn.com/api/manage-reservation?id=${reservationId}&action=reject`;

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.SENDER_EMAIL || 'reservations@mogulbonn.com',
      to: process.env.RESTAURANT_EMAIL || 'info@mogulbonn.de',
      subject: `Neue Tischreservierung: ${name} (${date})`,
      html: `
        <h2>Neue Tischreservierung Anfrage</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Datum:</strong> ${date}</p>
        <p><strong>Uhrzeit:</strong> ${time}</p>
        <p><strong>Personen:</strong> ${guests}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <br/>
        <a href="${approveUrl}" style="padding: 12px 24px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px; display: inline-block; margin-right: 10px; font-weight: bold;">ZUSAGEN (Approve)</a>
        <a href="${rejectUrl}" style="padding: 12px 24px; background-color: #f44336; color: white; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">ABSAGEN (Reject)</a>
      `
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).json({ error: error.message });
  }
}
