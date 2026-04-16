// ===== TRADUÇÕES =====
const TRANSLATIONS = {
  pt: {
    logo: "TYPERTOOLS GLOBAL",
    placeholder: "Cole seu script aqui...",
    selectStyle: "-- Selecione o Estilo --",
    generate: "Gerar Texto",
    shortcuts: "⌨️ <strong>B + A</strong>: Avança e gera automaticamente",
    mousePos: "🖱️ <strong>Posição</strong>: Onde o mouse está",
    manageStyles: "Gerenciar Estilos",
    fontCatalog: "Catálogo de Fontes",
    configFilters: "Configurar Filtros",
    styleName: "Nome do Estilo",
    fontPostscript: "Fonte (PostScript)",
    fontSize: "Tamanho (px)",
    saveStyle: "Salvar Estilo",
    savedStyles: "Estilos Salvos",
    filterTitle: "Filtros de Linha",
    filterDesc: "Linhas que começam com estes termos (ou são apenas números) serão ignoradas:",
    saveFilters: "Salvar Filtros",
    fontCatalogTitle: "Catálogo de Fontes",
    fontCatalogDesc: "Clique em uma fonte para selecioná-la automaticamente:",
    use: "Usar",
    successSent: "✓ Texto enviado!",
    errorNoText: "Cole algum texto primeiro!",
    errorNoStyle: "Selecione um estilo!",
    endOfText: "Fim do texto!",
    styleSaved: "Estilo salvo!",
    styleDeleted: "Estilo deletado!",
    filtersUpdated: "Filtros atualizados!",
    fontSelected: "Fonte selecionada!",
    confirmDelete: "Excluir este estilo?",
    errorPhotopea: "Nenhum documento aberto no Photopea!"
  },
  en: {
    logo: "TYPERTOOLS GLOBAL",
    placeholder: "Paste your script here...",
    selectStyle: "-- Select Style --",
    generate: "Generate Text",
    shortcuts: "⌨️ <strong>B + A</strong>: Advance and generate automatically",
    mousePos: "🖱️ <strong>Position</strong>: Where the mouse is",
    manageStyles: "Manage Styles",
    fontCatalog: "Font Catalog",
    configFilters: "Configure Filters",
    styleName: "Style Name",
    fontPostscript: "Font (PostScript)",
    fontSize: "Size (px)",
    saveStyle: "Save Style",
    savedStyles: "Saved Styles",
    filterTitle: "Line Filters",
    filterDesc: "Lines starting with these terms (or just numbers) will be ignored:",
    saveFilters: "Save Filters",
    fontCatalogTitle: "Font Catalog",
    fontCatalogDesc: "Click a font to select it automatically:",
    use: "Use",
    successSent: "✓ Text sent!",
    errorNoText: "Paste some text first!",
    errorNoStyle: "Select a style!",
    endOfText: "End of text!",
    styleSaved: "Style saved!",
    styleDeleted: "Style deleted!",
    filtersUpdated: "Filters updated!",
    fontSelected: "Font selected!",
    confirmDelete: "Delete this style?",
    errorPhotopea: "No document open in Photopea!"
  }
};

// ===== ESTADO GLOBAL =====
let state = {
  lang: 'pt',
  ignoreList: ["SFX:", "Sfx:", "sfx:", "SFX", "Sfx", "sfx", "##", "Halaman", "Page", "---", "page", "===", "P1", "P2", "[1]", "Pg.", "PAGE", "=0", "--"],
  styles: [],
  lines: [],
  currentIndex: 0,
  editingStyleIndex: null,
  selectedStyleIndex: -1,
  mouseX: 0,
  mouseY: 0,
  keysPressed: new Set()
};

// ===== INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", () => {
  loadData();
  setupEventListeners();
  applyTranslations();
  renderAll();
});

function loadData() {
  try {
    state.lang = localStorage.getItem("typer_lang") || 'pt';
    const savedStyles = localStorage.getItem("typer_styles");
    state.styles = savedStyles ? JSON.parse(savedStyles) : [];
    const savedIgnore = localStorage.getItem("typer_ignore");
    if (savedIgnore) state.ignoreList = JSON.parse(savedIgnore);
    const savedLastStyle = localStorage.getItem("typer_last_style");
    if (savedLastStyle !== null) {
      const idx = parseInt(savedLastStyle);
      if (idx >= 0 && idx < state.styles.length) state.selectedStyleIndex = idx;
    }
    document.getElementById("ignoreInput").value = state.ignoreList.join("\n");
    document.getElementById("langSelect").value = state.lang;
  } catch (e) {
    console.error("Error loading data:", e);
  }
}

function setupEventListeners() {
  document.getElementById("textInput").addEventListener("input", () => {
    processText();
    renderPreview();
  });

  document.getElementById("styleSelect").addEventListener("change", (e) => {
    state.selectedStyleIndex = parseInt(e.target.value);
    localStorage.setItem("typer_last_style", state.selectedStyleIndex);
  });

  document.getElementById("langSelect").addEventListener("change", (e) => {
    state.lang = e.target.value;
    localStorage.setItem("typer_lang", state.lang);
    applyTranslations();
    renderAll();
  });

  document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    state.keysPressed.add(key);
    if (state.keysPressed.has('b') && state.keysPressed.has('a')) {
      e.preventDefault();
      nextLine();
      setTimeout(() => run(), 50);
      state.keysPressed.clear();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      run();
    }
    if (e.key === 'ArrowRight') { e.preventDefault(); nextLine(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prevLine(); }
  });

  document.addEventListener("keyup", (e) => {
    state.keysPressed.delete(e.key.toLowerCase());
  });

  document.addEventListener("mousemove", (e) => {
    state.mouseX = e.clientX;
    state.mouseY = e.clientY;
  });

  document.addEventListener("click", (e) => {
    if (e.target.id === "styleModal") closeStyleModal();
    if (e.target.id === "configModal") closeConfigModal();
    if (e.target.id === "fontsModal") closeFontsModal();
  });
}

// ===== TRADUÇÃO =====
function applyTranslations() {
  const t = TRANSLATIONS[state.lang];
  document.querySelector(".logo").textContent = t.logo;
  document.getElementById("textInput").placeholder = t.placeholder;
  document.querySelector(".btn-main").textContent = t.generate;
  document.getElementById("shortcutInfo").innerHTML = t.shortcuts;
  document.getElementById("mouseInfo").innerHTML = t.mousePos;
  
  // Modais
  document.getElementById("styleModalTitle").textContent = t.manageStyles;
  document.getElementById("styleNameLabel").textContent = t.styleName;
  document.getElementById("styleFontLabel").textContent = t.fontPostscript;
  document.getElementById("styleSizeLabel").textContent = t.fontSize;
  document.getElementById("saveStyleBtn").textContent = t.saveStyle;
  
  document.getElementById("fontsModalTitle").textContent = t.fontCatalogTitle;
  document.getElementById("fontsModalDesc").textContent = t.fontCatalogDesc;
  
  document.getElementById("configModalTitle").textContent = t.filterTitle;
  document.getElementById("configModalDesc").textContent = t.filterDesc;
  document.getElementById("saveFiltersBtn").textContent = t.saveFilters;
}

// ===== LÓGICA DE TEXTO =====
function processText() {
  const raw = document.getElementById("textInput").value;
  const rawLines = raw.split("\n");
  state.lines = rawLines.map(l => l.trim()).filter(line => {
    if (!line) return false;
    const lowerLine = line.toLowerCase();
    if (state.ignoreList.some(pattern => lowerLine === pattern.toLowerCase())) return false;
    if (state.ignoreList.some(pattern => lowerLine.startsWith(pattern.toLowerCase()))) return false;
    if (/^\d+$/.test(line)) return false;
    if (/^\d+[\s\-_\.\,\:\;]/.test(line)) return false;
    return true;
  });
  state.currentIndex = 0;
}

// ===== NAVEGAÇÃO =====
function nextLine() {
  if (state.currentIndex < state.lines.length - 1) {
    state.currentIndex++;
    renderPreview();
  } else {
    notify(TRANSLATIONS[state.lang].endOfText, "info");
  }
}

function prevLine() {
  if (state.currentIndex > 0) {
    state.currentIndex--;
    renderPreview();
  }
}

function goToLine(index) {
  state.currentIndex = index;
  renderPreview();
}

// ===== EXECUÇÃO PHOTOPEA =====
function run() {
  const t = TRANSLATIONS[state.lang];
  if (state.lines.length === 0) return notify(t.errorNoText, "error");
  if (state.selectedStyleIndex === -1 || !state.styles[state.selectedStyleIndex]) {
    return notify(t.errorNoStyle, "error");
  }

  const style = state.styles[state.selectedStyleIndex];
  const text = escapeJS(state.lines[state.currentIndex]);
  const xPos = Math.max(10, state.mouseX * 2);
  const yPos = Math.max(10, state.mouseY * 2);

  const script = `
    (function() {
      if (app.documents.length == 0) {
        alert("${t.errorPhotopea}");
        return;
      }
      try {
        var doc = app.activeDocument;
        var layer = doc.artLayers.add();
        layer.kind = LayerKind.TEXT;
        var ti = layer.textItem;
        ti.contents = "${text}";
        ti.size = ${style.size};
        try { ti.font = "${style.font}"; } catch(e) {}
        ti.position = [${xPos}, ${yPos}];
      } catch(e) {
        alert("Error: " + e.message);
      }
    })();
  `;
  window.parent.postMessage(script, "*");
  notify(t.successSent, "success");
}

// ===== GERENCIAMENTO DE ESTILOS =====
function openStyleModal() {
  document.getElementById("styleModal").classList.remove("hidden");
  renderStyleManager();
}

function closeStyleModal() {
  document.getElementById("styleModal").classList.add("hidden");
  state.editingStyleIndex = null;
  clearStyleInputs();
}

function saveStyle() {
  const name = document.getElementById("styleName").value.trim();
  const font = document.getElementById("styleFont").value.trim();
  const size = parseInt(document.getElementById("styleSize").value);
  const t = TRANSLATIONS[state.lang];

  if (!name || !font || isNaN(size)) return notify(t.errorNoStyle, "error");

  const styleObj = { name, font, size };
  if (state.editingStyleIndex !== null) {
    state.styles[state.editingStyleIndex] = styleObj;
    state.editingStyleIndex = null;
  } else {
    state.styles.push(styleObj);
    state.selectedStyleIndex = state.styles.length - 1;
  }

  localStorage.setItem("typer_styles", JSON.stringify(state.styles));
  localStorage.setItem("typer_last_style", state.selectedStyleIndex);
  renderStyleSelect();
  renderStyleManager();
  clearStyleInputs();
  notify(t.styleSaved);
}

function editStyle(index) {
  const s = state.styles[index];
  document.getElementById("styleName").value = s.name;
  document.getElementById("styleFont").value = s.font;
  document.getElementById("styleSize").value = s.size;
  state.editingStyleIndex = index;
}

function deleteStyle(index) {
  const t = TRANSLATIONS[state.lang];
  if (confirm(t.confirmDelete)) {
    state.styles.splice(index, 1);
    if (state.selectedStyleIndex === index) {
      state.selectedStyleIndex = state.styles.length > 0 ? 0 : -1;
    } else if (state.selectedStyleIndex > index) {
      state.selectedStyleIndex--;
    }
    localStorage.setItem("typer_styles", JSON.stringify(state.styles));
    localStorage.setItem("typer_last_style", state.selectedStyleIndex);
    renderStyleSelect();
    renderStyleManager();
    notify(t.styleDeleted);
  }
}

// ===== MODAL DE FONTES =====
function openFontsModal() {
  document.getElementById("fontsModal").classList.remove("hidden");
  renderFontsList();
}

function closeFontsModal() {
  document.getElementById("fontsModal").classList.add("hidden");
}

function selectFont(postscript) {
  document.getElementById("styleFont").value = postscript;
  closeFontsModal();
  notify(TRANSLATIONS[state.lang].fontSelected);
}

function renderFontsList() {
  const container = document.getElementById("fontsList");
  container.innerHTML = "";
  const grouped = getFontsByCategory();
  const t = TRANSLATIONS[state.lang];

  Object.keys(grouped).sort().forEach(category => {
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "font-category";
    const categoryTitle = document.createElement("h4");
    categoryTitle.textContent = category;
    categoryDiv.appendChild(categoryTitle);

    grouped[category].forEach(font => {
      const fontItem = document.createElement("div");
      fontItem.className = "font-item";
      fontItem.innerHTML = `
        <div class="font-info">
          <strong>${font.name}</strong>
          <code>${font.postscript}</code>
        </div>
        <button onclick="selectFont('${font.postscript}')" class="btn-select">${t.use}</button>
      `;
      categoryDiv.appendChild(fontItem);
    });
    container.appendChild(categoryDiv);
  });
}

// ===== CONFIGURAÇÕES =====
function openConfigModal() {
  document.getElementById("configModal").classList.remove("hidden");
}

function closeConfigModal() {
  document.getElementById("configModal").classList.add("hidden");
}

function saveConfig() {
  const raw = document.getElementById("ignoreInput").value;
  state.ignoreList = raw.split("\n").map(s => s.trim()).filter(s => s);
  localStorage.setItem("typer_ignore", JSON.stringify(state.ignoreList));
  processText();
  renderPreview();
  closeConfigModal();
  notify(TRANSLATIONS[state.lang].filtersUpdated);
}

// ===== UTILITÁRIOS DE RENDERIZAÇÃO =====
function renderAll() {
  renderStyleSelect();
  renderPreview();
}

function renderStyleSelect() {
  const select = document.getElementById("styleSelect");
  const t = TRANSLATIONS[state.lang];
  select.innerHTML = `<option value="-1">${t.selectStyle}</option>`;
  state.styles.forEach((s, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `${s.name} (${s.font})`;
    if (i === state.selectedStyleIndex) opt.selected = true;
    select.appendChild(opt);
  });
}

function renderPreview() {
  const container = document.getElementById("previewContainer");
  container.innerHTML = "";
  if (state.lines.length === 0) {
    container.innerHTML = `<div class="empty-state">${TRANSLATIONS[state.lang].placeholder}</div>`;
    return;
  }
  state.lines.forEach((line, i) => {
    const div = document.createElement("div");
    div.className = `preview-item ${i === state.currentIndex ? 'active' : ''}`;
    div.innerHTML = `<span class="line-num">${i + 1}</span> <span class="line-text">${line}</span>`;
    div.onclick = () => goToLine(i);
    container.appendChild(div);
    if (i === state.currentIndex) div.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
  document.getElementById("counter").textContent = `${state.currentIndex + 1} / ${state.lines.length}`;
}

function renderStyleManager() {
  const list = document.getElementById("styleList");
  list.innerHTML = "";
  state.styles.forEach((s, i) => {
    const item = document.createElement("div");
    item.className = "style-item";
    item.innerHTML = `
      <div class="style-info">
        <strong>${s.name}</strong>
        <span>${s.font} - ${s.size}px</span>
      </div>
      <div class="style-actions">
        <button onclick="editStyle(${i})" class="btn-icon">✏️</button>
        <button onclick="deleteStyle(${i})" class="btn-icon btn-danger">🗑️</button>
      </div>
    `;
    list.appendChild(item);
  });
}

function notify(msg, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.className = `toast show ${type}`;
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function clearStyleInputs() {
  document.getElementById("styleName").value = "";
  document.getElementById("styleFont").value = "";
  document.getElementById("styleSize").value = "32";
}

function escapeJS(str) {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}
