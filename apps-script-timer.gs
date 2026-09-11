// ═══════════════════════════════════════════════════════════════════════════
//  Timer-Trigger für den Pantheon-5-Overlay-Timer
//
//  WICHTIG: Diese Datei definiert bewusst KEINE Funktion namens "onEdit"!
//  Falls du in diesem Apps-Script-Projekt bereits eine eigene onEdit(e)-
//  Funktion hast (z.B. für automatische j/n/l → ✅/❌/⏳-Kürzel), würde eine
//  zweite Funktion mit demselben Namen die erste stillschweigend überschreiben
//  – nur eine von beiden würde noch laufen. Deswegen läuft der Timer hier
//  über einen separaten INSTALLIERTEN Trigger auf "onEditTimer", der
//  unabhängig neben deinem bestehenden onEdit herläuft.
//
//  INSTALLATION:
//  1. In Google Sheets: Erweiterungen → Apps Script
//  2. Falls du schon eine eigene .gs-Datei mit onEdit(e) hast: NICHT
//     überschreiben. Stattdessen oben links auf das "+" neben "Dateien"
//     klicken → "Skript" → z.B. "timer" nennen, und NUR diesen Code hier
//     in die NEUE Datei einfügen.
//  3. Speichern (Diskette-Symbol)
//  4. Links im Menü auf das Uhr-Symbol ("Trigger") klicken
//  5. Unten rechts "+ Trigger hinzufügen"
//  6. Einstellungen:
//     - Auszuführende Funktion: onEditTimer
//     - Ereignisquelle: Aus Tabelle
//     - Ereignistyp: Bei Bearbeitung
//     → Speichern, dann die Berechtigungsanfrage bestätigen
//  7. Fertig – ab jetzt reagiert das Sheet automatisch auf X1/X2, und dein
//     bestehender onEdit-Code läuft unverändert weiter.
//
//  ZELLEN (Tabellenblatt "Pantheons"):
//  X1 = Checkbox Start/Pause  (klickst du im Sheet an)
//  X2 = Checkbox Reset        (klickst du im Sheet an, setzt sich selbst zurück)
//  Y1 = Zeitstempel (ms) seit Start, wird vom Script geschrieben, 0 = pausiert
//  Y2 = bereits angesammelte Zeit (ms), wird vom Script geschrieben –
//       kannst du auch manuell überschreiben, der Timer läuft dann ab dort weiter
//
//  Warum das Ganze? X1/Y1/Y2 speichern einen ECHTEN Zeitstempel im Sheet.
//  Das Overlay im Browser rechnet dann nur noch "jetzt − Startzeitpunkt" statt
//  selbst mitzuzählen – dadurch übersteht der Timer jeden Reload der
//  Overlay-Seite (z.B. wenn OBS die Browserquelle neu lädt) ohne Datenverlust.
// ═══════════════════════════════════════════════════════════════════════════

function onEditTimer(e) {
  const sheet = e.source.getActiveSheet();
  if (sheet.getName() !== "Pantheons") return;

  const row = e.range.getRow();
  const col = e.range.getColumn();
  const val = e.value === true || e.value === "TRUE" || e.value === "WAHR";

  // X1 (Spalte 24, Zeile 1): Timer starten / pausieren
  if (row === 1 && col === 24) {
    // WICHTIG: reines Zahlenformat erzwingen (kein Tausenderpunkt/-komma),
    // sonst exportiert Google Sheets je nach Spracheinstellung z.B.
    // "1.757.568.091.234" statt "1757568091234" ins CSV, und das Overlay
    // kann den Zeitstempel dann nicht mehr als Zahl einlesen (→ Timer 0).
    sheet.getRange("Y1:Y2").setNumberFormat("0");

    if (val) {
      sheet.getRange("Y1").setValue(Date.now());
    } else {
      const startTs = Number(sheet.getRange("Y1").getValue()) || 0;
      const offset  = Number(sheet.getRange("Y2").getValue()) || 0;
      const elapsed = startTs > 0 ? offset + (Date.now() - startTs) : offset;
      sheet.getRange("Y2").setValue(elapsed);
      sheet.getRange("Y1").setValue(0);
    }
    return;
  }

  // X2 (Spalte 24, Zeile 2): Timer resetten – Checkbox setzt sich danach
  // automatisch wieder zurück, damit es ein einmaliger "Klick-Effekt" ist.
  if (row === 2 && col === 24 && val) {
    sheet.getRange("Y1:Y2").setNumberFormat("0");
    const x1Running = sheet.getRange("X1").getValue();
    const isRunning = x1Running === true || x1Running === "TRUE" || x1Running === "WAHR";
    sheet.getRange("Y2").setValue(0);
    sheet.getRange("X2").setValue(false);
    sheet.getRange("Y1").setValue(isRunning ? Date.now() : 0);
    return;
  }

  // Y2 (Spalte 25, Zeile 2): Elapsed manuell überschreiben → falls der Timer
  // gerade läuft, wird der Startzeitpunkt so nachgezogen, dass er ab dem neu
  // eingetragenen Wert weiterläuft (statt bei 0 neu zu starten).
  if (row === 2 && col === 25) {
    sheet.getRange("Y1:Y2").setNumberFormat("0");
    const newElapsed = Number(e.range.getValue());
    if (isNaN(newElapsed) || newElapsed < 0) return;
    const isRunning = Number(sheet.getRange("Y1").getValue()) > 0;
    if (isRunning) {
      sheet.getRange("Y1").setValue(Date.now());
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  checkPantheonCompletion – Zeit-Snapshot beim Abschluss eines Versuchs
//
//  WICHTIG: Diese Funktion wird NICHT automatisch aufgerufen! Falls du schon
//  ein eigenes onEdit(e) hast (z.B. für j/n/l → ✅/❌/⏳-Kürzel in Spalte S),
//  muss DEIN Skript diese Funktion am Ende aufrufen – und zwar NACHDEM es
//  "j" in "✅" umgewandelt hat. Sonst sieht diese Funktion noch den alten
//  Wert ("j" statt "✅") und der Snapshot bleibt aus.
//
//  In deinem bestehenden onEdit(e), ganz am Ende der Funktion (nach der
//  if/else-Kette mit range.setValue("✅")/("❌")/("⏳")), diese eine Zeile
//  ergänzen:
//
//      checkPantheonCompletion(e);
//
//  Was es macht: Sobald Spalte S (Geschafft?) im Tabellenblatt "Pantheons"
//  auf ✅ steht, wird der aktuelle Timer-Stand (Y1/Y2) berechnet und in
//  Spalte U der GLEICHEN Zeile gespeichert. Diese Zeit bleibt danach fest an
//  diesen Versuch gebunden, auch wenn der Timer später weiterläuft oder
//  zurückgesetzt wird.
// ═══════════════════════════════════════════════════════════════════════════

function checkPantheonCompletion(e) {
  const sheet = e.range.getSheet();
  if (sheet.getName() !== "Pantheons") return;

  const row = e.range.getRow();
  const col = e.range.getColumn();
  if (col !== 19 || row < 2) return; // nur Spalte S (Geschafft?), keine Kopfzeile

  const currentValue = String(sheet.getRange(row, 19).getValue() || "");
  if (currentValue.indexOf("✅") === -1) return; // kein Clear in dieser Zeile

  const startTs = Number(sheet.getRange("Y1").getValue()) || 0;
  const offset  = Number(sheet.getRange("Y2").getValue()) || 0;
  const elapsed = startTs > 0 ? offset + (Date.now() - startTs) : offset;

  sheet.getRange(row, 21).setNumberFormat("0").setValue(elapsed); // Spalte U
}
