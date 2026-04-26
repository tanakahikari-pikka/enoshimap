// =============================================
// 江ノ島ビンゴ - 共通モジュール (shared.js)
// missions / localStorage / 詳細モーダル / 状態通知
// =============================================

// 25マスのミッション定義
// coords: [緯度, 経度] - 江ノ島周辺の近似値。当日ズレてたらここを直す。
const missions = [
  // Row 1: 入口〜仲見世
  { area: '入口',           spot: '青銅の鳥居',     icon: '⛩', title: '青銅の鳥居を仰ぐ',       mission: '青銅の鳥居の真下から、二人で見上げるアングルで一枚。鳥居の額束(がくづか)が画面の真ん中に来るように。', tip: '逆光で撮ると神々しく映える。',            coords: [35.30143, 139.48015] },
  { area: '仲見世通り',     spot: '仲見世通り',     icon: '🍘', title: 'シェアした食べ物',       mission: 'たこせんべい/しらす丼/女夫まんじゅう など、二人で1つをシェアしている瞬間を撮影。',                       tip: '丸焼きたこせんべいは行列必至。並ぶのも思い出。', coords: [35.30100, 139.47985] },
  { area: '仲見世通り',     spot: '仲見世通り',     icon: '🏮', title: 'レトロ看板コレクト',     mission: '昭和感の残る看板や木札を1つ選んで撮影。文字がはっきり読めるように。',                                       tip: '老舗の旅館や食堂の入口を狙うと◎。',          coords: [35.30075, 139.47963] },
  { area: '入口',           spot: '弁天橋',         icon: '🌉', title: '弁天橋からの全景',       mission: '弁天橋の途中で振り返り、江ノ島全体が画面に収まる構図で1枚。',                                                tip: '橋の手すりを画面下に入れると奥行きが出る。',  coords: [35.30295, 139.48125] },
  { area: '入口',           spot: '朱の鳥居前',     icon: '🪞', title: '影だけツーショット',     mission: '朱の鳥居を背景に、二人の影だけが地面に映った写真を撮る。顔は写さない。',                                       tip: '午前11時前 or 午後3時以降の斜光が狙い目。',   coords: [35.30060, 139.47948] },

  // Row 2: 辺津宮〜中津宮
  { area: '辺津宮',         spot: '辺津宮・銭洗',   icon: '💰', title: '銭洗い池',               mission: '辺津宮の銭洗い白龍王でお金を洗う様子を、二人の手元アップで撮影。',                                            tip: 'ザルとお札 or 硬貨を一緒に。商売繁盛を願って。', coords: [35.30055, 139.47960] },
  { area: '辺津宮',         spot: '辺津宮・授与所', icon: '🎴', title: '巾着絵馬の手元',         mission: '辺津宮で授与される巾着型の絵馬を、二人の手で持っている構図で撮影。',                                          tip: '願い事を書いてからの方がドラマがある。',      coords: [35.30049, 139.47950] },
  { area: '中津宮',         spot: '中津宮 拝殿',    icon: '🏛', title: '左右対称構図',           mission: '中津宮の朱塗りの社殿を、完全に左右対称(シンメトリー)になる位置から撮影。',                                    tip: 'スマホのグリッド線をONにすると揃えやすい。',  coords: [35.29941, 139.48023] },
  { area: '辺津宮',         spot: '辺津宮・手水舎', icon: '🐉', title: '龍の手水舎',             mission: '龍の口から水が流れ出ている瞬間を、シャッタースピード意識で撮る。',                                            tip: '連写モードがおすすめ。',                       coords: [35.30058, 139.47940] },
  { area: '中津宮',         spot: '中津宮 広場',    icon: '🌊', title: '中津宮広場の海',         mission: '中津宮広場の展望スペースから相模湾を撮影。海と空の境界を画面の1/3にすると映える。',                          tip: '晴れた日は江ノ島ヨットハーバーまで見える。',  coords: [35.29945, 139.48035] },

  // Row 3: シーキャンドル
  { area: 'シーキャンドル', spot: '展望台',         icon: '🗻', title: '展望台からの絶景',       mission: '展望台から、富士山(または相模湾の水平線)を主役にした1枚を撮る。',                                            tip: '冬の朝が最もクリアに見える。',                coords: [35.29976, 139.47848] },
  { area: 'FREE',           spot: '道中いつでも',   icon: '💞', title: '【FREE】二人のベストショット', mission: 'お互いを撮るのが一番でも、自撮りでもOK。「今日一番の笑顔」が条件。',                                  tip: 'このマスは最初から✓。撮影は道中いつでも。',  coords: [35.29985, 139.47900] },
  { area: 'コッキング苑',   spot: 'コッキング苑',   icon: '🌷', title: '苑内の植物',             mission: 'コッキング苑内の花や植物を、二人のうち片方の指やシルエットと一緒に撮る。',                                    tip: '季節によってチューリップ/紫陽花/イルミと変わる。', coords: [35.29973, 139.47921] },
  { area: 'シーキャンドル', spot: '展望台',         icon: '🗾', title: '見下ろしの江ノ島',       mission: '展望台から見下ろした江ノ島の地形(参道や森)が分かる構図で撮影。',                                              tip: '北側を向くと弁天橋まで見える。',              coords: [35.29980, 139.47855] },
  { area: 'シーキャンドル', spot: 'シーキャンドル', icon: '🕯', title: 'シーキャンドル全景',     mission: 'シーキャンドルの真下から見上げ、塔の全身を画面に収める。',                                                    tip: '苑入口あたりから振り返ると全体が入る。',      coords: [35.29985, 139.47863] },

  // Row 4: 奥津宮〜龍恋の鐘
  { area: '奥津宮',         spot: '奥津宮 拝殿',    icon: '🐢', title: '八方睨みの亀',           mission: '奥津宮の拝殿天井に描かれた「八方睨みの亀」を真下から撮影。',                                                  tip: 'どこから見ても睨まれている、と感じる名画。',  coords: [35.29936, 139.47557] },
  { area: '龍宮',           spot: '龍宮(わだつみ)', icon: '🐲', title: '龍宮の彫刻',             mission: '奥津宮そばの龍宮(わだつみのみや)の龍の彫刻のディテールを接写。',                                              tip: '逆光だと鱗の陰影が際立つ。',                  coords: [35.29916, 139.47575] },
  { area: '龍恋の鐘',       spot: '龍恋の鐘',       icon: '🔔', title: '鐘を鳴らす瞬間',         mission: '二人で龍恋の鐘を鳴らしている瞬間を、第三者目線で撮影(セルフタイマー or タイムラプス)。',                     tip: 'これを撮らずに帰ったら罰ゲーム対象。',         coords: [35.29874, 139.47682] },
  { area: '龍恋の鐘',       spot: '龍恋の鐘・金網', icon: '🔐', title: '南京錠アップ',           mission: '二人の名前を書いた南京錠を金網に取り付けている手元を接写。',                                                  tip: '錠は仲見世で事前購入。マッキーも忘れずに。',  coords: [35.29870, 139.47685] },
  { area: '恋人の丘',       spot: '恋人の丘',       icon: '🌅', title: '西側の海',               mission: '恋人の丘の展望デッキから、西側に開ける海と夕日方向を撮影。',                                                  tip: '夕方ここに来られると最高。',                   coords: [35.29862, 139.47670] },

  // Row 5: 稚児ヶ淵〜岩屋
  { area: '稚児ヶ淵',       spot: '稚児ヶ淵 磯場', icon: '🪨', title: '磯場に降り立つ',         mission: '稚児ヶ淵の磯場まで階段で降り、岩の上に立つ二人の足元 or 後ろ姿を撮影。',                                       tip: '波が高い日は注意。濡れてもOKな靴で。',         coords: [35.29870, 139.47435] },
  { area: '稚児ヶ淵',       spot: '稚児ヶ淵',       icon: '☀️', title: '海・空・富士山',         mission: '海・空・富士山(または夕日)の3要素が全て入った1枚を撮る。',                                                    tip: '横構図、水平線まっすぐ、を意識。',             coords: [35.29911, 139.47445] },
  { area: '岩屋洞窟',       spot: '岩屋・入口',     icon: '🕯', title: 'ロウソク片手に',         mission: '岩屋入口で受け取るロウソクを片手に、暗い洞窟内に向かう後ろ姿を1枚。',                                          tip: '手ブレしやすい。手すりに肘を固定。',           coords: [35.29836, 139.47435] },
  { area: '岩屋洞窟',       spot: '第一岩屋・最奥', icon: '⛩', title: '第一岩屋の最奥',         mission: '第一岩屋の最奥にある祠を撮影。ロウソクの灯りだけで撮るのが理想。',                                            tip: 'フラッシュは雰囲気を壊すのでOFF推奨。',        coords: [35.29830, 139.47405] },
  { area: '岩屋洞窟',       spot: '岩屋・出口',     icon: '🌊', title: '出口から振り返る',       mission: '岩屋を出た直後、振り返って洞窟の入口と海を一枚に収める。',                                                    tip: 'ここがゴール。お疲れさまでした。',             coords: [35.29840, 139.47438] }
];

// ===== 永続化 =====
const STORAGE_KEY = 'enoshima-bingo-v1';

function defaultState() {
  const arr = new Array(25).fill(false);
  arr[12] = true; // FREEは最初から✓
  return arr;
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length !== 25) return defaultState();
    const normalized = parsed.map(v => !!v);
    normalized[12] = true; // FREEは常に✓
    return normalized;
  } catch (e) {
    return defaultState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  } catch (e) {
    // プライベートブラウズや容量超過などで失敗しても続行
  }
}

// グローバル状態
const checked = loadState();
let currentIndex = -1;

// ===== ビンゴライン検出 =====
function getBingoLines() {
  const lines = [];
  for (let r = 0; r < 5; r++) {
    const row = [0,1,2,3,4].map(c => r*5+c);
    if (row.every(i => checked[i])) lines.push(row);
  }
  for (let c = 0; c < 5; c++) {
    const col = [0,1,2,3,4].map(r => r*5+c);
    if (col.every(i => checked[i])) lines.push(col);
  }
  const diag1 = [0,6,12,18,24];
  const diag2 = [4,8,12,16,20];
  if (diag1.every(i => checked[i])) lines.push(diag1);
  if (diag2.every(i => checked[i])) lines.push(diag2);
  return lines;
}

// ===== 状態変更通知 =====
const stateListeners = [];
function onStateChange(fn) { stateListeners.push(fn); }
function notifyStateChange() { stateListeners.forEach(fn => fn()); }

// 別タブで更新があったときの同期
window.addEventListener('storage', (e) => {
  if (e.key !== STORAGE_KEY) return;
  const next = loadState();
  for (let i = 0; i < 25; i++) checked[i] = next[i];
  notifyStateChange();
});

// ===== 進捗表示の更新（両ページ共通） =====
function updateProgress() {
  const countEl = document.getElementById('count');
  const fillEl = document.getElementById('fill');
  if (!countEl || !fillEl) return;

  const count = checked.filter(Boolean).length;
  countEl.innerHTML = `${count}<span>/25</span>`;
  fillEl.style.width = `${(count / 25) * 100}%`;

  const lines = getBingoLines().length;
  const blackout = count === 25;
  document.querySelectorAll('.badge').forEach(b => {
    const k = b.dataset.key;
    b.classList.remove('active');
    if (k === 'bingo' && lines >= 1) b.classList.add('active');
    if (k === 'double' && lines >= 2) b.classList.add('active');
    if (k === 'triple' && lines >= 3) b.classList.add('active');
    if (k === 'blackout' && blackout) b.classList.add('active');
  });
}
onStateChange(updateProgress);

// ===== 詳細モーダル =====
function openModal(i) {
  currentIndex = i;
  const m = missions[i];
  document.getElementById('m-num').textContent = `No. ${String(i + 1).padStart(2, '0')}`;
  document.getElementById('m-area').textContent = m.area;
  document.getElementById('m-title').textContent = m.title;
  document.getElementById('m-mission').textContent = m.mission;
  document.getElementById('m-tip').textContent = m.tip;

  // Googleマップで開くリンクを更新
  const linkEl = document.getElementById('m-maplink');
  if (linkEl && m.coords) {
    const [lat, lng] = m.coords;
    linkEl.href = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }

  const btn = document.getElementById('btn-check');
  btn.textContent = checked[i] ? '✓ を取り消す' : '撮影完了 ✓';
  btn.classList.toggle('uncheck', checked[i]);
  document.getElementById('modal-bg').classList.add('show');
}

function closeModal() {
  document.getElementById('modal-bg').classList.remove('show');
}

function celebrate(text) {
  const el = document.getElementById('celebration');
  if (!el) return;
  document.getElementById('celeb-text').textContent = text;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2000);
}

// モーダルのボタン配線（DOM ready後に実行）
function initModal() {
  const checkBtn = document.getElementById('btn-check');
  const closeBtn = document.getElementById('btn-close');
  const modalBg  = document.getElementById('modal-bg');
  if (!checkBtn || !closeBtn || !modalBg) return;

  checkBtn.addEventListener('click', () => {
    if (currentIndex < 0) return;
    const before = getBingoLines().length;
    checked[currentIndex] = !checked[currentIndex];
    saveState();
    const after = getBingoLines().length;
    closeModal();
    notifyStateChange();

    const allDone = checked.every(Boolean);
    if (allDone) {
      celebrate('全制覇!');
    } else if (after > before) {
      celebrate(after >= 2 ? `${after}ビンゴ!` : 'BINGO!');
    }
  });

  closeBtn.addEventListener('click', closeModal);
  modalBg.addEventListener('click', (e) => {
    if (e.target.id === 'modal-bg') closeModal();
  });
}

// 初期化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initModal);
} else {
  initModal();
}
