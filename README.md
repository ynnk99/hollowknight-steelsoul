# Steel Soul Tracker – Hollow Knight

Fan-Dashboard für No-Death-Läufe (Steel Soul) in Hollow Knight, live verbunden mit einem Google Sheet.

- **`index.html`** – öffentliches Dashboard: aktueller Versuch, Statistiken, Todesursachen, Liste aller Runs mit Bossen & Clips, inkl. Impressum/Datenschutz-Links im Footer
- **`overlay.html`** – schlankes, transparentes Overlay für OBS als Browserquelle

Alle Schriftarten (Cinzel, Cardo) und die PapaParse-Bibliothek sind **lokal im Projekt enthalten** (`fonts/`, `vendor/`) – es werden keine Google-Fonts- oder CDN-Anfragen mehr an Dritte gestellt.

**Zur Schriftwahl:** Das Original-UI von Hollow Knight nutzt Trajan Pro (Überschriften) und Perpetua (Fließtext) – beides kommerzielle, lizenzpflichtige Schriften (Adobe bzw. Monotype), die hier nicht ohne gültige Lizenz eingebettet werden dürfen. Stattdessen kommen **Cinzel** (eine freie, an Trajan/römische Inschriften angelehnte Schrift) und **Cardo** (eine freie Schrift mit demselben steinmetzartigen, kalligrafischen Charakter wie Perpetua) zum Einsatz – optisch sehr nah dran, aber ohne Lizenzrisiko. Wer eine Adobe-Fonts-Lizenz besitzt, kann die echten Schriften über einen Adobe-Fonts-Web-Kit-Link nachrüsten.

## ⚠️ Vor dem Hochladen: Impressum ausfüllen

In `index.html` gibt es zwei Platzhalter, die du ersetzen musst (Suche nach `[DEIN NAME]` und `deine@email.de`):

```html
[DEIN NAME]
...
<a href="mailto:deine@email.de">deine@email.de</a>
```

Diese Angaben tauchen im Impressum- und im Datenschutz-Modal auf (verlinkt im Footer der Seite).

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

Zeilen ohne gesetzten Status in Spalte B (z. B. vorbereitete Versuchsnummern für die Dropdowns) werden automatisch ignoriert. Der **aktuelle Versuch** ist immer die Zeile mit dem ⏳-Emoji.

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

## Overlay Config & Pantheon 5

Das Overlay (`overlay.html`) kann jetzt zwei Ansichten zeigen, gesteuert über Checkboxen in Google Sheets — ohne die OBS-Quelle anzufassen:

**Tabellenblatt „Overlay Config"** (Zellen A1/A2, Checkboxen):
- `A1` angehakt → zeigt das **Pantheon-5-Overlay**
- `A2` angehakt → zeigt das **Steel-Soul-Overlay**
- Ist A1 angehakt, hat es Vorrang vor A2.
- Sind beide leer, bleibt das Overlay unsichtbar.

**Tabellenblatt „Pantheons"**, Bereich `Q1:T51` (P5-Versuche):
- `R` = Versuch-Nummer, `S` = Geschafft? (✅/❌, leer = noch nicht gelaufen), `T` = Gescheitert an (Bossname) bzw. `-` bei ✅
- Der **aktuelle Versuch** ist automatisch die oberste Zeile mit leerem `S`.
- Der **PB** wird ermittelt, indem der Bossname aus `T` (bei allen ❌-Versuchen) mit der Reihenfolge in `V1:W42` abgeglichen wird — angezeigt wird der Boss, der am weitesten unten in dieser Liste steht (= am weitesten gekommen). Ein ✅ (vollständiger Clear) übertrumpft automatisch jeden Boss-Treffer und zeigt „Vollständig geschafft".
- `X1` (Checkbox) = Timer Start/Stop, `X2` (Checkbox) = Timer-Reset (hält den Timer bei 0, solange angehakt; beim Entfernen des Hakens läuft er weiter/normal je nach X1).

Der Timer läuft komplett im Browser (tickt jede Sekunde) und wird nur durch den Zustand von X1/X2 gesteuert, die alle `controlPollIntervalMs` (Standard 2 Sekunden) abgefragt werden.

Beide Sheet-Links stehen in `steelsoul-config.js` unter `overlayConfigCsvUrl` und `pantheonCsvUrl`.

## OBS-Overlay einbinden

1. In OBS: Quelle hinzufügen → **Browser**
2. URL: der gehostete Link zu `overlay.html` (z. B. deine GitHub-Pages-URL + `/overlay.html`)
3. Breite ca. 560 px, Höhe ca. 200 px
4. Hintergrund ist bereits transparent, kein Häkchen nötig

## Auf GitHub Pages hosten

1. Repo erstellen, **alle Dateien und Ordner aus diesem Projekt direkt ins Repo-Root** hochladen (inkl. `fonts/`, `vendor/`, `emblem.png` — nicht als Unterordner)
2. **Settings → Pages → Source** auf Branch `main`, Ordner `/ (root)` stellen
3. Nach ein paar Minuten erreichbar unter `https://DEIN-NAME.github.io/DEIN-REPO/`

## Rechtliches (Impressum & Datenschutz)

Die Seite enthält jetzt ein Impressum- und ein Datenschutz-Modal (Footer-Links auf `index.html`). Kurzfassung, warum:

- **Cookie-Banner:** nicht nötig – die Seite setzt keine Cookies und nutzt kein `localStorage`.
- **Datenschutzerklärung:** trotzdem sinnvoll, weil beim Laden der Seite technisch IP-Adressen anfallen (GitHub-Hosting-Logs, Live-Abruf aus Google Sheets). Das ist im Modal erklärt, Rechtsgrundlage ist berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO) – keine Einwilligung nötig, da technisch für die Kernfunktion erforderlich.
- **Impressum:** Da die Seite öffentlich (z. B. über Twitch) erreichbar ist, greift meist die vereinfachte Impressumspflicht nach § 18 Abs. 1 MStV, auch ohne Monetarisierung.

Das ist keine Rechtsberatung – bei Unsicherheit lohnt sich ein kurzer Check bei einem Anwalt oder Dienst wie eRecht24.

## Projektstruktur

```
index.html                 Steel-Soul-Dashboard (Startseite), inkl. Impressum/Datenschutz-Modals
overlay.html               OBS-Browserquelle (Steel Soul + Pantheon 5, umschaltbar)
steelsoul-config.js        Konfiguration (CSV-Links, Spalten, Zellen, Refresh-Intervalle)
steelsoul-data.js          Fetch/Parse/Stats-Logik für Steel Soul
pantheon-data.js           Fetch/Parse-Logik für Overlay-Umschaltung, Pantheon 5 & Timer
style.css                  Hollow-Knight-Theme
emblem.png                 Icon im Seitenkopf
fonts/                     selbst gehostete Cinzel- & Cardo-Schriftdateien
vendor/                    selbst gehostetes PapaParse (CSV-Parser)
```

---

Kein offizielles Team-Cherry-Projekt – reines Fan-Tool.
