import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const app = readFileSync(new URL("../src/App.jsx", import.meta.url), "utf8");
const packageJson = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
);

assert.equal(packageJson.scripts.dev, "vite --host 0.0.0.0");
assert.equal(packageJson.scripts.build, "vite build");

[
  "임윤찬 x 도쿄 아트 투어",
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
].forEach((text) => {
  assert.ok(!app.includes(text), `App.jsx should not include old hotel ${text}`);
});

console.log("app content checks passed");
