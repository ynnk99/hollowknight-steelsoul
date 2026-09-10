const DATA = {
  storageId: 'hollow-knight',
  maxPercent: 112,
  headerStats: [
    {label:'Bosse besiegt', ref:['bosses']},
    {label:'Traumkämpfe', ref:['warrior-dreams']},
    {label:'Charms gefunden', ref:['charms']},
    {label:'Pantheons (1–5)', ref:['godmaster','bonus-pantheon5']},
  ],
  sections: [
    {
      id:'bosses', icon:'💀', title:'Bosse', sub:'Hauptspiel-Bosse — 14 × 1%',
      items:[
        {id:'b-broken-vessel', name:'Broken Vessel', loc:'Ancient Basin', pct:1},
        {id:'b-brooding-mawlek', name:'Brooding Mawlek', loc:'Forgotten Crossroads', pct:1},
        {id:'b-collector', name:'The Collector', loc:'Resting Grounds', pct:1},
        {id:'b-dung-defender', name:'Dung Defender', loc:'Royal Waterways', pct:1},
        {id:'b-false-knight', name:'False Knight', loc:'Forgotten Crossroads', pct:1},
        {id:'b-gruz-mother', name:'Gruz Mother', loc:'Forgotten Crossroads', pct:1},
        {id:'b-hornet-protector', name:'Hornet (Protector)', loc:'Greenpath', pct:1},
        {id:'b-hornet-sentinel', name:'Hornet (Sentinel)', loc:'Deepnest / City-Kingdom\'s Edge', pct:1},
        {id:'b-mantis-lords', name:'Mantis Lords', loc:'Mantis Village', pct:1},
        {id:'b-nosk', name:'Nosk', loc:'Deepnest', pct:1},
        {id:'b-soul-master', name:'Soul Master', loc:'Soul Sanctum', pct:1},
        {id:'b-traitor-lord', name:'Traitor Lord', loc:'Mantis Village (Deepnest side)', pct:1},
        {id:'b-uumuu', name:'Uumuu', loc:'Royal Waterways', pct:1},
        {id:'b-watcher-knight', name:'Watcher Knight', loc:'Watcher\'s Spire, City of Tears', pct:1},
      ]
    },
    {
      id:'warrior-dreams', icon:'☾', title:'Traumkämpfe (Warrior Dreams)', sub:'Dream Nail — 7 × 1%',
      items:[
        {id:'w-elder-hu', name:'Elder Hu', loc:'Greenpath', pct:1},
        {id:'w-galien', name:'Galien', loc:'Ancient Basin', pct:1},
        {id:'w-gorb', name:'Gorb', loc:'Howling Cliffs', pct:1},
        {id:'w-markoth', name:'Markoth', loc:'Fungal Wastes', pct:1},
        {id:'w-marmu', name:'Marmu', loc:'Kingdom\'s Edge', pct:1},
        {id:'w-no-eyes', name:'No Eyes', loc:'Resting Grounds', pct:1},
        {id:'w-xero', name:'Xero', loc:'Forgotten Crossroads', pct:1},
      ]
    },
    {
      id:'colosseum', icon:'⚔', title:'Kolosseum der Narren', sub:'Trials — 3 × 1%',
      items:[
        {id:'c-warrior', name:'Trial of the Warrior', loc:'Bronze — Kolosseum, Kingdom\'s Edge', pct:1},
        {id:'c-conqueror', name:'Trial of the Conqueror', loc:'Silber — Kolosseum, Kingdom\'s Edge', pct:1},
        {id:'c-fool', name:'Trial of the Fool', loc:'Gold — Kolosseum, Kingdom\'s Edge', pct:1},
      ]
    },
    {
      id:'charms', icon:'✺', title:'Charms', sub:'36 × 1% — größter Einzelposten',
      items:[
        {id:'ch-wayward-compass', name:'Wayward Compass', pct:1},
        {id:'ch-gathering-swarm', name:'Gathering Swarm', pct:1},
        {id:'ch-stalwart-shell', name:'Stalwart Shell', pct:1},
        {id:'ch-soul-catcher', name:'Soul Catcher', pct:1},
        {id:'ch-shaman-stone', name:'Shaman Stone', pct:1},
        {id:'ch-soul-eater', name:'Soul Eater', pct:1},
        {id:'ch-dashmaster', name:'Dashmaster', pct:1},
        {id:'ch-thorns-of-agony', name:'Thorns of Agony', pct:1},
        {id:'ch-fury-of-the-fallen', name:'Fury of the Fallen', pct:1},
        {id:'ch-fragile-heart', name:'Fragile / Unbreakable Heart', pct:1},
        {id:'ch-fragile-greed', name:'Fragile / Unbreakable Greed', pct:1},
        {id:'ch-fragile-strength', name:'Fragile / Unbreakable Strength', pct:1},
        {id:'ch-spell-twister', name:'Spell Twister', pct:1},
        {id:'ch-steady-body', name:'Steady Body', pct:1},
        {id:'ch-heavy-blow', name:'Heavy Blow', pct:1},
        {id:'ch-quick-slash', name:'Quick Slash', pct:1},
        {id:'ch-longnail', name:'Longnail', pct:1},
        {id:'ch-mark-of-pride', name:'Mark of Pride', pct:1},
        {id:'ch-baldur-shell', name:'Baldur Shell', pct:1},
        {id:'ch-flukenest', name:'Flukenest', pct:1},
        {id:'ch-defenders-crest', name:'Defender\'s Crest', pct:1},
        {id:'ch-glowing-womb', name:'Glowing Womb', pct:1},
        {id:'ch-quick-focus', name:'Quick Focus', pct:1},
        {id:'ch-deep-focus', name:'Deep Focus', pct:1},
        {id:'ch-lifeblood-heart', name:'Lifeblood Heart', pct:1},
        {id:'ch-lifeblood-core', name:'Lifeblood Core', pct:1},
        {id:'ch-jonis-blessing', name:'Joni\'s Blessing', pct:1},
        {id:'ch-grubsong', name:'Grubsong', pct:1},
        {id:'ch-grubberflys-elegy', name:'Grubberfly\'s Elegy', pct:1},
        {id:'ch-hiveblood', name:'Hiveblood', pct:1},
        {id:'ch-spore-shroom', name:'Spore Shroom', pct:1},
        {id:'ch-sharp-shadow', name:'Sharp Shadow', pct:1},
        {id:'ch-shape-of-unn', name:'Shape of Unn', pct:1},
        {id:'ch-nailmasters-glory', name:'Nailmaster\'s Glory', pct:1},
        {id:'ch-dream-wielder', name:'Dream Wielder', pct:1},
        {id:'ch-kingsoul', name:'Kingsoul / Void Heart', pct:1},
      ]
    },
    {
      id:'equipment', icon:'⛨', title:'Ausrüstung', sub:'7 Traversal-Items × 2%',
      items:[
        {id:'e-crystal-heart', name:'Crystal Heart', pct:2},
        {id:'e-ismas-tear', name:'Isma\'s Tear', pct:2},
        {id:'e-kings-brand', name:'King\'s Brand', pct:2},
        {id:'e-mantis-claw', name:'Mantis Claw', pct:2},
        {id:'e-monarch-wings', name:'Monarch Wings', pct:2},
        {id:'e-mothwing-cloak', name:'Mothwing Cloak', pct:2},
        {id:'e-shade-cloak', name:'Shade Cloak', pct:2},
      ]
    },
    {
      id:'spells', icon:'✦', title:'Zauber', sub:'6 × 1%',
      items:[
        {id:'sp-desolate-dive', name:'Desolate Dive', pct:1},
        {id:'sp-descending-dark', name:'Descending Dark', pct:1},
        {id:'sp-howling-wraiths', name:'Howling Wraiths', pct:1},
        {id:'sp-abyss-shriek', name:'Abyss Shriek', pct:1},
        {id:'sp-vengeful-spirit', name:'Vengeful Spirit', pct:1},
        {id:'sp-shade-soul', name:'Shade Soul', pct:1},
      ]
    },
    {
      id:'nail-arts', icon:'⚔', title:'Nagelkünste', sub:'3 × 1%',
      items:[
        {id:'na-cyclone-slash', name:'Cyclone Slash', loc:'Nailmaster Mato', pct:1},
        {id:'na-dash-slash', name:'Dash Slash', loc:'Nailmaster Oro (800 Geo)', pct:1},
        {id:'na-great-slash', name:'Great Slash', loc:'Nailmaster Sheo', pct:1},
      ]
    },
    {
      id:'mask-shards', icon:'♢', title:'Maskensplitter', sub:'4 Upgrades × 1%',
      items:[
        {id:'ms-1', name:'Masken-Upgrade 1', pct:1},
        {id:'ms-2', name:'Masken-Upgrade 2', pct:1},
        {id:'ms-3', name:'Masken-Upgrade 3', pct:1},
        {id:'ms-4', name:'Masken-Upgrade 4', pct:1},
      ]
    },
    {
      id:'vessel-fragments', icon:'●', title:'Gefäßfragmente', sub:'3 Upgrades × 1%',
      items:[
        {id:'vf-1', name:'Gefäß-Upgrade 1', pct:1},
        {id:'vf-2', name:'Gefäß-Upgrade 2', pct:1},
        {id:'vf-3', name:'Gefäß-Upgrade 3', pct:1},
      ]
    },
    {
      id:'nail-upgrades', icon:'↑', title:'Nagel-Upgrades', sub:'4 × 1%',
      items:[
        {id:'nu-sharpened', name:'Sharpened Nail', pct:1},
        {id:'nu-channelled', name:'Channelled Nail', pct:1},
        {id:'nu-coiled', name:'Coiled Nail', pct:1},
        {id:'nu-pure', name:'Pure Nail', pct:1},
      ]
    },
    {
      id:'dream-nail', icon:'☽', title:'Traumnagel & Essenz', sub:'3 × 1%',
      items:[
        {id:'dn-acquired', name:'Traumnagel erhalten', pct:1},
        {id:'dn-awakened', name:'Erwachen des Traumnagels', loc:'1800 Essenz', pct:1},
        {id:'dn-seer', name:'Die Seherin — letzte Worte', loc:'2400 Essenz', pct:1},
      ]
    },
    {
      id:'dreamers', icon:'♛', title:'Träumer', sub:'3 × 1%',
      items:[
        {id:'dr-herrah', name:'Herrah the Beast', pct:1},
        {id:'dr-lurien', name:'Lurien the Watcher', pct:1},
        {id:'dr-monomon', name:'Monomon the Teacher', pct:1},
      ]
    },
    {
      id:'grimm-troupe', icon:'🕯', title:'The Grimm Troupe', sub:'DLC — 6 × 1%',
      items:[
        {id:'gt-dreamshield', name:'Dreamshield', pct:1},
        {id:'gt-grimmchild', name:'Grimmchild / Carefree Melody', pct:1},
        {id:'gt-sprintmaster', name:'Sprintmaster', pct:1},
        {id:'gt-weaversong', name:'Weaversong', pct:1},
        {id:'gt-troupe-master-grimm', name:'Troupe Master Grimm', pct:1},
        {id:'gt-nightmare-king-grimm', name:'Nightmare King Grimm / Banishment', pct:1},
      ]
    },
    {
      id:'lifeblood', icon:'♥', title:'Lifeblood', sub:'DLC — 1 × 1%',
      items:[
        {id:'lb-hive-knight', name:'Hive Knight', loc:'Hive', pct:1},
      ]
    },
    {
      id:'godmaster', icon:'⛩', title:'Godmaster — Pantheon 1–4', sub:'DLC — 5 × 1% (nur Pantheon 1–4 zählen)',
      note:'Nur Godtuner + Pantheon of the Master/Artist/Sage/Knight zählen zur 112%. Pantheon of Hallownest (P5) siehe Bonus-Bereich unten.',
      items:[
        {id:'gm-godtuner', name:'Godtuner', loc:'Godhome betreten', pct:1},
        {id:'gm-p1', name:'Pantheon of the Master (P1)', pct:1},
        {id:'gm-p2', name:'Pantheon of the Artist (P2)', pct:1},
        {id:'gm-p3', name:'Pantheon of the Sage (P3)', pct:1},
        {id:'gm-p4', name:'Pantheon of the Knight (P4)', pct:1},
      ]
    },
  ],
  bonusSections: [
    {
      id:'bonus-pantheon5', icon:'👑', title:'Pantheon of Hallownest (P5)', sub:'Bonus — zählt nicht zur %',
      note:'Der finale Pantheon (Absolute Radiance) gibt keinen Prozentpunkt, ist aber die härteste Herausforderung des Spiels.',
      items:[
        {id:'p5-complete', name:'Pantheon of Hallownest abgeschlossen', tag:'Bonus'},
      ]
    },
    {
      id:'bonus-pop', icon:'☠', title:'Path of Pain', sub:'Bonus — zählt nicht zur %',
      note:'Ancestral Mound → geheimer Präzisions-Parkour. Voraussetzung für die "Nightmare"-Errungenschaft und den Pale Lurker.',
      items:[
        {id:'pop-entrance', name:'Eingang zum Path of Pain gefunden', tag:'Bonus'},
        {id:'pop-complete', name:'Path of Pain abgeschlossen', tag:'Bonus'},
        {id:'pop-pale-lurker', name:'Pale Lurker besiegt', tag:'Bonus'},
      ]
    },
    {
      id:'bonus-extra', icon:'✧', title:'Weitere Herausforderungen', sub:'Bonus — zählt nicht zur %',
      items:[
        {id:'bx-grey-prince-zote', name:'Grey Prince Zote', loc:'White Palace / Godhome', tag:'Bonus'},
        {id:'bx-absolute-radiance', name:'Absolute Radiance (freier Kampf)', loc:'White Palace', tag:'Bonus'},
        {id:'bx-radiant-p5', name:'Pantheon of Hallownest — Radiant', tag:'Steel/Radiant'},
        {id:'bx-godhome-radiant', name:'Alle Pantheons im Radiant-Modus', tag:'Steel/Radiant'},
        {id:'bx-steel-soul', name:'Steel Soul Durchgang (112%)', tag:'Bonus'},
        {id:'bx-speedrun', name:'Speedrun-Ziel unter 20h (100%)', tag:'Bonus'},
      ]
    },
  ]
};
