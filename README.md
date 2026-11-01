# 나의 AI 활용 동물 찾기

대학원 강의 도입을 위한 영유아교육 현장 AI 활용 유형 테스트. HTML/CSS/JS + Supabase 실시간 합계 + GitHub Pages.

## 파일 구성
- `index.html`: 웹사이트 시작점
- `style.css`: 모바일 화면 / 비눗방울 디자인
- `script.js`: 확정 11문항, 선택지, 점수·동점 판정, 결과 PNG, Supabase 실시간 집계
- `config.js`: **내 Supabase URL과 publishable key만** 입력
- `supabase_setup.sql`: Supabase에 한 번 실행할 테이블·읽기 정책·원자적 합산 RPC·Realtime 설정
- `assets/`: 6마리 투명 PNG

## 1. Supabase 설정
1. https://supabase.com/dashboard 에서 프로젝트를 만들기 (이미 있다면 기존 프로젝트 사용).
2. 좌측 **SQL Editor → New query** 에서 `supabase_setup.sql` 내용을 통째로 붙여넣고 **Run**.
3. 프로젝트의 **Connect** 또는 **Project Settings → API Keys**에서 `Project URL`과 `Publishable key`를 확인.
4. `config.js`에 아래처럼 값을 입력하고 저장:

```js
window.ANIMAL_APP_CONFIG = {
  supabaseUrl: "https://실제프로젝트.supabase.co",
  supabasePublishableKey: "sb_publishable_실제키"
};
```

**주의:** `sb_secret_...` 또는 `service_role` 키는 GitHub나 브라우저 코드에 절대 넣지 마세요. Publishable key는 공개되는 프런트엔드용 키이며, DB 권한은 RLS/GRANT/제한적 RPC로 통제합니다.

## 2. GitHub Pages 게시 (웹 화면 기준)
1. https://github.com 로그인 → 우측 상단 **+ → New repository**.
2. Repository name: `ai-animal-test` 또는 원하는 이름.
3. **Public** 선택 → **Create repository**.
4. 저장소 화면에서 **Add file → Upload files** 선택 (처음 생성한 빈 저장소라면 'uploading an existing file' 링크가 보일 수도 있음).
5. 이 ZIP을 **먼저 압축 해제**한 뒤 `index.html`, `style.css`, `script.js`, `config.js`, `supabase_setup.sql`, `README.md`, `assets` 폴더를 **한 번에 드래그해 업로드**. ZIP 자체를 업로드하면 사이트가 실행되지 않습니다.
6. **Commit changes** 클릭.
7. 저장소 상단 **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main / (root) → Save**.
8. 배포되면 `https://내GitHub아이디.github.io/ai-animal-test/` 에 접속.

## 3. 강의용
- 기본 URL: 테스트 시작 화면
- `?view=live` 붙이기: 비눗방울 및 전체 통계만 표시 (PPT 화면 공유에 권장)
- `?demo=1&view=live`: **가상의 시연 데이터**를 보여주며 실제 통계에는 반영되지 않음
- 테스트 완료 시 대표 동물 1개를 합계에 반영함. `Q1`, `Q11`은 채점 제외.
- 동점일 때는 참여자가 대표 동물 하나 선택 → 나머지 점수로 보조 성향 재계산.
- **동물별 비눗방울은 총 6개 고정**이고, 해당 유형 누적 수가 커질수록 방울이 커집니다.
- 강의 직전에 테스트용 누적치를 지우려면 Supabase SQL Editor에서 수동 실행: `update public.animal_counts set total = 0;`.

## 개인정보 및 운영상 한계
- DB에는 `animal, total` 6행만 저장합니다. 이름·연락처·기기식별자·Q1~Q11 개별 응답을 DB에 저장하지 않습니다.
- 브라우저 localStorage에는 이미 참여 결과를 제출했는지 여부 (`1`)만 보관하여 **같은 브라우저의 중복 집계를 완화**합니다.
- **참가자 수를 정확히 검증하지는 못합니다.** 다른 브라우저, 시크릿 모드, 저장소 초기화, 직접 RPC 호출 등을 통한 반복 제출을 원천 차단할 수 없습니다.
- 서비스 제공자의 요청 로그/IP 기록까지 존재하지 않는다는 뜻의 '완전 익명' 보장은 아닙니다.
- 외부에 공개된 익명 집계 RPC는 악의적인 대량 호출에 취약할 수 있습니다. 강의 외부에 널리 공개할 경우 CAPTCHA, rate limiting, Edge Function, 이벤트 토큰 등을 추가 권장합니다.
- Supabase 설정을 하지 않으면 테스트와 결과 이미지는 작동하지만 실시간 통계는 동작하지 않습니다. `?demo=1` 시연 모드로 UI를 확인할 수 있습니다.
- 최초 DB 연결 및 GitHub 실제 배포는 사용자 계정에서 진행해야 합니다.