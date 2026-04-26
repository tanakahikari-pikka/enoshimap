// =============================================
// ビンゴページ専用 (bingo.js)
// グリッド描画・リセットボタン
// =============================================

const grid = document.getElementById('grid');

function renderGrid() {
  grid.innerHTML = '';
  const lines = getBingoLines();
  const lineCells = new Set(lines.flat());

  missions.forEach((m, i) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    if (i === 12) cell.classList.add('free');
    if (checked[i]) cell.classList.add('checked');
    if (lineCells.has(i) && checked[i]) cell.classList.add('bingo-line');

    cell.innerHTML = `
      <div class="cell-num">${String(i + 1).padStart(2, '0')}</div>
      <div class="cell-spot">${m.spot}</div>
      <div class="cell-icon">${m.icon}</div>
      <div class="cell-text">${m.title}</div>
    `;
    cell.addEventListener('click', () => openModal(i));
    grid.appendChild(cell);
  });
}

onStateChange(renderGrid);

document.getElementById('reset').addEventListener('click', () => {
  if (confirm('進捗をリセットしますか?(すべて未チェックに戻ります)')) {
    for (let i = 0; i < 25; i++) checked[i] = false;
    saveState();
    notifyStateChange();
  }
});

// 初回描画
renderGrid();
updateProgress();
