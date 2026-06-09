import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    const result = await sql`
      CREATE TABLE IF NOT EXISTS reservations (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        date VARCHAR(50) NOT NULL,
        time VARCHAR(50) NOT NULL,
        guests VARCHAR(50) NOT NULL,
        status VARCHAR(50) DEFAULT 'Pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    return res.status(200).json({ message: 'Table created successfully', result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
