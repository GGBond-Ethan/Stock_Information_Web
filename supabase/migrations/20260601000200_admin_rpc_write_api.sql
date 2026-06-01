create schema if not exists app_private;

create table if not exists app_private.admin_secrets (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

revoke all on schema app_private from public;
revoke all on all tables in schema app_private from public;

create or replace function app_private.verify_admin_token(admin_token text)
returns boolean
language sql
stable
security definer
set search_path = public, app_private
as $$
  select exists (
    select 1
    from app_private.admin_secrets
    where key = 'admin_token_sha256'
      and value = encode(extensions.digest(coalesce(admin_token, ''), 'sha256'), 'hex')
  );
$$;

revoke all on function app_private.verify_admin_token(text) from public;

create or replace function public.admin_insert_hot_topic(admin_token text, payload jsonb)
returns public.hot_topics
language plpgsql
security definer
set search_path = public, app_private
as $$
declare
  inserted public.hot_topics;
begin
  if not app_private.verify_admin_token(admin_token) then
    raise exception '管理员口令无效' using errcode = '28000';
  end if;

  insert into public.hot_topics (
    title,
    source_name,
    category,
    market_impact,
    related_sectors,
    sentiment_score,
    importance_level,
    summary,
    published_at,
    source_url
  )
  values (
    payload->>'title',
    payload->>'source',
    payload->>'category',
    coalesce(array(select jsonb_array_elements_text(coalesce(payload->'marketImpact', '[]'::jsonb))), '{}'),
    coalesce(array(select jsonb_array_elements_text(coalesce(payload->'relatedSectors', '[]'::jsonb))), '{}'),
    (payload->>'sentimentScore')::integer,
    payload->>'importanceLevel',
    payload->>'summary',
    (payload->>'publishedAt')::timestamptz,
    payload->>'sourceUrl'
  )
  returning * into inserted;

  insert into public.topic_stock_relations (topic_id, stock_id)
  select inserted.id, stocks.id
  from jsonb_to_recordset(coalesce(payload->'relatedStocks', '[]'::jsonb)) as related(code text)
  join public.stocks on stocks.code = related.code
  on conflict do nothing;

  return inserted;
end;
$$;

create or replace function public.admin_insert_market_event(admin_token text, payload jsonb)
returns public.market_events
language plpgsql
security definer
set search_path = public, app_private
as $$
declare
  inserted public.market_events;
begin
  if not app_private.verify_admin_token(admin_token) then
    raise exception '管理员口令无效' using errcode = '28000';
  end if;

  insert into public.market_events (
    event_date,
    title,
    full_title,
    event_type,
    market,
    importance_level,
    related_sectors,
    description,
    expected_impact,
    source_name,
    source_url
  )
  values (
    (payload->>'date')::date,
    payload->>'title',
    payload->>'fullTitle',
    payload->>'eventType',
    coalesce(array(select jsonb_array_elements_text(coalesce(payload->'market', '[]'::jsonb))), '{}'),
    payload->>'importanceLevel',
    coalesce(array(select jsonb_array_elements_text(coalesce(payload->'relatedSectors', '[]'::jsonb))), '{}'),
    payload->>'description',
    payload->>'expectedImpact',
    payload->>'source',
    payload->>'sourceUrl'
  )
  returning * into inserted;

  insert into public.event_stock_relations (event_id, stock_id)
  select inserted.id, stocks.id
  from jsonb_to_recordset(coalesce(payload->'relatedStocks', '[]'::jsonb)) as related(code text)
  join public.stocks on stocks.code = related.code
  on conflict do nothing;

  return inserted;
end;
$$;

grant execute on function public.admin_insert_hot_topic(text, jsonb) to anon, authenticated;
grant execute on function public.admin_insert_market_event(text, jsonb) to anon, authenticated;
