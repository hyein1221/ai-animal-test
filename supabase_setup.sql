-- Supabase Dashboard > SQL Editor > New query 에 전체 붙여넣고 Run.
-- 개인정보, 이름, 답변, 방문자 식별자는 저장하지 않습니다.
-- 6개 유형의 누적 합계 6행만 유지합니다.

create table if not exists public.animal_counts (
  animal text primary key check (animal in (
    'squirrel','beaver','otter','owl','hedgehog','rabbit'
  )),
  total bigint not null default 0 check (total >= 0)
);

insert into public.animal_counts (animal, total)
values ('squirrel',0), ('beaver',0), ('otter',0),
       ('owl',0), ('hedgehog',0), ('rabbit',0)
on conflict (animal) do nothing;

alter table public.animal_counts enable row level security;

-- 익명 참여자는 집계 숫자만 읽을 수 있습니다. 직접 수정은 불가합니다.
revoke all on table public.animal_counts from anon, authenticated;
grant select on table public.animal_counts to anon, authenticated;

drop policy if exists "animal_counts_public_read" on public.animal_counts;
create policy "animal_counts_public_read"
on public.animal_counts for select to anon, authenticated using (true);

-- 중복 완료 요청은 브라우저에서 억제합니다. 이는 보안상 강제 한도가 아닙니다.
-- 익명 클라이언트는 아래 검증 함수만 호출해 합계를 +1 할 수 있습니다.
create or replace function public.record_animal(p_animal text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_animal is null or p_animal not in (
    'squirrel','beaver','otter','owl','hedgehog','rabbit'
  ) then
    raise exception 'invalid animal type';
  end if;

  update public.animal_counts
     set total = total + 1
   where animal = p_animal;

  if not found then
    raise exception 'animal type not initialized';
  end if;
end;
$$;

revoke all on function public.record_animal(text) from public, anon, authenticated;
grant execute on function public.record_animal(text) to anon;

-- 통계 변경사항을 실시간 공개하는 단순한 Postgres Changes 방식.
-- Supabase 기본 supabase_realtime publication에 이미 추가돼 있으면 중복 실행 안 함.
do $$
begin
 if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'animal_counts'
 ) then
    alter publication supabase_realtime add table public.animal_counts;
 end if;
end $$;

-- 시험 중 집계를 초기화할 경우 (진짜 강의 직전에 실행):
-- update public.animal_counts set total = 0;
-- 이 문장은 주석 처리되어 있으므로, 필요할 때 별도로 직접 실행하세요.