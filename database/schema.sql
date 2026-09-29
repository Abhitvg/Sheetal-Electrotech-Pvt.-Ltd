CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS rfq_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status VARCHAR(50) NOT NULL DEFAULT 'new',
  product_categories TEXT[] NOT NULL,
  monthly_volume VARCHAR(100) NOT NULL,
  target_delivery VARCHAR(100) NOT NULL,
  additional_notes TEXT,
  full_name VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  work_email VARCHAR(255) NOT NULL,
  phone VARCHAR(100),
  attachment_urls TEXT[],
  attachment_paths TEXT[],
  utm_source VARCHAR(255),
  utm_medium VARCHAR(255),
  utm_campaign VARCHAR(255),
  internal_notes TEXT
);

ALTER TABLE rfq_submissions
  ADD COLUMN IF NOT EXISTS internal_notes TEXT;

ALTER TABLE rfq_submissions
  ADD COLUMN IF NOT EXISTS attachment_paths TEXT[];

CREATE INDEX IF NOT EXISTS rfq_submissions_created_at_idx
  ON rfq_submissions (created_at DESC);

CREATE INDEX IF NOT EXISTS rfq_submissions_status_idx
  ON rfq_submissions (status);
