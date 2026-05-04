import { connect } from "@netlify/database";

export async function handler() {
  try {
    const db = connect();
    const { rows } = await db.sql`
      SELECT id, customer_name, email, item_name, problem_description, status, created_at
      FROM requests
      ORDER BY created_at DESC
    `;

    return {
      statusCode: 200,
      body: JSON.stringify({ requests: rows }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
