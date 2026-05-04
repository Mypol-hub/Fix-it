import { connect } from "@netlify/database";

export async function handler(event) {
  try {
    const db = connect();
    const body = JSON.parse(event.body);

    const { email, feedback } = body;

    await db.sql`
      INSERT INTO feedbacks (email, feedback, created_at)
      VALUES (${email}, ${feedback}, NOW())
    `;

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Feedback submitted successfully" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
