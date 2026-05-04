import { connect } from "@netlify/database";

export async function handler() {
  try {
    const db = connect();
    const { rows } = await db.sql`
      SELECT id, item_name, image_url, uploaded_at
      FROM items
      ORDER BY uploaded_at DESC
    `;

    return {
      statusCode: 200,
      body: JSON.stringify({ items: rows }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
