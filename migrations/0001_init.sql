-- Quote requests from /devis and the category / provider pages.
CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  category TEXT NOT NULL,
  provider TEXT,
  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  postcode TEXT NOT NULL,
  message TEXT,
  consent_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'nouveau', -- nouveau | contacte | clos
  emailed INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS leads_created ON leads (created_at);

-- Messages from /contact.
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'nouveau',
  emailed INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS messages_created ON messages (created_at);

-- Newsletter sign-ups from the footer.
CREATE TABLE IF NOT EXISTS subscribers (
  email TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
