create extension if not exists "pgcrypto";

create table if not exists sources (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  source_type text not null check (source_type in ('政策', '财经媒体', '交易数据', '社交媒体', '公司公告', '国际机构')),
  url text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists sectors (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists stocks (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  market text not null check (market in ('A股', '港股', '美股', '全球')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists hot_topics (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  source_id uuid references sources(id) on delete set null,
  source_name text not null,
  category text not null,
  market_impact text[] not null default '{}',
  related_sectors text[] not null default '{}',
  sentiment_score integer not null check (sentiment_score between 0 and 100),
  importance_level text not null check (importance_level in ('低', '中', '高')),
  summary text not null,
  published_at timestamptz not null,
  source_url text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists market_events (
  id uuid primary key default gen_random_uuid(),
  event_date date not null,
  title text not null,
  full_title text not null,
  event_type text not null,
  market text[] not null default '{}',
  importance_level text not null check (importance_level in ('低', '中', '高')),
  related_sectors text[] not null default '{}',
  description text not null,
  expected_impact text not null,
  source_id uuid references sources(id) on delete set null,
  source_name text not null,
  source_url text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists topic_stock_relations (
  topic_id uuid not null references hot_topics(id) on delete cascade,
  stock_id uuid not null references stocks(id) on delete cascade,
  relation_note text not null default '',
  created_at timestamptz not null default now(),
  primary key (topic_id, stock_id)
);

create table if not exists event_stock_relations (
  event_id uuid not null references market_events(id) on delete cascade,
  stock_id uuid not null references stocks(id) on delete cascade,
  relation_note text not null default '',
  created_at timestamptz not null default now(),
  primary key (event_id, stock_id)
);

create index if not exists idx_hot_topics_published_at on hot_topics (published_at desc);
create index if not exists idx_hot_topics_category on hot_topics (category);
create index if not exists idx_hot_topics_importance on hot_topics (importance_level);
create index if not exists idx_hot_topics_sentiment on hot_topics (sentiment_score desc);
create index if not exists idx_market_events_date on market_events (event_date);
create index if not exists idx_market_events_importance on market_events (importance_level);
create index if not exists idx_stocks_market on stocks (market);
