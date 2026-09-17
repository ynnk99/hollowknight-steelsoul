// ── Fliegende 7TV-Emotes im Hintergrund ──────────────────────────────
// Trag unten bei "urls" einfach die direkten Bild-Links deiner Emotes ein.
//
// So kommst du an den Link:
//   1. Emote auf https://7tv.app suchen und öffnen
//   2. Unter "Download" die gewünschte Größe wählen (z.B. "4x") und den
//      Link kopieren — oder per Rechtsklick auf das Vorschaubild
//      "Grafikadresse kopieren" wählen
//   3. Link hier in die Liste einfügen, z.B.:
//      'https://cdn.7tv.app/emote/01ABCDEFGH.../4x.webp'
//   Animierte Emotes (.gif / animiertes .webp) funktionieren genauso wie
//   statische — der Browser spielt die Animation automatisch ab.
//
const EMOTE_BG_CONFIG = {
  enabled: true,          // auf false setzen, um den Hintergrund komplett auszuschalten

  urls: [
    'https://cdn.7tv.app/emote/01GG9FMWJG0007XWEWCPW86EJS/2x.webp',
    'https://cdn.7tv.app/emote/01J12HSHG00002X9JFJVAGB0AP/2x.webp',
    'https://cdn.7tv.app/emote/01H6TWWXEG000BP02CTH758V6M/2x.webp',
    'https://cdn.7tv.app/emote/01J4TB33B80004SVBK6PNC3FN8/2x.webp',
    'https://cdn.7tv.app/emote/01H0RA17W8000AHHWDRHKKDB47/2x.webp',
    'https://cdn.7tv.app/emote/01H6TWWXEG000BP02CTH758V6M/2x.webp',
    'https://cdn.7tv.app/emote/01H6YM1T4R000DNK3M5M1F7Q6Y/2x.webp',
    'https://cdn.7tv.app/emote/01J12HSHG00002X9JFJVAGB0AP/2x.webp',
    'https://cdn.7tv.app/emote/01JT6BRNXNMNNME48GTHG1WJ21/2x.webp',
  ],

  count: 16,               // wie viele Emote-Sprites gleichzeitig fliegen
                            // (bei weniger URLs als "count" werden Emotes wiederholt)
  minSize: 40,              // kleinste Kantenlänge in px
  maxSize: 88,              // größte Kantenlänge in px
  minSpeed: 16,             // langsamste Geschwindigkeit in px/Sekunde
  maxSpeed: 46,             // schnellste Geschwindigkeit in px/Sekunde
  opacity: 0.30,            // Deckkraft, damit der Text weiter gut lesbar bleibt
};

(function () {
  if (!EMOTE_BG_CONFIG.enabled || !EMOTE_BG_CONFIG.urls.length) return;

  const container = document.getElementById('emote-bg');
  if (!container) return;

  const reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const rand = (min, max) => Math.random() * (max - min) + min;
  const pickUrl = (i) => EMOTE_BG_CONFIG.urls[i % EMOTE_BG_CONFIG.urls.length];

  const total = Math.max(EMOTE_BG_CONFIG.count, EMOTE_BG_CONFIG.urls.length);
  const sprites = [];

  for (let i = 0; i < total; i++) {
    const img = document.createElement('img');
    img.src = pickUrl(i);
    img.alt = '';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.className = 'emote-sprite';

    const size = rand(EMOTE_BG_CONFIG.minSize, EMOTE_BG_CONFIG.maxSize);
    img.style.width = size + 'px';
    img.style.opacity = EMOTE_BG_CONFIG.opacity;
    container.appendChild(img);

    const angle = rand(0, Math.PI * 2);
    const speed = rand(EMOTE_BG_CONFIG.minSpeed, EMOTE_BG_CONFIG.maxSpeed);

    sprites.push({
      el: img,
      size,
      x: rand(0, Math.max(window.innerWidth - size, 0)),
      y: rand(0, Math.max(window.innerHeight - size, 0)),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
    });
  }

  // Wer "reduzierte Bewegung" im System eingestellt hat, bekommt die
  // Emotes ruhig stehend statt fliegend angezeigt.
  if (reduceMotion) {
    sprites.forEach(s => {
      s.el.style.transform = `translate(${s.x}px, ${s.y}px)`;
    });
    return;
  }

  let last = performance.now();
  function tick(now) {
    const dt = Math.min((now - last) / 1000, 0.05); // Zeitdifferenz in Sekunden, gedeckelt
    last = now;
    const w = window.innerWidth;
    const h = window.innerHeight;

    sprites.forEach(s => {
      s.x += s.vx * dt;
      s.y += s.vy * dt;

      if (s.x <= 0) { s.x = 0; s.vx = Math.abs(s.vx); }
      if (s.x + s.size >= w) { s.x = w - s.size; s.vx = -Math.abs(s.vx); }
      if (s.y <= 0) { s.y = 0; s.vy = Math.abs(s.vy); }
      if (s.y + s.size >= h) { s.y = h - s.size; s.vy = -Math.abs(s.vy); }

      s.el.style.transform = `translate(${s.x}px, ${s.y}px)`;
    });

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
