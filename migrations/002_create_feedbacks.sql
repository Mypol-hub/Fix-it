CREATE TABLE feedbacks (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  feedback TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
