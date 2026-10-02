// 실제 App/화면/HTTP 연결 + 메모리 Fetch. 실제 DB·AI·위치·외부 자산은 사용하지 않는다.
// PETCARE_WEB_ROOT로 이전 frontend 복사본도 같은 fixture로 검증할 수 있다.
// PETCARE_SNAPSHOT_DIR 지정 시 화면별 DOM·screenshot을 비교용으로 저장한다.
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { existsSync, realpathSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { before, after, test } from 'node:test';
import { build } from 'vite';

const root = realpathSync(process.env.PETCARE_WEB_ROOT || fileURLToPath(new URL('../', import.meta.url)));
const moved = existsSync(resolve(root, 'src/app/App.jsx'));
const appPath = resolve(root, moved ? 'src/app/App.jsx' : 'src/App.jsx');
const navbarPath = resolve(root, moved ? 'src/app/Navbar.jsx' : 'src/components/Navbar.jsx');
const cssPath = resolve(root, moved ? 'src/shared/styles/index.css' : 'src/index.css');
const entry = resolve(root, 'tests/full-app-fixture.jsx');
let browser, server, baseUrl;

before(async () => {
  const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
  const bundle = await build({
    configFile: false, root, logLevel: 'silent',
    define: { 'process.env.NODE_ENV': JSON.stringify('development'), 'import.meta.env.VITE_API_BASE_URL': JSON.stringify('/api/v1') },
    plugins: [{
      name: 'full-app-fixture', enforce: 'pre',
      resolveId(source) { if (source === entry) return entry; },
      transform(code, id) {
        // JSX·기능은 교체하지 않고 Navbar에 전달된 실제 App 전환 callback만 노출한다.
        if (id === navbarPath) return code.replace('const [showPetDropdown', 'window.fixtureNavigate = setActiveTab;\n  const [showPetDropdown');
      },
      load(id) {
        if (id !== entry) return;
        return `import React from 'react'; import { createRoot } from 'react-dom/client'; import App from ${JSON.stringify(appPath)};` + String.raw`
          const NativeDate = Date;
          const now = NativeDate.parse('2026-10-03T03:00:00Z');
          window.Date = class extends NativeDate {
            constructor(...args) { super(...(args.length ? args : [now])); }
            static now() { return now; }
          };
          const user = { id: 1, nickname: 'Fixture Guardian', name: 'Fixture Guardian', email: 'guardian@fixture.test', provider: 'LOCAL' };
          const pets = [
            { id: 101, userId: 1, name: 'Fixture Dog', species: 'DOG', breed: 'Fixture breed', age: '3살', weight: '4kg', icon: '🐶' },
            { id: 102, userId: 1, name: 'Fixture Cat', species: 'CAT', breed: 'Fixture breed', age: '2살', weight: '3kg', icon: '🐱' },
            { id: 103, userId: 1, name: 'Fixture Bird', species: 'BIRD', breed: 'Fixture breed', age: '1살', weight: '0.2kg', icon: '🐦' }
          ];
          window.fixture = { pets, requests: [], unhandled: [], geolocationCalls: 0 };
          Object.defineProperty(navigator, 'geolocation', { value: {
            getCurrentPosition: (_, reject) => { window.fixture.geolocationCalls++; reject?.({ code: 1, message: 'Fixture: 위치 사용 안 함' }); }
          } });
          if (!new URLSearchParams(location.search).has('guest')) {
            localStorage.setItem('petcare_user', JSON.stringify(user));
            localStorage.setItem('petcare_token', 'fixture-token');
          }
          localStorage.setItem('petcare_vitals_pet_101', JSON.stringify({ bodyTemp: '38.4', heartRate: '95', weight: '4', allergies: 'Fixture allergy', conditions: '', medications: '' }));
          localStorage.setItem('petcare_vitals_pet_102', JSON.stringify({ bodyTemp: '38.1', heartRate: '110', weight: '3', allergies: '', conditions: '', medications: '' }));
          localStorage.setItem('petcare_history_pet_101', JSON.stringify([{ date: '10/01', weight: 3.8, temp: 38.2 }, { date: '10/02', weight: 4, temp: 38.4 }]));
          const post = { id: 7, userId: 2, authorName: 'Fixture author', title: 'Fixture community post', content: 'Fixture community detail', timeAgo: 'Fixture time', likes: 0, comments: 0 };
          const json = body => new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } });
          const success = data => json({ code: 200, message: 'SUCCESS', data });
          window.fetch = async (input, options = {}) => {
            const url = new URL(typeof input === 'string' ? input : input.url, location.href);
            const path = url.pathname;
            const method = options.method || 'GET';
            const payload = typeof options.body === 'string' ? JSON.parse(options.body) : null;
            window.fixture.requests.push({ path, method, payload, query: url.search });
            if (path === '/api/v1/pets/user/1') return json({ data: pets });
            if (path === '/api/v1/pets' && method === 'POST') {
              const pet = { id: 104, ...payload }; pets.push(pet); return json({ data: pet });
            }
            if (/^\/api\/v1\/pets\/\d+$/.test(path)) {
              const id = Number(path.split('/').at(-1));
              const pet = pets.find(item => item.id === id);
              if (method === 'PUT') { Object.assign(pet, payload); return json({ data: pet }); }
              if (method === 'DELETE') { pets.splice(pets.indexOf(pet), 1); return json({ data: true }); }
            }
            if (path === '/api/v1/diagnosis/symptoms') return success(Object.fromEntries(['SKIN', 'EYE', 'EAR', 'MOUTH', 'PAW_LIMB', 'NOSE_RESPIRATORY', 'ABDOMEN', 'CUSTOM'].map(area => [area, ['가려움/긁음']])));
            if (/^\/api\/v1\/pets\/\d+\/diagnoses$/.test(path)) return success({ content: [], page: 0, size: 5, totalElements: 0, totalPages: 0 });
            if (path === '/api/v1/news') return json({ data: [{ title: 'Fixture health news', description: 'Fixture news description', link: 'https://fixture.invalid/news', pubDate: '2026-10-01' }] });
            if (path === '/api/v1/hospitals/nearby' || path === '/api/v1/hospitals/bookmarks') return json({ data: [] });
            if (path === '/api/v1/community') return json({ data: [post], page: 0, totalCount: 1, hasNext: false });
            if (path === '/api/v1/community/7') return json({ data: post });
            if (path === '/api/v1/community/7/comments' || path === '/api/v1/community/my-reports') return json({ data: [] });
            if (path === '/api/v1/community/7/likes') return json({ data: { count: 0, liked: false } });
            if (path === '/api/v1/users/me') return json({ data: user });
            if (path === '/api/v1/auth/login') return json({ accessToken: 'fixture-login-token', user });
            if (path === '/api/v1/auth/logout') return json({});
            if (path.startsWith('/api/v1/auth/check-')) return json({ available: true });
            if (path === '/api/v1/chat/daily') return json({ status: 'SUCCESS', aiReply: 'Fixture reply: 외부 AI 호출 없음' });
            window.fixture.unhandled.push(method + ' ' + path);
            throw new Error('정의되지 않은 Mock Fetch: ' + method + ' ' + path);
          };
          createRoot(document.getElementById('root')).render(React.createElement(App));
        `;
      }
    }],
    build: { write: false, minify: false, lib: { entry, formats: ['iife'], name: 'FullAppFixture' } }
  });
  const outputs = (Array.isArray(bundle) ? bundle : [bundle]).flatMap(item => item.output);
  const script = outputs.find(item => item.type === 'chunk').code;
  const css = (await readFile(cssPath, 'utf8')).replace(/^@import .*$/gm, '');
  server = createServer((request, response) => {
    response.setHeader('Content-Type', request.url === '/fixture.js' ? 'text/javascript; charset=utf-8' : 'text/html; charset=utf-8');
    response.end(request.url === '/fixture.js' ? script : `<style>${css}</style><div id="root"></div><script src="/fixture.js"></script>`);
  }).listen(0, '127.0.0.1');
  await once(server, 'listening');
  baseUrl = 'http://127.0.0.1:' + server.address().port;
  browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_EXECUTABLE });
});
after(async () => {
  await browser?.close();
  if (server) await new Promise(done => server.close(done));
});

async function open(t, { guest = false, path = '/' } = {}) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, timezoneId: 'Asia/Seoul', reducedMotion: 'reduce' });
  page.setDefaultTimeout(4000);
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('dialog', dialog => dialog.accept());
  await page.route('**/*', route => {
    const request = route.request();
    if (request.url().startsWith(baseUrl)) return route.continue();
    // 표시용 외부 이미지와 Leaflet CDN만 inert fixture로 대체한다. 실제 map/CDN 통합은 검증 범위 밖.
    if (request.resourceType() === 'image') return route.fulfill({ contentType: 'image/png', body: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=', 'base64') });
    if (/^https:\/\/unpkg\.com\/leaflet@1\.9\.4\/dist\/leaflet\.(js|css)$/.test(request.url())) return route.fulfill({ contentType: request.resourceType() === 'script' ? 'text/javascript' : 'text/css', body: '' });
    errors.push('차단한 예상 밖 외부 요청: ' + request.resourceType());
    return route.abort();
  });
  t.after(async () => {
    try {
      assert.deepEqual(await page.evaluate(() => window.fixture.unhandled), [], '모든 API는 명시된 Mock이어야 한다');
      assert.deepEqual(errors, [], '브라우저 오류·외부 요청이 없어야 한다');
    } finally { await page.close(); }
  });
  await page.goto(baseUrl + path + (guest ? '?guest' : ''));
  await page.waitForFunction(() => window.fixtureNavigate);
  if (!guest) await page.waitForFunction(() => window.fixture.requests.some(item => item.path.endsWith('/pets/user/1')));
  await flush(page);
  return page;
}
const flush = page => page.evaluate(() => new Promise(done => requestAnimationFrame(() => requestAnimationFrame(done))));
const storage = (page, key) => page.evaluate(key => JSON.parse(localStorage.getItem(key)), key);
async function navigate(page, tab) { await page.evaluate(tab => window.fixtureNavigate(tab), tab); await flush(page); }
async function dashboard(t) { const page = await open(t); await page.getByRole('button', { name: /건강 대시보드/, exact: false }).first().click(); await page.locator('#vital-profile-form').waitFor(); return page; }
async function snapshot(page, name) {
  if (!process.env.PETCARE_SNAPSHOT_DIR) return;
  await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; } *, *::before, *::after { animation: none !important; transition: none !important; }' });
  await page.mouse.move(0, 0);
  await page.evaluate(async () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    await document.fonts.ready;
    await Promise.all([...document.images].map(image => image.decode().catch(() => {})));
  });
  await flush(page);
  const directory = process.env.PETCARE_SNAPSHOT_DIR;
  await mkdir(directory, { recursive: true });
  const dom = await page.evaluate(() => ({
    text: document.getElementById('root').innerText,
    html: document.getElementById('root').innerHTML,
    textNodes: (() => {
      const walker = document.createTreeWalker(document.getElementById('root'), NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) {
        const range = document.createRange(); range.selectNodeContents(walker.currentNode);
        nodes.push({ value: walker.currentNode.nodeValue, rects: [...range.getClientRects()].map(rect => ({ x: rect.x, y: rect.y, width: rect.width, height: rect.height })) });
      }
      return nodes;
    })(),
    elements: [...document.querySelectorAll('#root *')].map(element => {
      const rect = element.getBoundingClientRect();
      const computed = getComputedStyle(element);
      return { tag: element.tagName, class: element.className?.baseVal ?? element.className,
        style: element.getAttribute('style'), id: element.id, value: element.value ?? null, disabled: element.disabled ?? null,
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
        computed: Object.fromEntries(['display', 'position', 'color', 'backgroundColor', 'fontFamily', 'fontSize', 'borderRadius', 'transform'].map(key => [key, computed[key]])) };
    })
  }));
  await writeFile(resolve(directory, name + '.json'), JSON.stringify(dom, null, 2) + '\n');
  await page.screenshot({ path: resolve(directory, name + '.png'), fullPage: true, animations: 'disabled' });
}

test('실제 App: 모든 activeTab 화면·커뮤니티 상세·마이페이지·일상 AI 연결을 유지한다', async t => {
  const page = await open(t);
  await page.getByRole('heading', { name: '스마트 헬스케어 주요 기능', exact: true }).waitFor();
  await snapshot(page, 'home');
  for (const [button, heading, name] of [
    [/건강 대시보드/, /Fixture Dog/, 'dashboard'],
    [/AI 진단/, 'AI 반려동물 질병 진단 스튜디오', 'diagnosis'],
    [/뉴스/, '실시간 펫 헬스 케어 뉴스', 'news'],
    [/커뮤니티/, '반려인 커뮤니티 & 리포트 공유', 'community'],
    [/24시 응급/, '24시 응급 동물병원 찾기', 'hospitals']
  ]) {
    await page.locator('.site-navbar__links').getByRole('button', { name: button }).click();
    await page.getByRole('heading', { name: heading, exact: typeof heading === 'string' }).first().waitFor();
    await flush(page);
    await snapshot(page, name);
  }
  await navigate(page, 'community');
  await page.getByRole('button', { name: /글 상세보기/ }).click();
  await page.getByText('Fixture community detail', { exact: true }).waitFor();
  await snapshot(page, 'community-detail');
  await page.getByRole('button', { name: /목록으로/ }).click();
  await page.getByText('Fixture community post', { exact: true }).waitFor();
  await navigate(page, 'timeline');
  await page.getByRole('heading', { name: 'Before / After 경과 관찰 타임라인', exact: true }).waitFor();
  await snapshot(page, 'timeline');
  await navigate(page, 'daily-ai');
  await page.getByRole('heading', { name: '일상 펫 케어 & 맞춤 AI 어시스턴트', exact: true }).waitFor();
  await snapshot(page, 'daily-ai');
  await page.locator('.site-navbar__actions').getByRole('button', { name: /Fixture Guardian/ }).click();
  await page.getByRole('heading', { name: '마이페이지', exact: true }).waitFor();
  await snapshot(page, 'mypage');
  await navigate(page, 'login');
  await page.getByPlaceholder('user@petcare.com').waitFor();
  await snapshot(page, 'login');
  assert.equal(await page.evaluate(() => window.fixture.geolocationCalls), 0);
});

test('실제 LoginPage: /login 진입·로그인 App 연결·Logout 세션 정리를 유지한다', async t => {
  const page = await open(t, { guest: true, path: '/login' });
  await page.getByPlaceholder('user@petcare.com').fill('guardian@fixture.test');
  await page.locator('input[type="password"]').fill('Fixture123!');
  await page.locator('button[type="submit"]').click();
  await page.getByRole('heading', { name: '스마트 헬스케어 주요 기능', exact: true }).waitFor();
  assert.equal((await storage(page, 'petcare_user')).id, 1);
  await page.locator('.site-navbar__actions').getByRole('button', { name: '로그아웃', exact: true }).click();
  await page.getByRole('button', { name: '로그인 / 가입', exact: true }).waitFor();
  assert.equal(await storage(page, 'petcare_user'), null);
});

test('Dashboard: 종이 다른 Pet 선택·바이탈 저장·프로필 체중 PUT와 Pet별 상태를 유지한다', async t => {
  const page = await dashboard(t);
  const form = page.locator('#vital-profile-form');
  assert.equal(await form.locator('[name="weight"]').inputValue(), '4');
  await form.locator('[name="weight"]').fill('4.5');
  await form.locator('[name="bodyTemp"]').fill('38.6');
  await page.getByRole('button', { name: /바이탈 & 프로필 저장하기/ }).click();
  await page.waitForFunction(() => window.fixture.requests.some(item => item.method === 'PUT' && item.payload?.weight === '4.5kg'));
  assert.equal((await storage(page, 'petcare_vitals_pet_101')).weight, '4.5');
  assert.equal((await storage(page, 'petcare_history_pet_101')).at(-1).temp, 38.6);
  await page.locator('#dashboard-section').getByRole('button', { name: /Fixture Cat$/ }).click();
  await flush(page);
  assert.equal(await form.locator('[name="weight"]').inputValue(), '3');
  await page.locator('#dashboard-section').getByRole('button', { name: /Fixture Bird$/ }).click();
  await flush(page);
  assert.equal(await form.locator('[name="weight"]').inputValue(), '0.2');
  await page.locator('#dashboard-section').getByRole('button', { name: /Fixture Dog$/ }).click();
  await flush(page);
  assert.equal(await form.locator('[name="weight"]').inputValue(), '4.5');
  await snapshot(page, 'dashboard-saved');
});

test('Dashboard: 빠른 기록·일괄 편집·차트 지표 선택을 유지한다', async t => {
  const page = await dashboard(t);
  await page.getByRole('button', { name: '+ 빠른 기록', exact: true }).click();
  await page.getByPlaceholder('예: 3.5', { exact: true }).fill('4.2');
  await page.getByPlaceholder('예: 38.5', { exact: true }).fill('38.3');
  await page.locator('input[type="date"]').fill('2026-10-03');
  await page.getByRole('button', { name: /차트에 추가/ }).click();
  assert.deepEqual((await storage(page, 'petcare_history_pet_101')).at(-1), { date: '10/03', weight: 4.2, temp: 38.3 });
  await page.getByRole('button', { name: /기록 전체 일괄 편집/ }).click();
  await page.getByPlaceholder('예: 3.8', { exact: true }).last().fill('4.4');
  await page.getByRole('button', { name: /전체 변경사항 저장하기/ }).click();
  assert.equal((await storage(page, 'petcare_history_pet_101')).at(-1).weight, 4.4);
  await page.getByRole('button', { name: /몸무게만/ }).click();
  await flush(page);
  assert.equal(await page.locator('svg path[stroke="#059669"][stroke-width="2.8"]').count(), 1);
  assert.equal(await page.locator('svg path[stroke="#f59e0b"][stroke-width="2.8"]').count(), 0);
  await page.getByRole('button', { name: /체온만/ }).click();
  await flush(page);
  assert.equal(await page.locator('svg path[stroke="#059669"][stroke-width="2.8"]').count(), 0);
  assert.equal(await page.locator('svg path[stroke="#f59e0b"][stroke-width="2.8"]').count(), 1);
  await snapshot(page, 'dashboard-chart');
});

test('Dashboard: 루틴 추가·토글·일괄 수정과 Pet별 완료 기록을 유지한다', async t => {
  const page = await dashboard(t);
  await page.getByRole('button', { name: '+ 추가', exact: true }).click();
  await page.getByPlaceholder('예: 🪥 치아 양치질, 🪮 털 빗질').fill('Fixture Routine');
  await page.getByPlaceholder('예: 치석 예방 및 잇몸 관리').fill('Fixture routine description');
  await page.getByRole('button', { name: '체크리스트에 추가', exact: true }).click();
  const item = (await storage(page, 'petcare_checkitems_pet_101')).at(-1);
  await page.getByText('Fixture Routine', { exact: true }).click();
  assert.equal((await storage(page, 'petcare_checklist_pet_101'))[item.key], true);
  await page.getByRole('button', { name: /루틴 일괄 관리/ }).click();
  await page.getByPlaceholder('루틴 항목명 (예: 수분 섭취)').last().fill('Fixture Edited Routine');
  await page.getByRole('button', { name: /전체 수정사항 일괄 저장/ }).click();
  assert.equal((await storage(page, 'petcare_checkitems_pet_101')).at(-1).label, 'Fixture Edited Routine');
  await page.locator('#dashboard-section').getByRole('button', { name: /Fixture Cat$/ }).click();
  await flush(page);
  assert.equal(await storage(page, 'petcare_checklist_pet_102'), null);
  await page.locator('#dashboard-section').getByRole('button', { name: /Fixture Dog$/ }).click();
  await flush(page);
  assert.equal((await storage(page, 'petcare_checklist_pet_101'))[item.key], true);
});

test('Dashboard: 일정 등록·완료·삭제를 해당 Pet 저장소에 유지한다', async t => {
  const page = await dashboard(t);
  await page.getByRole('button', { name: '+ 일정 등록', exact: true }).click();
  await page.getByPlaceholder('예: 심장사상충 예방약 급여, 1차 정기검진').fill('Fixture Reminder');
  await page.locator('input[type="date"]').fill('2026-10-10');
  await page.getByRole('button', { name: '일정 등록하기', exact: true }).click();
  assert.equal((await storage(page, 'petcare_reminders_pet_101'))[0].title, 'Fixture Reminder');
  await page.getByRole('button', { name: '✔️', exact: true }).click();
  assert.equal((await storage(page, 'petcare_reminders_pet_101'))[0].completed, true);
  await page.getByTitle('일정 삭제', { exact: true }).click();
  assert.deepEqual(await storage(page, 'petcare_reminders_pet_101'), []);
});

test('App/Pet modal: 등록·종 선택·수정 결과가 선택 Pet와 대시보드에 연결된다', async t => {
  const page = await dashboard(t);
  await page.getByRole('button', { name: '+ 반려동물 추가', exact: true }).click();
  await page.getByRole('heading', { name: '새 반려동물 등록', exact: true }).waitFor();
  await page.getByRole('button', { name: /고양이/ }).click();
  await page.getByPlaceholder('예: 초코, 해피, 코코, 뭉치').fill('Fixture New Pet');
  await page.getByPlaceholder('예: 2살').fill('1살');
  await page.getByPlaceholder('예: 3.5kg').fill('1.5');
  await page.getByRole('button', { name: /반려동물 등록 완료/ }).click();
  await page.getByRole('heading', { name: 'Fixture New Pet', exact: true }).waitFor();
  assert.equal(await page.locator('#vital-profile-form [name="weight"]').inputValue(), '1.5');
  await page.getByRole('button', { name: /반려동물 정보 수정$/, exact: false }).click();
  await page.getByPlaceholder('예: 초코, 나비, 콩이').fill('Fixture Renamed Pet');
  await page.getByPlaceholder('예: 4.2').fill('1.8');
  await page.getByRole('button', { name: /반려동물 정보 수정 완료/ }).click();
  await page.getByRole('heading', { name: 'Fixture Renamed Pet', exact: true }).waitFor();
  const saved = await page.evaluate(() => window.fixture.requests.filter(item => item.method === 'PUT' && item.path.endsWith('/pets/104')).at(-1).payload);
  assert.equal(saved.name, 'Fixture Renamed Pet');
  assert.equal(saved.species, 'CAT');
  assert.equal(saved.weight, '1.8kg');
  await snapshot(page, 'dashboard-pet-edited');
});

test('Dashboard subtab: 일상 AI 계산·mock 대화·타임라인·PHR 복귀를 유지한다', async t => {
  const page = await dashboard(t);
  await page.getByRole('button', { name: /일상 맞춤 AI 챗봇/ }).click();
  await page.getByRole('button', { name: /일일 권장 사료량 계산하기/ }).click();
  await page.getByText('영양 계산 리포트 결과', { exact: false }).waitFor();
  await page.getByPlaceholder('✨ Gemini AI에게 건강/행동/영양을 자유롭게 물어보세요...').fill('Fixture question');
  await page.getByRole('button', { name: '전송 🚀', exact: true }).click();
  await page.getByText('Fixture reply: 외부 AI 호출 없음', { exact: true }).waitFor();
  const request = await page.evaluate(() => window.fixture.requests.find(item => item.path === '/api/v1/chat/daily'));
  assert.equal(request.payload.petName, 'Fixture Dog');
  await page.getByRole('button', { name: /증상 경과 타임라인/ }).click();
  await page.locator('#timeline-section').waitFor();
  await page.getByRole('button', { name: /바이탈 & 건강 대시보드/ }).click();
  assert.equal(await page.locator('#vital-profile-form [name="weight"]').inputValue(), '4');
});
