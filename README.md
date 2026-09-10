# Steel Soul Tracker – Hollow Knight

Fan-Dashboard für No-Death-Läufe (Steel Soul) in Hollow Knight, live verbunden mit einem Google Sheet.

- **`index.html`** – öffentliches Dashboard: aktueller Versuch, Statistiken, Todesursachen, Liste aller Runs mit Bossen & Clips
- **`steelsoul-overlay.html`** – schlankes, transparentes Overlay für OBS als Browserquelle

## Lokal testen

Kein Build-Schritt nötig – `index.html` direkt im Browser öffnen, oder:

```bash
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```

## Google-Sheet-Layout

Tabellenblatt „Steelsoul", erwartetes Layout:

| Spalte | Inhalt |
|---|---|
| A | Versuch (Nummer) |
| B | Status-Emoji: ⏳ läuft gerade · ✅ geschafft · ❌ gescheitert |
| C | Gescheitert an (nur bei ❌) |
| G:I | Clip-Bereich – G = Versuch-Referenz, H = Kategorie, I = Twitch-Link (Zeile 1 = Überschrift, wird ignoriert) |
| J:K | Bosse-Bereich – J = Versuch-Referenz, K = Bossname (Zeile 1 = Überschrift, wird ignoriert). Mehrere Zeilen pro Versuch möglich. |

Zeilen ohne gesetzten Status in Spalte B (z. B. vorbereitete Versuchsnummern für die Dropdowns) werden automatisch ignoriert und tauchen weder in der Liste noch in den Statistiken auf. Der **aktuelle Versuch** ist immer die Zeile mit dem ⏳-Emoji.

**Voraussetzung:** Das Sheet muss auf „Jeder mit dem Link kann ansehen" stehen (Freigeben-Button oben rechts in Google Sheets).

## Konfiguration

Alles Wichtige steht in **`steelsoul-config.js`**:

```js
csvUrl: 'https://docs.google.com/spreadsheets/d/DEINE_SHEET_ID/export?format=csv&gid=DEIN_GID',
refreshIntervalMs: 5000, // wie oft neu geladen wird
```

Sheet-ID und `gid` findest du in der URL, wenn das Tabellenblatt in Google Sheets geöffnet ist:
`https://docs.google.com/spreadsheets/d/SHEET_ID/edit?gid=GID`

Ändern sich Spaltenbuchstaben oder -überschriften, passe `columnAliases`, `bossColumns` bzw. `clipColumns` in derselben Datei an.

## OBS-Overlay einbinden

1. In OBS: Quelle hinzufügen → **Browser**
2. URL: der gehostete Link zu `steelsoul-overlay.html` (z. B. deine GitHub-Pages-URL + `/steelsoul-overlay.html`)
3. Breite ca. 480 px, Höhe ca. 160 px
4. Hintergrund ist bereits transparent, kein Häkchen nötig

## Auf GitHub Pages hosten

1. Repo erstellen, **alle Dateien aus diesem Ordner direkt ins Repo-Root** hochladen (nicht als Unterordner)
2. **Settings → Pages → Source** auf Branch `main`, Ordner `/ (root)` stellen
3. Nach ein paar Minuten erreichbar unter `https://DEIN-NAME.github.io/DEIN-REPO/`

⚠️ GitHub Pages ist öffentlich. Die Steel-Soul-Versuchsdaten sind dann für jeden einsehbar, der die Seite aufruft (das Sheet selbst bleibt nur zum Lesen freigegeben, nicht zum Bearbeiten).

## Projektstruktur

```
index.html                 Steel-Soul-Dashboard (Startseite)
steelsoul-overlay.html     OBS-Browserquelle
steelsoul-config.js        Konfiguration (CSV-Link, Spalten, Refresh-Intervall)
steelsoul-data.js          Fetch/Parse/Stats-Logik
style.css                  Hollow-Knight-Theme
```

---

Kein offizielles Team-Cherry-Projekt – reines Fan-Tool.
