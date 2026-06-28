-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.requests (
  id integer NOT NULL DEFAULT nextval('requests_id_seq'::regclass),
  customer_name text NOT NULL,
  item_name text NOT NULL,
  problem_description text,
  status text DEFAULT 'pending'::text,
  created_at timestamp without time zone DEFAULT now(),
  user_id uuid DEFAULT auth.uid(),
  phone text,
  CONSTRAINT requests_pkey PRIMARY KEY (id),
  CONSTRAINT requests_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.feedbacks (
  id integer NOT NULL DEFAULT nextval('feedbacks_id_seq'::regclass),
  feedback text NOT NULL,
  created_at timestamp without time zone DEFAULT now(),
  user_id uuid DEFAULT auth.uid(),
  phone text,
  CONSTRAINT feedbacks_pkey PRIMARY KEY (id),
  CONSTRAINT feedbacks_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.items (
  id integer NOT NULL DEFAULT nextval('items_id_seq'::regclass),
  item_name text NOT NULL,
  image_url text,
  uploaded_at timestamp without time zone DEFAULT now(),
  user_id uuid DEFAULT auth.uid(),
  phone text,
  CONSTRAINT items_pkey PRIMARY KEY (id),
  CONSTRAINT items_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
