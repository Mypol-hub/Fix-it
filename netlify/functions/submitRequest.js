import { connect } from "@netlify/database";

export async function handler(event) {
  try {
    const db = connect();
    const body = JSON.parse(event.body);

    const { customer_name, email, item_name, problem_description } = body;

    await db.sql`
      INSERT INTO requests (customer_name, email, item_name, problem_description, status, created_at)
      VALUES (${customer_name}, ${email}, ${item_name}, ${problem_description}, 'pending', NOW())
    `;

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Request submitted successfully" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
