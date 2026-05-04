CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  item_name TEXT NOT NULL,
  image_url TEXT,
  uploaded_at TIMESTAMP DEFAULT NOW()
);
