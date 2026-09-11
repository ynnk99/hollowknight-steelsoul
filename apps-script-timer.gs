// ═══════════════════════════════════════════════════════════════════════════
//  Timer-Trigger für den Pantheon-5-Overlay-Timer
//
//  INSTALLATION:
//  1. In Google Sheets: Erweiterungen → Apps Script
//  2. Diesen kompletten Code in den Editor einfügen (vorhandenen Code ersetzen)
//  3. Speichern (Diskette-Symbol)
//  4. Einmal die Funktion "onEdit" oben in der Toolbar auswählen und auf
//     "Ausführen" klicken → Google fragt nach Berechtigungen, die musst du
//     einmalig bestätigen (Zugriff auf dieses eine Spreadsheet).
//  5. Fertig – ab jetzt reagiert das Sheet automatisch auf X1/X2.
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
    const newElapsed = Number(e.range.getValue());
    if (isNaN(newElapsed) || newElapsed < 0) return;
    const isRunning = Number(sheet.getRange("Y1").getValue()) > 0;
    if (isRunning) {
      sheet.getRange("Y1").setValue(Date.now());
    }
  }
}

function onEdit(e) {
  onEditTimer(e);
}
