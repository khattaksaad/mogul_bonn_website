import { sql } from '@vercel/postgres';
import { Resend } from 'resend';

export default async function handler(req, res) {
  // Tally webhooks send POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const payload = req.body;
    
    if (!payload || payload.eventType !== 'FORM_RESPONSE' || !payload.data) {
      return res.status(400).json({ error: 'Invalid payload' });
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

    const dbResult = await sql`
      INSERT INTO reservations (name, email, phone, date, time, guests, status)
      VALUES (${name}, ${email}, ${phone}, ${date}, ${time}, ${guests}, 'Pending')
      RETURNING id;
    `;
    
    const reservationId = dbResult.rows[0].id;

    const approveUrl = `https://mogulbonn.com/api/manage-reservation?id=${reservationId}&action=approve`;
    const rejectUrl = `https://mogulbonn.com/api/manage-reservation?id=${reservationId}&action=reject`;

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
