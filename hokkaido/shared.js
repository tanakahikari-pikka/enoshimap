// =============================================
// 北海道ビンゴ - 共通モジュール (hokkaido/shared.js)
// missions / localStorage / 詳細モーダル / 状態通知
// エノシマップ shared.js の北海道版。ロジックは同一、データとキーのみ差し替え。
// =============================================

// 25マスのミッション定義（7/18-20 札幌旅行・すすきの中心）
// coords: [緯度, 経度] - 当日ズレてたらここを直す。
const missions = [
  // Row 1: 到着 & 空港 & 大通
  { area: '新千歳空港',   spot: '到着ロビー',       icon: '✈️', title: '北海道、上陸',           mission: '到着ロビーの「ようこそ北海道へ」やご当地サインの前で、二人でツーショット。旅のはじまりの一枚。', tip: '11:35着。まずは記念に。荷物を持ったまま勢いで撮るのが吉。', coords: [42.77520, 141.69230] },
  { area: '新千歳空港',   spot: '北海道ラーメン道場', icon: '🍜', title: 'ラーメン道場で一杯',     mission: 'らーめん空 / 雪あかり / けやき のどれかで、湯気の立つ一杯を真上から撮る。',                     tip: '道場は3F。まずは空港ラーメンで胃袋を北海道に慣らす。',   coords: [42.77558, 141.69240] },
  { area: '道中',         spot: 'ソフトクリーム',   icon: '🍦', title: '北海道のソフト',         mission: '濃厚な北海道ソフトクリームを、溶ける前に二人の手で持って一枚。',                                   tip: 'おやつタイム。ミルクの濃さは正義。',                     coords: [42.77545, 141.69200] },
  { area: '札幌市内',     spot: 'さっぽろテレビ塔', icon: '🗼', title: 'テレビ塔と',             mission: '大通公園側からさっぽろテレビ塔の全身を入れて、二人で一枚。',                                       tip: '夜はライトアップも綺麗。時間帯で表情が変わる。',         coords: [43.06110, 141.35650] },
  { area: '札幌市内',     spot: '大通公園',         icon: '🌳', title: '大通公園のベンチ',       mission: '大通公園の花壇やベンチで、並んで座った瞬間を撮る。',                                               tip: '夏の大通は花がきれい。トウキビワゴンも狙い目。',         coords: [43.06055, 141.35060] },

  // Row 2: 札幌市内定番 & すすきの入口
  { area: '札幌市内',     spot: '札幌市時計台',     icon: '🕰', title: '時計台の定番',           mission: '市時計台を正面から。「日本三大がっかり名所」ネタも込めて笑顔で。',                                 tip: '道路挟んだ展望スペースからが撮りやすい。',               coords: [43.06250, 141.35360] },
  { area: '札幌市内',     spot: 'セイコーマート',   icon: '🏪', title: 'セコマでご当地',         mission: '北海道のご当地コンビニ「セイコーマート」で、ホットシェフや道産商品を手に一枚。',                   tip: '道民のソウルコンビニ。ガラナやカツ丼、山わさびもチェック。', coords: [43.05540, 141.35280] },
  { area: 'すすきの',     spot: 'すすきの交差点',   icon: '🌃', title: 'ニッカの大看板',         mission: 'すすきの交差点のニッカウヰスキーのネオン大看板をバックに、夜のツーショット。',                     tip: 'すすきのの象徴。夜のネオンが灯ってからが本番。',         coords: [43.05540, 141.35360] },
  { area: 'すすきの',     spot: '狸小路商店街',     icon: '🛍', title: '狸小路をぶらり',         mission: '狸小路のアーケードを歩きながら、看板だらけの通りを背景に一枚。',                                   tip: '雨でも濡れないアーケード。端から端まで意外と長い。',     coords: [43.05750, 141.35400] },
  { area: '山鼻',         spot: 'お寿司 まつりや 山鼻店', icon: '🍣', title: 'まつりやの寿司',     mission: 'お寿司まつりや山鼻店で、握りたてのネタを一貫アップで撮る。',                                       tip: '整理券予約。30分〜2時間前を目安に取っておく。',         coords: [43.04350, 141.34330] },

  // Row 3: ホテル & すすきの夜 (中央=FREE)
  { area: '拠点',         spot: 'ランドーホテル札幌プレステージ', icon: '🏨', title: '今夜の宿',       mission: 'ホテルの部屋 or エントランスで、チェックイン気分の一枚。旅の拠点を記録。',                         tip: 'すすきの・大通どちらもすぐ。ここが二人のベースキャンプ。', coords: [43.05262, 141.35233] },
  { area: 'すすきの',     spot: '居酒屋 or ビヤホール', icon: '🍺', title: 'クラシックで乾杯',   mission: 'サッポロクラシックのジョッキで乾杯している瞬間を、グラスをぶつける手元で撮る。',                   tip: '道産子はクラシック。旅の無事と誕生日に、かんぱい。',     coords: [43.05580, 141.35480] },
  { area: 'FREE',         spot: 'いつでも',         icon: '💞', title: '【FREE】二人のベストショット', mission: 'お互いを撮っても自撮りでもOK。「今日いちばんの笑顔」が条件。',                              tip: '撮影は道中いつでもOK。撮ったらこのマスをチェック。',     coords: [43.05560, 141.35380] },
  { area: 'すすきの',     spot: '夜パフェ専門店',   icon: '🍨', title: '締めパフェ',             mission: 'すすきの名物「締めパフェ」を、断面 or 全体が映える角度で撮る。',                                   tip: 'ラーメンで締めない文化。夜のパフェは別腹。',             coords: [43.05530, 141.35440] },
  { area: 'すすきの',     spot: 'すすきの夜景',     icon: '🌉', title: 'ネオンの海',             mission: 'ビルの合間に広がるすすきののネオンを背景に、シルエットのツーショットを撮る。',                     tip: 'ホテル高層階や歩道橋からだと画になる。',                 coords: [43.05510, 141.35370] },

  // Row 4: Day2 モーニング & 移動 & おでかけ
  { area: '山鼻',         spot: 'サンドイッチ工房 サンドリア', icon: '🥪', title: 'サンドリアの朝', mission: '早朝のサンドリアで、選んだサンドイッチを二人分そろえて一枚。',                                     tip: '24時間営業の老舗。ホテルから歩いて向かうのが朝の儀式。', coords: [43.04943, 141.34579] },
  { area: '移動',         spot: '市電 山鼻9条→大通', icon: '🚋', title: '札幌市電に乗る',       mission: 'レトロな札幌市電の車内 or 山鼻9条停留場で、これから出発の一枚。',                                 tip: '山鼻9条から乗車。ゴトゴト揺れる路面電車が旅情たっぷり。', coords: [43.04520, 141.34300] },
  { area: '大通',         spot: '大通バスセンター', icon: '🚌', title: 'いざ、おでかけ',         mission: '大通バスセンターで、バスに乗り込む前の一枚。',                                                     tip: '8:40くらい集合。飲み物と日焼け対策を忘れずに。',         coords: [43.06070, 141.35850] },
  { area: '大通',         spot: 'キッチンカー',     icon: '🌭', title: 'キッチンカー飯',         mission: 'キッチンカーや屋台のグルメを、二人でシェアしている瞬間を撮る。',                                   tip: '昼はちょい時間をずらすと並ばず買える。',                 coords: [43.06060, 141.35550] },
  { area: 'すすきの',     spot: 'ジンギスカン',     icon: '🐑', title: 'ジンギスカンを焼く',     mission: 'ジンギスカン鍋の上で焼ける羊肉と野菜を、湯気ごしに撮る。',                                         tip: '煙対策で匂ってもいい服で。ラムの脂は正義。',             coords: [43.05480, 141.35480] },

  // Row 5: Day3 & 帰路
  { area: 'すすきの',     spot: 'すすきのモーニング', icon: '☕', title: 'すすきのモーニング',    mission: '最終日の朝、すすきの周辺のカフェで、モーニングプレートやコーヒーと一枚。',                         tip: '3日目はゆっくり朝から。すすきの周辺のカフェで一息。',    coords: [43.05560, 141.35300] },
  { area: '札幌市内',     spot: '二条市場',         icon: '🦀', title: '市場をぶらぶら',         mission: '二条市場のカニや海産物が並ぶ店先を、活気ごと一枚に収める。',                                       tip: '朝〜昼が活気ある。試食しながら歩くのが楽しい。',         coords: [43.05960, 141.35680] },
  { area: '札幌市内',     spot: '大磯 (二条市場)',  icon: '🐟', title: '大磯に突撃',             mission: '二条市場の大磯で、海鮮丼 or 名物を目の前にした「いただきます」の一枚。',                           tip: '二条市場をぶらぶらしてからここへ。海鮮の締め。',         coords: [43.05955, 141.35660] },
  { area: '新千歳空港',   spot: '松尾ジンギスカン 新千歳空港店', icon: '🐏', title: '締めのジンギスカン', mission: '空港3Fグルメワールドの松尾ジンギスカンで、旅の最後の一皿を撮る。',                         tip: '18時着→19時には食べ終わる算段で。19:50フライト。',      coords: [42.77560, 141.69120] },
  { area: '新千歳空港',   spot: '出発ゲート',       icon: '🛫', title: 'また来よう',             mission: '出発ゲート前で、名残惜しく振り返る二人の一枚。旅のフィナーレ。',                                   tip: '19:50発。搭乗前にこれを撮ってミッションコンプリート。',  coords: [42.77520, 141.69250] }
];

// ===== 永続化 =====
const STORAGE_KEY = 'hokkaido-bingo-v1';

function defaultState() {
  return new Array(25).fill(false);
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length !== 25) return defaultState();
    return parsed.map(v => !!v);
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
