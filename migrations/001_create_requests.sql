CREATE TABLE requests (
  id SERIAL PRIMARY KEY,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  item_name TEXT NOT NULL,
  problem_description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
