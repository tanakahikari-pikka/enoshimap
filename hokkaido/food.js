// =============================================
// グルメリスト (hokkaido/food.js)
// データ・絞り込み・描画
// 旅程(7/18-20)のお店 + 札幌・すすきの定番。営業情報は当日Googleマップで確認推奨。
// =============================================

const foods = [
  // ===== ご飯 =====
  { genre: 'meal', name: 'らーめん空 新千歳空港店',       day: '7/18 昼', desc: '北海道ラーメン道場の人気店。まずは空港で札幌味噌ラーメンを。', map: 'らーめん空 新千歳空港 ラーメン道場' },
  { genre: 'meal', name: '札幌ラーメン 雪あかり',         day: '7/18 昼', desc: 'ラーメン道場のもう一軒。濃厚味噌が評判。',                     map: '札幌ラーメン 雪あかり 新千歳空港' },
  { genre: 'meal', name: '札幌味噌拉麺専門店 けやき',     day: '7/18 昼', desc: 'すすきの本店で有名なけやきの空港店。味噌一本勝負。',           map: '札幌味噌拉麺専門店 けやき 新千歳空港' },
  { genre: 'meal', name: 'お寿司 まつりや 山鼻店',        day: '7/18 夜', desc: '山鼻の人気寿司店。整理券予約(30分〜2時間前目安)で並びを回避。', map: 'お寿司 まつりや 山鼻店 南13条西10' },
  { genre: 'meal', name: 'サンドイッチ工房 サンドリア',   day: '7/19 朝', desc: '24時間営業の老舗サンド店。ホテルから歩いてモーニング。',       map: 'サンドイッチ工房 サンドリア 札幌' },
  { genre: 'meal', name: '大磯 (二条市場)',               day: '7/20 昼', desc: '二条市場をぶらぶらしてから突撃。海鮮丼が名物。',               map: '大磯 二条市場 札幌' },
  { genre: 'meal', name: '松尾ジンギスカン 新千歳空港店', day: '7/20 夜', desc: '空港3Fグルメワールド。旅の締めジンギスカン。19時には食べ終える算段で。', map: '松尾ジンギスカン 新千歳空港店' },
  { genre: 'meal', name: 'だるま (すすきの)',             day: '定番',    desc: 'すすきののジンギスカン老舗。煙もうもう、ラムの脂が旨い。',     map: '成吉思汗 だるま 本店 すすきの' },
  { genre: 'meal', name: 'スープカレー GARAKU',           day: '定番',    desc: 'すすきののスープカレー人気店。スパイス香る一杯。',             map: 'スープカレー GARAKU 札幌' },

  // ===== カフェ =====
  { genre: 'cafe', name: '雪印パーラー 本店',             day: '定番',    desc: '大通近く。濃厚ソフトとパフェの老舗パーラー。',                 map: '雪印パーラー 本店 札幌' },
  { genre: 'cafe', name: 'すすきののモーニングカフェ',    day: '7/20 朝', desc: 'すすきの付近で朝のコーヒーとモーニングを。当日Googleで開店店舗を確認。', map: 'すすきの モーニング カフェ' },

  // ===== スイーツ =====
  { genre: 'sweet', name: '夜パフェ (締めパフェ)',        day: '7/18 夜', desc: 'すすきの名物「締めパフェ」。飲んだ後の別腹スイーツ文化。',     map: 'すすきの 締めパフェ 夜パフェ' },
  { genre: 'sweet', name: '北海道ソフトクリーム',         day: '7/18 おやつ', desc: 'ミルク濃厚な北海道ソフト。道中で見かけたら迷わず。',        map: '北海道 ソフトクリーム 札幌' },
  { genre: 'sweet', name: '白い恋人パーク (ISHIYA)',      day: 'お土産',  desc: '定番土産・白い恋人の工場テーマパーク。スイーツもここで。',     map: '白い恋人パーク 札幌' }
];

const GENRE_LABEL = {
  meal:  'ご飯',
  cafe:  'カフェ',
  sweet: 'スイーツ'
};

const list = document.getElementById('food-list');
const emptyMsg = document.getElementById('food-empty');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentGenre = 'all';

function renderList() {
  list.innerHTML = '';
  const filtered = currentGenre === 'all'
    ? foods
    : foods.filter(f => f.genre === currentGenre);

  if (filtered.length === 0) {
    emptyMsg.style.display = 'block';
    return;
  }
  emptyMsg.style.display = 'none';

  filtered.forEach(f => {
    const li = document.createElement('li');
    li.className = `food-item ${f.genre}`;
    // f.url が指定されていればそれを優先、無ければ map クエリでGoogleマップ検索URLを生成
    const url = f.url
      || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(f.map)}`;
    const dayTag = f.day ? `<span class="food-day">${f.day}</span>` : '';
    li.innerHTML = `
      <div class="food-head">
        <span class="food-genre ${f.genre}">${GENRE_LABEL[f.genre]}</span>
        <span class="food-name">${f.name}</span>
        ${dayTag}
      </div>
      <div class="food-desc">${f.desc}</div>
      <a class="food-link" href="${url}" target="_blank" rel="noopener">📍 Googleマップで開く →</a>
    `;
    list.appendChild(li);
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    currentGenre = btn.dataset.genre;
    filterBtns.forEach(b => b.classList.toggle('active', b === btn));
    renderList();
  });
});

renderList();
