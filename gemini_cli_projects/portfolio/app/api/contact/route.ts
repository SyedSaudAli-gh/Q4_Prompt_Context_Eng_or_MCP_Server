import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import * as Yup from 'yup';

const db = new sqlite3.Database('./portfolio.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the portfolio database.');
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  message: Yup.string().required('Required'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await validationSchema.validate(body);

    const { name, email, message } = body;

    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO messages (name, email, message) VALUES (?, ?, ?)`,
        [name, email, message],
        function (err) {
          if (err) {
            console.error(err.message);
            reject(new NextResponse('Failed to save message', { status: 500 }));
          }
          resolve(new NextResponse('Message saved successfully', { status: 200 }));
        }
      );
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 400 });
  }
}