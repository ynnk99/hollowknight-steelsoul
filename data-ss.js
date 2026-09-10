const DATA = {
  storageId: 'silksong',
  maxPercent: 100,
  headerStats: [
    {label:'Bosse besiegt', ref:['bosses-act1','bosses-act2','bosses-act3']},
    {label:'Werkzeuge', ref:['tools']},
    {label:'Fadenkünste', ref:['silk-skills']},
    {label:'Wappen (Crests)', ref:['crests']},
  ],
  sections: [
    {
      id:'tools', icon:'🗲', title:'Werkzeuge (Tools)', sub:'Rot, Blau & Gelb — 51 × 1%',
      groups:[
        {label:'Rote Werkzeuge (Angriff)', items:[
          {id:'t-straight-pin', name:'Straight Pin', pct:1},
          {id:'t-threefold-pin', name:'Threefold Pin', pct:1},
          {id:'t-sting-shard', name:'Sting Shard', pct:1},
          {id:'t-tacks', name:'Tacks', pct:1},
          {id:'t-longpin', name:'Longpin', pct:1},
          {id:'t-curveclaw', name:'Curveclaw / Curvesickle', pct:1},
          {id:'t-throwing-ring', name:'Throwing Ring', pct:1},
          {id:'t-pimpillo', name:'Pimpillo', pct:1},
          {id:'t-conchcutter', name:'Conchcutter', pct:1},
          {id:'t-silkshot', name:'Silkshot', pct:1},
          {id:'t-delvers-drill', name:'Delver\'s Drill', pct:1},
          {id:'t-cogwork-wheel', name:'Cogwork Wheel', pct:1},
          {id:'t-cogfly', name:'Cogfly', pct:1},
          {id:'t-rosary-cannon', name:'Rosary Cannon', pct:1},
          {id:'t-voltvessels', name:'Voltvessels', pct:1},
          {id:'t-flintslate', name:'Flintslate', pct:1},
          {id:'t-flea-brew', name:'Flea Brew', pct:1},
          {id:'t-plasmium-phial', name:'Plasmium Phial', pct:1},
        ]},
        {label:'Blaue Werkzeuge (Support)', items:[
          {id:'t-druids-eye', name:'Druid\'s Eye / Eyes', pct:1},
          {id:'t-magma-bell', name:'Magma Bell', pct:1},
          {id:'t-warding-bell', name:'Warding Bell', pct:1},
          {id:'t-pollip-pouch', name:'Pollip Pouch', pct:1},
          {id:'t-fractured-mask', name:'Fractured Mask', pct:1},
          {id:'t-multibinder', name:'Multibinder', pct:1},
          {id:'t-weavelight', name:'Weavelight', pct:1},
          {id:'t-sawtooth-circlet', name:'Sawtooth Circlet', pct:1},
          {id:'t-injector-band', name:'Injector Band', pct:1},
          {id:'t-spool-extender', name:'Spool Extender', pct:1},
          {id:'t-reserve-bind', name:'Reserve Bind', pct:1},
          {id:'t-claw-mirror', name:'Claw Mirror / Mirrors', pct:1},
          {id:'t-memory-crystal', name:'Memory Crystal', pct:1},
          {id:'t-snitch-pick', name:'Snitch Pick', pct:1},
          {id:'t-volt-filament', name:'Volt Filament', pct:1},
          {id:'t-quick-sling', name:'Quick Sling', pct:1},
          {id:'t-wreath-of-purity', name:'Wreath of Purity', pct:1},
          {id:'t-longclaw', name:'Longclaw', pct:1},
          {id:'t-wispfire-lantern', name:'Wispfire Lantern', pct:1},
          {id:'t-egg-of-flealia', name:'Egg of Flealia', pct:1},
          {id:'t-pin-badge', name:'Pin Badge', pct:1},
        ]},
        {label:'Gelbe Werkzeuge (Utility)', items:[
          {id:'t-compass', name:'Compass', pct:1},
          {id:'t-shard-pendant', name:'Shard Pendant', pct:1},
          {id:'t-magnetite-brooch', name:'Magnetite Brooch', pct:1},
          {id:'t-weighted-belt', name:'Weighted Belt', pct:1},
          {id:'t-barbed-bracelet', name:'Barbed Bracelet', pct:1},
          {id:'t-dead-bugs-purse', name:'Dead Bug\'s Purse / Shell Satchel', pct:1},
          {id:'t-magnetite-dice', name:'Magnetite Dice', pct:1},
          {id:'t-scuttlebrace', name:'Scuttlebrace', pct:1},
          {id:'t-ascendants-grip', name:'Ascendant\'s Grip', pct:1},
          {id:'t-spider-strings', name:'Spider Strings', pct:1},
          {id:'t-silkspeed-anklets', name:'Silkspeed Anklets', pct:1},
          {id:'t-thiefs-mark', name:'Thief\'s Mark', pct:1},
        ]},
      ]
    },
    {
      id:'silk-skills', icon:'✦', title:'Fadenkünste (Silk Skills)', sub:'6 × 1%',
      items:[
        {id:'sk-silkspear', name:'Silkspear', loc:'Bindung in Mosshome', pct:1},
        {id:'sk-thread-storm', name:'Thread Storm', loc:'Bindung in Greymoor', pct:1},
        {id:'sk-cross-stitch', name:'Cross Stitch', loc:'Phantom besiegen', pct:1},
        {id:'sk-sharpdart', name:'Sharpdart', loc:'Bindung in Weavenest Karn', pct:1},
        {id:'sk-rune-rage', name:'Rune Rage', loc:'The First Sinner besiegen', pct:1},
        {id:'sk-pale-nails', name:'Pale Nails', loc:'Grand Mother Silk\'s Arm in The Cradle', pct:1},
      ]
    },
    {
      id:'upgrades', icon:'⛭', title:'Ausrüstungs-Upgrades', sub:'Crafting Kit & Tool Pouch — 8 × 1%',
      items:[
        {id:'up-craft-1', name:'Crafting Kit — Upgrade 1', pct:1},
        {id:'up-craft-2', name:'Crafting Kit — Upgrade 2', pct:1},
        {id:'up-craft-3', name:'Crafting Kit — Upgrade 3', pct:1},
        {id:'up-craft-4', name:'Crafting Kit — Upgrade 4', pct:1},
        {id:'up-pouch-1', name:'Tool Pouch — Upgrade 1', pct:1},
        {id:'up-pouch-2', name:'Tool Pouch — Upgrade 2', pct:1},
        {id:'up-pouch-3', name:'Tool Pouch — Upgrade 3', pct:1},
        {id:'up-pouch-4', name:'Tool Pouch — Upgrade 4', pct:1},
      ]
    },
    {
      id:'silk-hearts', icon:'♥', title:'Silk Hearts', sub:'3 × 1%',
      items:[
        {id:'sh-1', name:'Silk Heart 1', loc:'Bell Beast besiegen', pct:1},
        {id:'sh-2', name:'Silk Heart 2', loc:'The Unravelled besiegen', pct:1},
        {id:'sh-3', name:'Silk Heart 3', loc:'Lace @ The Cradle besiegen', pct:1},
      ]
    },
    {
      id:'crests', icon:'⛨', title:'Wappen (Crests)', sub:'6 × 1%',
      items:[
        {id:'cr-reaper', name:'Reaper Crest', pct:1},
        {id:'cr-wanderer', name:'Wanderer Crest', pct:1},
        {id:'cr-beast', name:'Beast Crest', pct:1},
        {id:'cr-witch', name:'Witch Crest', pct:1},
        {id:'cr-architect', name:'Architect Crest', pct:1},
        {id:'cr-shaman', name:'Shaman Crest', pct:1},
      ]
    },
    {
      id:'abilities', icon:'☾', title:'Fähigkeiten', sub:'7 × 1%',
      items:[
        {id:'ab-needolin', name:'Needolin', pct:1},
        {id:'ab-swift-step', name:'Swift Step', pct:1},
        {id:'ab-cling-grip', name:'Cling Grip', pct:1},
        {id:'ab-clawline', name:'Clawline', pct:1},
        {id:'ab-silk-soar', name:'Silk Soar', pct:1},
        {id:'ab-sylphsong', name:'Sylphsong', pct:1},
        {id:'ab-needle-strike', name:'Needle Strike', pct:1},
      ]
    },
    {
      id:'mask-shards', icon:'♢', title:'Maskensplitter', sub:'5 Upgrades × 1%',
      items:[
        {id:'ms-1', name:'Masken-Upgrade 1', pct:1},
        {id:'ms-2', name:'Masken-Upgrade 2', pct:1},
        {id:'ms-3', name:'Masken-Upgrade 3', pct:1},
        {id:'ms-4', name:'Masken-Upgrade 4', pct:1},
        {id:'ms-5', name:'Masken-Upgrade 5', pct:1},
      ]
    },
    {
      id:'silk-spools', icon:'○', title:'Fadenspulen (Silk Spools)', sub:'9 Upgrades × 1%',
      items:[
        {id:'ss-1', name:'Faden-Upgrade 1', pct:1},
        {id:'ss-2', name:'Faden-Upgrade 2', pct:1},
        {id:'ss-3', name:'Faden-Upgrade 3', pct:1},
        {id:'ss-4', name:'Faden-Upgrade 4', pct:1},
        {id:'ss-5', name:'Faden-Upgrade 5', pct:1},
        {id:'ss-6', name:'Faden-Upgrade 6', pct:1},
        {id:'ss-7', name:'Faden-Upgrade 7', pct:1},
        {id:'ss-8', name:'Faden-Upgrade 8', pct:1},
        {id:'ss-9', name:'Faden-Upgrade 9', pct:1},
      ]
    },
    {
      id:'needle-upgrades', icon:'↑', title:'Nadel-Upgrades', sub:'4 × 1%',
      items:[
        {id:'nu-sharpened', name:'Sharpened Needle', loc:'Widow besiegen', pct:1},
        {id:'nu-shining', name:'Shining Needle', loc:'Pale Oil', pct:1},
        {id:'nu-hivesteel', name:'Hivesteel Needle', loc:'Pale Oil + 450 Rosaries', pct:1},
        {id:'nu-pale-steel', name:'Pale Steel Needle', loc:'Pale Oil + 680 Rosaries', pct:1},
      ]
    },
    {
      id:'items', icon:'❋', title:'Gegenstände', sub:'1 × 1%',
      items:[
        {id:'it-everbloom', name:'Everbloom', loc:'Red Memory abschließen', pct:1},
      ]
    },
  ],
  bonusSections: [
    {
      id:'bosses-act1', icon:'💀', title:'Bosse — Akt 1', sub:'Bonus-Tracker — zählt nicht zur %',
      note:'Silksongs Prozentanzeige basiert auf Werkzeugen/Fähigkeiten, nicht direkt auf Boss-Kills — hier trackst du trotzdem alle Kämpfe.',
      items:[
        {id:'a1-moss-mother', name:'Moss Mother', loc:'Moss Grotto', tag:'Pflicht'},
        {id:'a1-bell-beast', name:'Bell Beast', loc:'The Marrow', tag:'Fortschritt'},
        {id:'a1-lace-1', name:'Lace', loc:'Deep Docks', tag:'Fortschritt'},
        {id:'a1-fourth-chorus', name:'Fourth Chorus', loc:'Far Fields', tag:'Pflicht'},
        {id:'a1-savage-beastfly-1', name:'Savage Beastfly', loc:'Hunter\'s March', tag:'100%'},
        {id:'a1-skull-tyrant-1', name:'Skull Tyrant', loc:'The Marrow — Grand Hunt', tag:'100%'},
        {id:'a1-skull-tyrant-2', name:'Skull Tyrant 2', loc:'Moss Grotto', tag:'Pflicht'},
        {id:'a1-moorwing', name:'Moorwing', loc:'Greymoor', tag:'Fortschritt'},
        {id:'a1-widow', name:'Widow', loc:'Bellhart', tag:'Pflicht'},
        {id:'a1-moss-mother-duo', name:'Moss Mother Duo', loc:'Weavenest Atla', tag:'100%'},
        {id:'a1-savage-beastfly-2', name:'Savage Beastfly 2', loc:'Far Fields — Grand Hunt', tag:'100%'},
        {id:'a1-great-conchflies', name:'Great Conchflies', loc:'Blasted Steps', tag:'100%'},
        {id:'a1-last-judge', name:'Last Judge', loc:'Blasted Steps (Akt-1-Ende)', tag:'Fortschritt'},
        {id:'a1-phantom', name:'Phantom', loc:'Exhaust Organ (Akt-1-Ende)', tag:'Fortschritt'},
        {id:'a1-sister-splinter', name:'Sister Splinter', loc:'Shellwood', tag:'Pflicht'},
      ]
    },
    {
      id:'bosses-act2', icon:'💀', title:'Bosse — Akt 2', sub:'Bonus-Tracker — zählt nicht zur %',
      items:[
        {id:'a2-cogwork-dancers', name:'Cogwork Dancers', loc:'Cogwork Core', tag:'Pflicht'},
        {id:'a2-trobbio', name:'Trobbio', loc:'Whispering Vaults', tag:'Fortschritt'},
        {id:'a2-lace-2', name:'Lace', loc:'The Cradle', tag:'Pflicht'},
        {id:'a2-grand-mother-silk', name:'Grand Mother Silk', loc:'The Cradle (Akt-2-Ende)', tag:'Pflicht'},
        {id:'a2-first-sinner', name:'First Sinner', loc:'The Slab', tag:'100%'},
        {id:'a2-lugoli', name:'Disgraced Chef Lugoli', loc:'Sinner\'s Road', tag:'100%'},
        {id:'a2-father-of-the-flame', name:'Father Of The Flame', loc:'Wisp Thicket', tag:'100%'},
        {id:'a2-groal', name:'Groal The Great', loc:'Bilewater', tag:'100%'},
        {id:'a2-signis-gron', name:'Forebrothers Signis and Gron', loc:'Deep Docks', tag:'Fortschritt'},
        {id:'a2-unravelled', name:'The Unravelled', loc:'Whiteward', tag:'100%'},
        {id:'a2-raging-conchfly', name:'Raging Conchfly', loc:'Sands Of Karak', tag:'100%'},
        {id:'a2-voltvyrm', name:'Voltvyrm', loc:'Sands Of Karak', tag:'100%'},
        {id:'a2-broodmother', name:'Broodmother', loc:'The Slab — Grand Hunt', tag:'100%'},
        {id:'a2-second-sentinel', name:'Second Sentinel', loc:'Choral Chambers — Wish', tag:'100%'},
        {id:'a2-garmond-zaza', name:'Garmond And Zaza', loc:'Choral Chambers', tag:'Optional'},
        {id:'a2-shakra', name:'Shakra', loc:'Greymoor (verpassbar!)', tag:'Optional'},
      ]
    },
    {
      id:'bosses-act3', icon:'💀', title:'Bosse — Akt 3', sub:'Bonus-Tracker — zählt nicht zur %',
      items:[
        {id:'a3-bell-eater', name:'Bell Eater', loc:'Choral Chambers', tag:'100%'},
        {id:'a3-palestag', name:'Palestag', loc:'Verdania', tag:'100%'},
        {id:'a3-clover-dancers', name:'Clover Dancers', loc:'Verdania', tag:'100%'},
        {id:'a3-seth', name:'Shrine Guardian Seth', loc:'Shellwood', tag:'100%'},
        {id:'a3-nyleth', name:'Nyleth', loc:'Shellwood', tag:'100%'},
        {id:'a3-karmelita', name:'Skarrsinger Karmelita', loc:'Far Fields', tag:'100%'},
        {id:'a3-khann', name:'Crust King Khann', loc:'Sands of Karak', tag:'100%'},
        {id:'a3-lost-lace', name:'Lost Lace', loc:'The Abyss (Akt-3-Ende)', tag:'100%'},
        {id:'a3-pinstress', name:'Pinstress', loc:'Mount Fay — Wish', tag:'100%'},
        {id:'a3-gurr', name:'Gurr The Outcast', loc:'Far Fields — Grand Hunt', tag:'100%'},
        {id:'a3-tormented-trobbio', name:'Tormented Trobbio', loc:'Whispering Vaults', tag:'Optional'},
        {id:'a3-plasmified-zango', name:'Plasmified Zango', loc:'Wormways', tag:'Optional'},
        {id:'a3-void-moss-mother', name:'Void Moss Mother', loc:'Moss Grotto', tag:'Optional'},
        {id:'a3-lost-garmond', name:'Lost Garmond', loc:'Blasted Steps', tag:'Erfolg'},
        {id:'a3-crawfather', name:'Crawfather', loc:'Greymoor', tag:'Optional'},
        {id:'a3-watcher-at-the-edge', name:'Watcher At The Edge', loc:'Sands Of Karak (versteckt)', tag:'Optional'},
        {id:'a3-summoned-saviour', name:'Summoned Saviour', loc:'Moss Grotto, Bonegrave (Steel Soul)', tag:'Steel Soul'},
      ]
    },
    {
      id:'bonus-cogwork', icon:'⛭', title:'Cogwork-Core-Prüfungen', sub:'Bonus — zählt nicht zur %',
      note:'Silksong hat (Stand jetzt) kein offizielles Pantheon/Kolosseum-System wie Hollow Knight 1. Die Cogwork-Core-Gefechtsarenen sind der aktuell nächste Vergleich — diese Sektion kann erweitert werden, sobald Team Cherry mehr Endgame-Content nachliefert.',
      items:[
        {id:'cog-arena-1', name:'Cogwork Core — Arena 1', tag:'Bonus'},
        {id:'cog-arena-2', name:'Cogwork Core — Arena 2 (Akt 3, schwarzfädig)', tag:'Bonus'},
        {id:'cog-dancers-nohit', name:'Cogwork Dancers ohne Treffer', tag:'Challenge'},
      ]
    },
    {
      id:'bonus-extra', icon:'✧', title:'Weitere Ziele', sub:'Bonus — zählt nicht zur %',
      items:[
        {id:'bx-steel-soul', name:'Steel Soul Durchgang (100%)', tag:'Bonus'},
        {id:'bx-speedrun', name:'Speedrun-Ziel unter 30h (100%)', tag:'Bonus'},
        {id:'bx-act3-93', name:'Ending bei max. 93% (ohne Akt 3)', tag:'Trivia'},
      ]
    },
  ]
};
