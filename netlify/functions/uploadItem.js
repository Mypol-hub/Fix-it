import { connect } from "@netlify/database";

export async function handler(event) {
  try {
    const db = connect();
    const body = JSON.parse(event.body);

    const { item_name, image_url } = body;

    await db.sql`
      INSERT INTO items (item_name, image_url, uploaded_at)
      VALUES (${item_name}, ${image_url}, NOW())
    `;

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Item uploaded successfully" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
