// =============================================
// 地図ページ専用 (map.js)
// Leaflet初期化・ピン配置・現在地
// =============================================

// 江ノ島中心付近
const ENOSHIMA_CENTER = [35.2998, 139.4790];

const map = L.map('map', {
  zoomControl: true,
  attributionControl: true,
}).setView(ENOSHIMA_CENTER, 17);

// 全ピンが収まる境界を計算
const bounds = L.latLngBounds(missions.map(m => m.coords));
map.fitBounds(bounds, { padding: [30, 30] });

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// ピンHTMLを生成
function pinHTML(mission, idx) {
  const free = idx === 12 ? 'free' : '';
  const done = checked[idx] ? 'checked' : '';
  return `
    <div class="enopin ${free} ${done}">
      <span class="enopin-num">${String(idx + 1).padStart(2, '0')}</span>
      <span class="enopin-icon">${mission.icon}</span>
    </div>
  `;
}

function makeIcon(mission, idx) {
  return L.divIcon({
    className: 'enopin-wrapper',
    html: pinHTML(mission, idx),
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  });
}

// 全ピンを配置
const markers = [];
missions.forEach((m, i) => {
  if (!m.coords) return;
  const marker = L.marker(m.coords, { icon: makeIcon(m, i) }).addTo(map);
  marker.on('click', () => openModal(i));
  markers.push(marker);
});

// 状態変更時にピンを更新
function updatePins() {
  missions.forEach((m, i) => {
    if (!markers[i]) return;
    markers[i].setIcon(makeIcon(m, i));
  });
}
onStateChange(updatePins);

// ===== 現在地ボタン =====
let userMarker = null;

document.getElementById('geo-btn').addEventListener('click', () => {
  if (!navigator.geolocation) {
    alert('お使いのブラウザは位置情報に対応していません。');
    return;
  }
  const btn = document.getElementById('geo-btn');
  const original = btn.textContent;
  btn.textContent = '取得中…';
  btn.disabled = true;

  navigator.geolocation.getCurrentPosition(
    pos => {
      const { latitude, longitude } = pos.coords;
      if (userMarker) userMarker.remove();
      userMarker = L.circleMarker([latitude, longitude], {
        radius: 9,
        color: '#fff',
        weight: 2,
        fillColor: '#1f3a5f',
        fillOpacity: 0.85,
      }).addTo(map);
      userMarker.bindTooltip('現在地', { permanent: false, direction: 'top' });
      map.panTo([latitude, longitude], { animate: true });
      btn.textContent = original;
      btn.disabled = false;
    },
    err => {
      alert('位置情報の取得に失敗しました: ' + err.message + '\n\nヒント: file:// で開いている場合、Geolocationは動きません。ホスティング(GitHub Pages等)してアクセスしてください。');
      btn.textContent = original;
      btn.disabled = false;
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
  );
});

// ===== 全体表示ボタン =====
document.getElementById('center-btn').addEventListener('click', () => {
  map.fitBounds(bounds, { padding: [30, 30], animate: true });
});

// 進捗表示の初回更新
updateProgress();
