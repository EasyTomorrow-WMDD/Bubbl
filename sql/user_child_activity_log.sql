-- Create the user_child_activity_log table
create table public.user_child_activity_log (
  log_id uuid primary key default gen_random_uuid(), -- unique log identifier
  user_id uuid not null references public.user(user_id) on delete cascade,
  log_timestamp timestamp with time zone default now() not null,
  log_event_summary text not null,
  log_event text not null
);
