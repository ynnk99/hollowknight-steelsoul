// ── Steel Soul Tracker – Konfiguration ──────────────────────────────────
// Trag hier deinen eigenen CSV-Link ein, falls sich dein Sheet ändert.
// Standard-Export-Link funktioniert, solange das Sheet auf "Jeder mit
// Link kann ansehen" steht (Freigeben-Button oben rechts in Google Sheets).
// Alternativ: Datei → Freigeben → Im Web veröffentlichen → CSV, dann den
// dortigen Link hier einsetzen.

const STEELSOUL_CONFIG = {
  // Deine Tabelle, Tabellenblatt "Steelsoul" (gid=1668153894)
  csvUrl: 'https://docs.google.com/spreadsheets/d/1e_Y7ugMwyxYiwd5p4ZV0WezsmUH40fDiCSrIMtvQfVs/export?format=csv&gid=1668153894',

  // ── NEU: Overlay-Steuerung & Pantheon 5 ──────────────────────────────
  // Gleiche Spreadsheet-ID, aber zwei weitere Tabellenblätter.
  // gid=XXXXXXXXX unten jeweils durch die echte gid aus der URL ersetzen,
  // wenn du das jeweilige Tabellenblatt in Google Sheets geöffnet hast
  // (https://docs.google.com/spreadsheets/d/.../edit?gid=DEINE_GID).

  // Tabellenblatt "Overlay Config": A1 = Pantheon-5-Overlay anzeigen,
  // A2 = Steel-Soul-Overlay anzeigen, A3 = Silksong-Overlay anzeigen
  // (alles Checkboxen). Bei mehreren Häkchen gilt die Reihenfolge
  // Pantheon > Steel Soul > Silksong.
  overlayConfigCsvUrl: 'https://docs.google.com/spreadsheets/d/1e_Y7ugMwyxYiwd5p4ZV0WezsmUH40fDiCSrIMtvQfVs/export?format=csv&gid=1326149486',
  overlayConfigCells: {
    showPantheon:  'A1',
    showSteelsoul: 'A2',
    showSilksong:  'A3',
  },

  // Tabellenblatt "Silksong": A1/B1 = Überschriften "Tode"/"Bosse",
  // A2 = Anzahl Tode, B2 = Anzahl besiegter Bosse. Ganz simpler Zähler,
  // kann später erweitert werden.
  silksongCsvUrl: 'https://docs.google.com/spreadsheets/d/1e_Y7ugMwyxYiwd5p4ZV0WezsmUH40fDiCSrIMtvQfVs/export?format=csv&gid=2025660023',
  silksongCells: {
    deaths: 'A2',
    bosses: 'B2',
  },

  // Tabellenblatt "Pantheons": Bereich Q1:T51 = Pantheon-5-Versuche,
  // V1:W42 = Boss-Reihenfolge (aufsteigend sortiert) für die PB-Ermittlung,
  // X1 = Timer Start/Stop-Checkbox, X2 = Timer-Reset-Checkbox.
  pantheonCsvUrl: 'https://docs.google.com/spreadsheets/d/1e_Y7ugMwyxYiwd5p4ZV0WezsmUH40fDiCSrIMtvQfVs/export?format=csv&gid=266034943',
  pantheonColumns: {
    attempt:    'R',
    status:     'S',   // leer = noch nicht gelaufen, ✅/❌ = Ergebnis
    deathCause: 'T',   // Bossname bei ❌, "-" bei ✅
    completionTime: 'U', // vom Script automatisch befüllt, sobald S auf ✅ gesetzt wird
  },
  pantheonBossOrder: {
    rank: 'V',  // fortlaufende Nummer, nur zur Orientierung
    name: 'W',  // Bossname, aufsteigend nach Reihenfolge im Pantheon
  },
  // Timer: X1/X2 sind die Checkboxen, die DU im Sheet anklickst. Ein an das
  // Sheet gebundenes Apps Script (siehe apps-script-timer.gs) schreibt daraus
  // einen echten Zeitstempel nach Y1/Y2 – dadurch überlebt der Timer jeden
  // Browser-/OBS-Reload, weil das Overlay nur noch "jetzt − Startzeitpunkt"
  // rechnet, statt lokal mitzuzählen.
  pantheonTimerCells: {
    running: 'X1',  // Checkbox: Start/Pause (von dir angeklickt)
    reset:   'X2',  // Checkbox: Reset, setzt sich per Script selbst zurück
    startTs: 'Y1',  // vom Script gesetzt: Zeitstempel (ms) seit Start, 0 = pausiert
    elapsed: 'Y2',  // vom Script gesetzt: bereits angesammelte Zeit (ms) – auch manuell überschreibbar
  },
  // Wie oft die Steuer-Zellen (Ansicht + Timer) abgefragt werden – schneller
  // als der normale Refresh, damit Start/Stop/Reset zügig reagiert.
  controlPollIntervalMs: 2000,

  // Wie oft neu geladen wird (Millisekunden). 5000 = alle 5 Sekunden.
  refreshIntervalMs: 5000,

  // Spaltennamen aus deinem Sheet (Header aus Zeile 1). Groß-/Kleinschreibung
  // egal. Wenn du Spalten umbenennst oder neue hinzufügst, hier ergänzen.
  columnAliases: {
    attempt:    ['versuch', 'versuch #', 'attempt', 'nr', 'run'],
    status:     ['geschafft?', 'geschafft', 'status'],
    deathCause: ['gescheitert an', 'todesursache', 'death', 'gestorben an'],
    date:       ['datum', 'date'],
    igt:        ['ingame-zeit', 'ingame zeit', 'igt', 'zeit'],
    nail:       ['nagel-level', 'nagel', 'nail'],
    note:       ['notiz', 'note', 'kommentar'],
  },

  // Spalte B enthält ein Emoji statt Text. So wird es erkannt:
  //  ⏳ / ⌛  → Versuch läuft gerade (das ist der "aktuelle Versuch")
  //  ✅ / ✔  → Versuch geschafft
  //  ❌ / ✖  → Versuch gescheitert
  statusEmoji: {
    running: ['⏳', '⌛', '🕐', '🕛'],
    success: ['✅', '✔️', '✔', '🟢'],
    failed:  ['❌', '✖️', '✖', '🔴', '🗙'],
  },

  // Bosse pro Run: Bereich J2:K100. Zeile 1 = Überschrift "Bosse", ignoriert.
  // J = Versuch-Referenz, K = Name des besiegten Bosses. Eine Zeile pro Boss,
  // mehrere Zeilen pro Versuch möglich.
  bossColumns: {
    attempt: 'J',
    boss:    'K',
  },

  // Clips pro Run: Bereich G2:I100. Zeile 1 = Überschrift "Clips", ignoriert.
  // G = Versuch-Referenz, H = Kategorie (Dropdown), I = Twitch-Link.
  clipColumns: {
    attempt:  'G',
    category: 'H',
    link:     'I',
  }
};
