// =============================================
// グルメリスト (food.js)
// データ・絞り込み・描画
// =============================================

// 江ノ島の有名店リスト（順序は参道に近い順を意識）
// 営業情報は当日Googleマップで確認推奨
const foods = [
  // ===== ご飯 =====
  { genre: 'meal', name: 'きむら',                   desc: '弁天橋すぐの磯料理。生しらす丼・海鮮料理の老舗。', url: 'https://maps.app.goo.gl/zM9K6HkZsFoqVnMm8' },
  { genre: 'meal', name: 'とびっちょ 本店',           desc: 'しらす丼の超有名店。行列覚悟で。',     map: 'とびっちょ本店 江の島' },
  { genre: 'meal', name: 'しらす問屋 とびっちょ 弁天橋店', desc: '本店の混雑を避けたい時はこちら。',   map: 'しらす問屋とびっちょ 弁天橋' },
  { genre: 'meal', name: '江之島亭',                 desc: '稚児ヶ淵手前の老舗。海鮮丼と展望。', map: '江之島亭 江の島' },
  { genre: 'meal', name: '魚見亭',                   desc: '稚児ヶ淵の崖上、海と富士山テラス席。', map: '魚見亭 江の島' },
  { genre: 'meal', name: 'かわかつ',                 desc: '生しらす×釜揚げの二色丼が名物。',     map: 'かわかつ 江の島' },
  { genre: 'meal', name: '江の島小屋',               desc: '対岸・湘南海岸沿い。大盛り定食。',     map: '江の島小屋 片瀬' },

  // ===== カフェ =====
  { genre: 'cafe', name: 'LONCAFE 江ノ島本店',        desc: '元祖フレンチトースト専門店・展望テラス。', map: 'LONCAFE 江の島本店' },
  { genre: 'cafe', name: 'iL CHIANTI BEACHE',         desc: 'シーキャンドル近く。海を見るイタリアン。', map: 'iL CHIANTI BEACHE 江の島' },
  { genre: 'cafe', name: 'カフェ マディソン江ノ島',     desc: 'ヴィンテージ感×海の眺望でゆったり。',     map: 'カフェマディソン 江の島' },
  { genre: 'cafe', name: 'Cafe Madu 江ノ島',           desc: '南仏風の人気カフェ。スイーツも◎。',       map: 'Cafe Madu 江の島' },
  { genre: 'cafe', name: 'GARB 江ノ島',               desc: '展望テラスのモダンダイニング。',         map: 'GARB 江ノ島' },

  // ===== スイーツ =====
  { genre: 'sweet', name: 'あさひ本店',              desc: '丸焼きたこせんべい。江ノ島の象徴。',   map: 'あさひ本店 江の島 たこせんべい' },
  { genre: 'sweet', name: '中村屋羊羹店',            desc: '創業100年超の老舗。女夫まんじゅう・羊羹。', map: '中村屋羊羹店 江の島' },
  { genre: 'sweet', name: '紀の国屋本店',            desc: '江ノ電もなか・お土産の定番。',         map: '紀の国屋本店 江の島' },
  { genre: 'sweet', name: '江の島のたから',          desc: 'みたらし大判焼きと冷甘酒。',           map: '江の島のたから' },
  { genre: 'sweet', name: '貝作',                    desc: 'しらすソフトクリーム名物。',           map: '貝作 江の島 しらすソフト' },
  { genre: 'sweet', name: '杉本商店',                desc: '名物・磯部餅の手作り菓子店。',         map: '杉本商店 江の島' }
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
    li.innerHTML = `
      <div class="food-head">
        <span class="food-genre ${f.genre}">${GENRE_LABEL[f.genre]}</span>
        <span class="food-name">${f.name}</span>
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
