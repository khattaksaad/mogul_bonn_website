import { sql } from '@vercel/postgres';
import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }

  const { id, action } = req.query;

  if (!id || !action || !['approve', 'reject'].includes(action)) {
    return res.status(400).send('Invalid request parameters');
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 1. Get the reservation details from the database
    const result = await sql`SELECT * FROM reservations WHERE id = ${id}`;
    if (result.rowCount === 0) {
      return res.status(404).send('Reservation not found.');
    }

    const reservation = result.rows[0];

    // If already processed, don't send emails again
    if (reservation.status !== 'Pending') {
      return res.status(400).send(\`This reservation was already marked as \${reservation.status}.\`);
    }

    // 2. Update status in DB
    const newStatus = action === 'approve' ? 'Approved' : 'Rejected';
    await sql`UPDATE reservations SET status = \${newStatus} WHERE id = \${id}`;

    // 3. Send email to the customer
    let subject, htmlMessage;

    if (action === 'approve') {
      subject = 'Ihre Tischreservierung ist bestätigt - Mogul Bonn';
      htmlMessage = \`
        <h2>Tischreservierung Bestätigt!</h2>
        <p>Hallo \${reservation.name},</p>
        <p>Wir freuen uns, Ihnen mitteilen zu können, dass Ihr Tisch am <strong>\${reservation.date}</strong> um <strong>\${reservation.time}</strong> Uhr für <strong>\${reservation.guests}</strong> reserviert ist.</p>
        <p>Wir freuen uns auf Ihren Besuch!</p>
        <p>Ihr Team von Mogul Bonn</p>
      \`;
    } else {
      subject = 'Ihre Tischreservierung bei Mogul Bonn';
      htmlMessage = \`
        <h2>Tischreservierung leider nicht möglich</h2>
        <p>Hallo \${reservation.name},</p>
        <p>Leider sind wir am <strong>\${reservation.date}</strong> um <strong>\${reservation.time}</strong> Uhr komplett ausgebucht und können Ihre Reservierung für <strong>\${reservation.guests}</strong> nicht annehmen.</p>
        <p>Bitte versuchen Sie es an einem anderen Datum oder zu einer anderen Uhrzeit noch einmal.</p>
        <p>Ihr Team von Mogul Bonn</p>
      \`;
    }

    await resend.emails.send({
      from: process.env.SENDER_EMAIL || 'reservations@mogulbonn.com',
      to: reservation.email,
      subject: subject,
      html: htmlMessage
    });

    // 4. Return a clean success page to the restaurant owner
    const color = action === 'approve' ? '#4CAF50' : '#f44336';
    const text = action === 'approve' ? 'Reservierung Bestätigt' : 'Reservierung Abgesagt';

    const successHtml = \`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Status Updated</title>
        <style>
          body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background: #fafaf5; margin: 0; }
          .card { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; }
          h1 { color: \${color}; }
          p { color: #555; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>\${text}</h1>
          <p>Der Kunde (\${reservation.email}) wurde erfolgreich per E-Mail benachrichtigt.</p>
          <p>Sie können dieses Fenster nun schließen.</p>
        </div>
      </body>
      </html>
    \`;

    return res.status(200).setHeader('Content-Type', 'text/html').send(successHtml);

  } catch (error) {
    console.error('Error updating reservation:', error);
    return res.status(500).send(\`Internal Server Error: \${error.message}\`);
  }
}
