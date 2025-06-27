-- Modifications to user table on June 23 2025

-- Add new columns for user progress tracking (user_day_streak, user_last_login_date)
ALTER TABLE public.user
ADD COLUMN user_day_streak INTEGER NOT NULL DEFAULT 0;

ALTER TABLE public.user
ADD COLUMN user_last_login_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now();

-- Add new function to get user progress stats
create or replace function get_user_progress_stats(uid uuid)
returns table (
  user_nickname text,
  user_level int,
  user_xp int,
  xp_to_next_level int,
  xp_to_current_level int,
  user_day_streak int,
  user_star int,
  badge_count int
)
language sql
as $$
  select 
    us.user_nickname, 
    us.user_level, 
    us.user_xp,
    curr.level_xp_to_next_level,
    prev.level_xp_to_next_level,
    us.user_day_streak,
    us.user_star,
    (select count(*) from user_badge where user_id = uid) as badge_count
  from public.user us
  join ref_level curr on us.user_level = curr.level_value
  join ref_level prev on us.user_level - 1 = prev.level_value
  where us.user_id = uid
$$;

-- Add new function to get user avatar assets
create or replace function get_user_avatar_assets(uid uuid)
returns table (
  asset_priority int,
  asset_image_url text
)
language sql
as $$
  select 
    ra.asset_priority,
    ravl.asset_image_url
  from user_asset ua
  join public.user us on ua.user_id = us.user_id
  join ref_asset ra on ua.asset_id = ra.asset_id
  join ref_asset_variation rav on ua.asset_variation_id = rav.asset_variation_id
  join ref_asset_variation_level ravl on ua.asset_variation_id = ravl.asset_variation_id
  where ua.user_id = uid
    and ravl.user_level = us.user_level
    and ua.user_asset_active = true
  order by ra.asset_priority
$$;

-- Add new function to get user badges
create or replace function get_user_active_badges(uid uuid)
returns table (
  badge_name text,
  badge_image_url text
)
language sql
as $$
  select 
    rb.badge_name,
    rb.badge_image_url
  from ref_badge rb
  join user_badge ub on rb.badge_id = ub.badge_id
  where ub.user_id = uid
    and ub.user_badge_active = true
  order by rb.badge_name
  limit 3
$$;
