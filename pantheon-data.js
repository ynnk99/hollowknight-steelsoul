// ── Overlay-Steuerung & Pantheon-5-Logik ─────────────────────────────────
// Getrennt von steelsoul-data.js, damit Steel-Soul-Logik unangetastet bleibt.
const PantheonSoul = (function () {

  function colLetterToIndex(letter) {
    return letter.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
  }

  // Parst eine einzelne Zellreferenz wie "A1" oder "X2" aus dem geparsten Grid.
  function cellValue(rows, ref) {
    const m = /^([A-Z]+)(\d+)$/.exec(ref.toUpperCase());
    if (!m) return '';
    const col = colLetterToIndex(m[1]);
    const row = parseInt(m[2], 10) - 1;
    return ((rows[row] && rows[row][col]) || '').toString().trim();
  }

  // Google Sheets exportiert Checkboxen als "TRUE"/"FALSE" im CSV.
  function isChecked(raw) {
    const v = (raw || '').toString().trim().toUpperCase();
    return ['TRUE', 'WAHR', '1', 'JA', 'YES', '✓', 'X'].includes(v);
  }

  function classifyPantheonStatus(raw) {
    const v = (raw || '').toString().trim();
    if (!v) return '';
    if (['✅', '✔️', '✔', '🟢'].some(e => v.includes(e))) return 'success';
    if (['❌', '✖️', '✖', '🔴', '🗙'].some(e => v.includes(e))) return 'failed';
    return '';
  }

  async function fetchCsvRows(url) {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('CSV konnte nicht geladen werden (' + res.status + ')');
    const text = await res.text();
    return Papa.parse(text.trim(), { skipEmptyLines: false }).data;
  }

  // ── Overlay Config: welche Ansicht soll gezeigt werden? ──
  async function fetchOverlayConfig() {
    const rows = await fetchCsvRows(STEELSOUL_CONFIG.overlayConfigCsvUrl);
    const cells = STEELSOUL_CONFIG.overlayConfigCells;
    return {
      showPantheon: isChecked(cellValue(rows, cells.showPantheon)),
      showSteelsoul: isChecked(cellValue(rows, cells.showSteelsoul)),
    };
  }

  // ── Pantheon 5: Versuche, PB, Timer-Steuerzellen ──
  function parsePantheonState(rows) {
    const cols = STEELSOUL_CONFIG.pantheonColumns;
    const attemptIdx = colLetterToIndex(cols.attempt);
    const statusIdx = colLetterToIndex(cols.status);
    const causeIdx = colLetterToIndex(cols.deathCause);
    const order = STEELSOUL_CONFIG.pantheonBossOrder;
    const nameIdx = colLetterToIndex(order.name);

    // Boss-Reihenfolge einlesen (aufsteigend, wie im Sheet einsortiert)
    const rankByName = {};
    let rank = 0;
    for (let i = 0; i < rows.length; i++) {
      const name = (rows[i][nameIdx] || '').toString().trim();
      if (!name) continue;
      rankByName[name.toLowerCase()] = rank;
      rank++;
    }

    // Versuche einlesen (Zeile 1 = Überschrift, überspringen)
    const runs = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const attemptRaw = (row[attemptIdx] || '').toString().trim();
      if (!attemptRaw) continue;
      const attempt = parseInt(attemptRaw, 10) || attemptRaw;
      const statusRaw = (row[statusIdx] || '').toString().trim();
      const status = classifyPantheonStatus(statusRaw);
      const deathCause = (row[causeIdx] || '').toString().trim();
      runs.push({ attempt, status, success: status === 'success', failed: status === 'failed', deathCause });
    }

    // aktueller Versuch = oberste Zeile ohne Status
    const current = runs.find(r => r.status === '') || null;

    // Personal Best: unter allen ❌-Versuchen der am weitesten unten
    // stehende (= am weitesten in der Reihenfolge gekommene) Bossname.
    // Ein ✅ (vollständiger Clear) schlägt automatisch jeden Boss-Treffer.
    let pbBoss = null, pbRank = -1, fullClear = false;
    runs.forEach(r => {
      if (r.success) { fullClear = true; return; }
      if (!r.failed || !r.deathCause || r.deathCause === '-') return;
      const rk = rankByName[r.deathCause.toLowerCase()];
      if (rk !== undefined && rk > pbRank) { pbRank = rk; pbBoss = r.deathCause; }
    });

    // Timer: nur noch die serverseitig geschriebenen Zeitstempel lesen.
    // X1/X2 (Checkboxen) werden hier bewusst NICHT mehr gelesen – die sind
    // reine Nutzer-Eingabe fürs Apps Script, nicht für die Zeitberechnung.
    const timerCells = STEELSOUL_CONFIG.pantheonTimerCells;
    const timerStartTs = Number(cellValue(rows, timerCells.startTs)) || 0;
    const timerElapsedOffset = Number(cellValue(rows, timerCells.elapsed)) || 0;

    return { runs, current, pbBoss, fullClear, timerStartTs, timerElapsedOffset };
  }

  async function fetchPantheonState() {
    const rows = await fetchCsvRows(STEELSOUL_CONFIG.pantheonCsvUrl);
    return parsePantheonState(rows);
  }

  // ── Timer-Anzeige: rein rechnerisch aus Server-Zeitstempel + "jetzt" ──
  // Kein lokaler Zustand mehr nötig (kein elapsedMs/runningSince), dadurch
  // übersteht der Timer jeden Reload der Overlay-Seite verlustfrei – der
  // "wahre" Zustand steht komplett im Sheet (siehe apps-script-timer.gs).
  let _timerStartTs = 0;
  let _timerElapsedOffset = 0;

  function setTimerState(startTs, elapsedOffset) {
    _timerStartTs = startTs || 0;
    _timerElapsedOffset = elapsedOffset || 0;
  }

  function currentElapsedMs() {
    return _timerStartTs > 0
      ? _timerElapsedOffset + (Date.now() - _timerStartTs)
      : _timerElapsedOffset;
  }

  function currentlyRunning() {
    return _timerStartTs > 0;
  }

  function formatElapsed(ms) {
    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const pad = n => String(n).padStart(2, '0');
    return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
  }

  return {
    fetchOverlayConfig, fetchPantheonState,
    setTimerState, currentElapsedMs, currentlyRunning, formatElapsed,
  };
})();
