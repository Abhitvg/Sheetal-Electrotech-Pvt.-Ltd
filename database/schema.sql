CREATE TABLE rfq_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'new',
  product_categories TEXT[],
  monthly_volume VARCHAR(100),
  target_delivery VARCHAR(100),
  additional_notes TEXT,
  full_name VARCHAR(255),
  company VARCHAR(255),
  work_email VARCHAR(255),
  phone VARCHAR(100),
  attachment_urls TEXT[],
  utm_source VARCHAR(255),
  utm_medium VARCHAR(255),
  utm_campaign VARCHAR(255)
);
