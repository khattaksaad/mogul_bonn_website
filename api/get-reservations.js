import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const authHeader = req.headers.authorization;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return res.status(500).json({ error: 'Server configuration error: ADMIN_PASSWORD not set.' });
  }

  if (!authHeader || authHeader !== adminPassword) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const result = await sql`SELECT * FROM reservations ORDER BY created_at DESC`;
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return res.status(500).json({ error: error.message });
  }
}
