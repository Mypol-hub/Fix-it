import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export async function handler(event) {
  try {
    const body = JSON.parse(event.body);

    const { email, feedback } = body;

    // Insert into Supabase table "requests"
    const { data, error } = await supabase
      .from("requests")
      .insert([{ email, feedback, created_at: new Date() }]);

    if (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error.message }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Feedback saved successfully", data }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
