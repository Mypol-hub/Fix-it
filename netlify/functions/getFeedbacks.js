import { connect } from "@netlify/database";

export async function handler() {
  try {
    const db = connect();
    const { rows } = await db.sql`
      SELECT id, email, feedback, created_at
      FROM feedbacks
      ORDER BY created_at DESC
    `;

    return {
      statusCode: 200,
      body: JSON.stringify({ feedbacks: rows }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
