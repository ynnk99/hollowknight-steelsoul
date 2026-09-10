# Hollow Knight Tracker

Fanprojekt-Sammlung von drei Trackern im Hollow-Knight-Look:

- **`hollow-knight.html`** – 112%-Completion-Tracker (Bosse, Charms, Kolosseum, Godmaster Pantheon 1–4, Path of Pain als Bonus)
- **`silksong.html`** – 100%-Completion-Tracker + alle 48 Bosse aus Akt 1–3
- **`steelsoul-landing.html`** + **`steelsoul-overlay.html`** – No-Death-Run-Tracker, live verbunden mit einem Google Sheet

`index.html` ist die Startseite mit Links zu allen dreien.

## Live-Demo lokal testen

Kein Build-Schritt nötig – einfach `index.html` im Browser öffnen, oder einen kleinen lokalen Server starten:

```bash
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```

## Steel Soul Tracker einrichten

Der Steel-Soul-Tracker liest live aus einem Google Sheet (Tabellenblatt „Steelsoul"). Erwartetes Layout:

| Spalte | Inhalt |
|---|---|
| A | Versuch (Nummer) |
| B | Status-Emoji: ⏳ läuft gerade · ✅ geschafft · ❌ gescheitert |
| C | Gescheitert an (nur bei ❌) |
| G:H | Clip-Bereich – G = Versuch-Referenz, H = Kategorie/Titel (Zeile 1 = Überschrift, wird ignoriert) |
| J:K | Bosse-Bereich – J = Versuch-Referenz, K = Bossname (Zeile 1 = Überschrift, wird ignoriert). Mehrere Zeilen pro Versuch möglich. |

**Voraussetzung:** Das Sheet muss auf „Jeder mit dem Link kann ansehen" stehen (Freigeben-Button oben rechts in Google Sheets).

Konfiguriert wird alles in **`steelsoul-config.js`**:

```js
csvUrl: 'https://docs.google.com/spreadsheets/d/DEINE_SHEET_ID/export?format=csv&gid=DEIN_GID',
refreshIntervalMs: 5000, // wie oft neu geladen wird
```

Die Sheet-ID und die `gid` (Tabellenblatt-ID) findest du in der URL, wenn du das Blatt in Google Sheets geöffnet hast:
`https://docs.google.com/spreadsheets/d/SHEET_ID/edit?gid=GID`

Falls sich deine Spaltenüberschriften ändern, passe `columnAliases` in derselben Datei an.

## OBS-Overlay einbinden

1. In OBS: Quelle hinzufügen → **Browser**
2. URL: der gehostete Link zu `steelsoul-overlay.html` (z. B. deine GitHub-Pages-URL)
3. Breite ca. 480px, Höhe ca. 160px
4. Hintergrund ist bereits transparent, kein Häkchen nötig

## Auf GitHub Pages hosten

1. Repo auf GitHub erstellen und den Inhalt dieses Ordners pushen:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/DEIN-NAME/DEIN-REPO.git
   git push -u origin main
   ```
2. Im Repo: **Settings → Pages → Source** auf `main` / `/ (root)` stellen
3. Nach ein paar Minuten ist die Seite unter `https://DEIN-NAME.github.io/DEIN-REPO/` erreichbar

⚠️ **Hinweis:** GitHub Pages ist öffentlich. Da der Steel-Soul-Tracker Daten aus deinem Google Sheet nachlädt, sollte dir bewusst sein, dass diese Versuchsdaten dann öffentlich einsehbar sind (nicht aber das Sheet selbst zum Bearbeiten – nur zum Lesen).

## Projektstruktur

```
index.html                 Startseite mit Links zu allen Trackern
style.css                  gemeinsames Hollow-Knight-Theme (CSS-Variablen für beide Farbschemata)
app.js                     Rendering-Logik für die Completion-Tracker (HK & Silksong)
data-hk.js                 112%-Datensatz Hollow Knight
data-ss.js                 100%-Datensatz Silksong
hollow-knight.html         Completion-Tracker Hollow Knight
silksong.html              Completion-Tracker Silksong
steelsoul-config.js        Konfiguration (CSV-Link, Spalten, Refresh-Intervall)
steelsoul-data.js          Fetch/Parse/Stats-Logik für den Steel-Soul-Tracker
steelsoul-landing.html     Öffentliches Steel-Soul-Dashboard
steelsoul-overlay.html     OBS-Browserquelle
```

Fortschritt der Completion-Tracker wird im Browser (`localStorage`) gespeichert, nicht in der Cloud – jede Person, die die Seite öffnet, hat ihren eigenen Stand.

---

Kein offizielles Team-Cherry-Projekt – reines Fan-Tool.
