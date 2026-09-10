// ── Generic tracker engine, driven by a DATA object defined per page ──
(function(){
  const STORAGE_KEY = 'hk-tracker:' + DATA.storageId;
  let state = loadState();

  function loadState(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {checked:{}, collapsed:{}};
    }catch(e){ return {checked:{}, collapsed:{}}; }
  }
  function saveState(){
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }catch(e){}
  }

  function allSections(){
    return [...DATA.sections, ...(DATA.bonusSections||[])];
  }

  function sectionTotals(section){
    let total=0, got=0;
    section.items.forEach(it=>{
      total += it.pct;
      if(state.checked[it.id]) got += it.pct;
    });
    return {total, got};
  }

  function overallTotals(){
    let total=0, got=0;
    DATA.sections.forEach(s=>{
      const t = sectionTotals(s);
      total += t.total; got += t.got;
    });
    return {total, got};
  }

  function countChecked(items){
    return items.filter(it=>state.checked[it.id]).length;
  }

  function render(){
    renderHeader();
    renderSections('sections-container', DATA.sections, false);
    if(DATA.bonusSections && DATA.bonusSections.length){
      renderSections('bonus-container', DATA.bonusSections, true);
    }
    attachHandlers();
  }

  function renderHeader(){
    const {total, got} = overallTotals();
    const pct = DATA.maxPercent; // e.g. 112 or 100
    const displayPct = Math.round(got); // got already equals percentage points directly
    document.getElementById('gauge-pct').textContent = displayPct + '%';
    document.getElementById('gauge-of').textContent = 'von ' + pct + '%';

    const r = 75, circumference = 2*Math.PI*r;
    const frac = Math.min(displayPct/pct, 1);
    const circle = document.getElementById('gauge-fill');
    circle.setAttribute('stroke-dasharray', circumference.toFixed(2));
    circle.setAttribute('stroke-dashoffset', (circumference*(1-frac)).toFixed(2));

    // stat chips
    const statsEl = document.getElementById('stat-chips');
    statsEl.innerHTML = '';
    (DATA.headerStats||[]).forEach(stat=>{
      const items = findItemsByRef(stat.ref);
      const done = countChecked(items);
      const div = document.createElement('div');
      div.className='stat-chip';
      div.innerHTML = `<span class="label">${stat.label}</span><span class="value">${done} / ${items.length}</span>`;
      statsEl.appendChild(div);
    });
  }

  function findItemsByRef(ref){
    // ref: array of section ids to pool items from
    let items=[];
    allSections().forEach(s=>{ if(ref.includes(s.id)) items = items.concat(s.items); });
    return items;
  }

  function renderSections(containerId, sections, isBonus){
    const container = document.getElementById(containerId);
    if(!container) return;
    container.innerHTML='';
    sections.forEach(section=>{
      const {total, got} = sectionTotals(section);
      const collapsedState = state.collapsed[section.id];
      const el = document.createElement('div');
      el.className = 'section' + (isBonus?' bonus':'') + (collapsedState?' collapsed':'');
      el.dataset.section = section.id;

      const pctBadge = total>0
        ? `<span class="pct-badge">${Math.round(got)}/${total}%</span>`
        : `<span class="pct-badge zero">Bonus · 0%</span>`;

      el.innerHTML = `
        <div class="section-head" data-toggle="${section.id}">
          <span class="icon">${section.icon||'◆'}</span>
          <div class="titles">
            <h2>${section.title}</h2>
            ${section.sub ? `<div class="sub">${section.sub}</div>` : ''}
          </div>
          ${pctBadge}
          <span class="chevron">▾</span>
        </div>
        ${total>0 ? `<div class="section-progress"><div class="bar" style="width:${total? (got/total*100):0}%"></div></div>` : ''}
        <div class="section-body">
          ${section.note ? `<div class="note-box">${section.note}</div>` : ''}
          ${renderGroups(section)}
        </div>
      `;
      container.appendChild(el);
    });
  }

  function renderGroups(section){
    // supports flat items[] or grouped groups:[{label, items:[]}]
    if(section.groups){
      return section.groups.map(g=>`
        <div class="act-heading">${g.label}</div>
        <div class="item-grid">${g.items.map(renderItem).join('')}</div>
      `).join('');
    }
    return `<div class="item-grid">${section.items.map(renderItem).join('')}</div>`;
  }

  function renderItem(it){
    const checked = !!state.checked[it.id];
    return `
      <div class="item ${checked?'checked':''}" data-item="${it.id}">
        <div class="box">${checked?'✓':''}</div>
        <div class="info">
          <div class="name">${it.name}</div>
          ${it.loc ? `<div class="loc">${it.loc}</div>` : ''}
          ${it.pct>0 ? `<div class="pct">${it.pct}%</div>` : (it.tag ? `<span class="tag">${it.tag}</span>` : '')}
        </div>
      </div>
    `;
  }

  function attachHandlers(){
    document.querySelectorAll('[data-toggle]').forEach(headEl=>{
      headEl.addEventListener('click', ()=>{
        const id = headEl.dataset.toggle;
        state.collapsed[id] = !state.collapsed[id];
        saveState();
        render();
      });
    });
    document.querySelectorAll('[data-item]').forEach(itemEl=>{
      itemEl.addEventListener('click', (e)=>{
        const id = itemEl.dataset.item;
        state.checked[id] = !state.checked[id];
        saveState();
        render();
      });
    });
  }

  // ── Toolbar actions ──
  window.trackerReset = function(){
    if(confirm('Wirklich den gesamten Fortschritt zurücksetzen? Das kann nicht rückgängig gemacht werden.')){
      state = {checked:{}, collapsed:{}};
      saveState();
      render();
    }
  };
  window.trackerExport = function(){
    const blob = new Blob([JSON.stringify(state,null,2)], {type:'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = DATA.storageId + '-fortschritt.json';
    a.click();
  };
  window.trackerImportFile = function(input){
    const file = input.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (e)=>{
      try{
        const parsed = JSON.parse(e.target.result);
        if(parsed && typeof parsed==='object'){
          state = {checked: parsed.checked||{}, collapsed: parsed.collapsed||{}};
          saveState();
          render();
        }
      }catch(err){ alert('Datei konnte nicht gelesen werden.'); }
    };
    reader.readAsText(file);
    input.value='';
  };
  window.trackerExpandAll = function(){
    allSections().forEach(s=> state.collapsed[s.id]=false );
    saveState(); render();
  };
  window.trackerCollapseAll = function(){
    allSections().forEach(s=> state.collapsed[s.id]=true );
    saveState(); render();
  };

  document.addEventListener('DOMContentLoaded', render);
})();
