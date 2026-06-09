import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";

const app = readFileSync(new URL("../src/App.jsx", import.meta.url), "utf8");
const packageJson = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
);

assert.equal(packageJson.scripts.dev, "vite --host 0.0.0.0");
assert.equal(packageJson.scripts.build, "vite build");

[
  "임윤찬 x 도쿄 아트 투어",
  "차순 010-5663-5153",
  "카톡",
  "http://pf.kakao.com/_gIxlNb",
  "참고 사이트",
  "일정",
  "https://tokyo2026061102.vercel.app/",
  "7C1175",
  "ICN 터미널 1",
  "NRT 터미널 3",
  "11JUN26(목) 09:45 → 12:15",
  "7C1108",
  "14JUN26(일) 18:30 → 21:20",
  "출발",
  "도착",
  "하코네 야외 조각 공원 PDF 지도 크게 보기",
  "hakone-open-air-map.pdf",
  "랜드마크 조각 길찾기",
  "누워 있는 인물 연작",
  "폭포",
  "캠벨 수프 캔",
  "무한 거울방 연작",
  "심포닉 스컬프처",
  "피카소관",
  "행복을 부르는 심포니 조각",
  "https://m.blog.naver.com/leggiero7/224287257656",
  "우에노모리 미술관",
  "가마쿠라 수국사",
  "하라뮤지엄 ARC",
  "르 꼬르비쥐에 세트",
  "오므라이스",
  "선샤인시티 프린스 호텔 이케부쿠로",
  "스스키노하라 이치노유",
  "호텔 인디고 가루이자와",
  "츠유샤브 치리리 시나가와점",
  "샤브샤브런치",
  "샤브샤브카이세키",
  "하코네엔",
  "일정식(후지고젠)",
  "로구테이 본점",
  "야키니쿠정식",
].forEach((text) => {
  assert.ok(app.includes(text), `App.jsx should include ${text}`);
});

[
  "호텔 메트로폴리탄 이케부쿠로 트윈",
  "텐세이엔",
  "카루이자와 프린스 호텔 웨스트 트윈",
  "최대 26명",
  "45인승 대형버스 4일",
  "NO쇼핑 · NO옵션 · 1억원 여행자보험",
  "공연 S석 + 미술관 5곳 포함",
  "하코네 조각의 숲 미술관 바로가기",
  "H6BDFY",
  "Reclining Figure 계열",
  "Waterfall",
  "Campbell's Soup Cans",
  "Infinity Mirror Room 계열",
].forEach((text) => {
  assert.ok(!app.includes(text), `App.jsx should not include ${text}`);
});

assert.ok(
  app.includes("h-screen") && app.includes("overflow-hidden"),
  "App should keep the header/tabs fixed and scroll only the content area",
);
assert.ok(
  app.includes("flex-1 overflow-y-auto"),
  "Scrollable content area should use flex-1 overflow-y-auto",
);

const hakonePdf = statSync(
  new URL("../public/hakone-open-air-map.pdf", import.meta.url),
);
assert.ok(hakonePdf.size > 1_000_000, "Hakone PDF map should be bundled as a public asset");

console.log("app content checks passed");
