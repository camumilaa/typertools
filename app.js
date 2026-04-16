// ===== ESTADO GLOBAL =====
let state = {
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
  renderAll();
});

function loadData() {
  try {
    // Carregar Estilos
    const savedStyles = localStorage.getItem("typer_styles");
    state.styles = savedStyles ? JSON.parse(savedStyles) : [];
    
    // Carregar Filtros
    const savedIgnore = localStorage.getItem("typer_ignore");
    if (savedIgnore) state.ignoreList = JSON.parse(savedIgnore);
    
    // Carregar Último Estilo Selecionado
    const savedLastStyle = localStorage.getItem("typer_last_style");
    if (savedLastStyle !== null) {
      const idx = parseInt(savedLastStyle);
      // Validar se o índice ainda existe na lista de estilos
      if (idx >= 0 && idx < state.styles.length) {
        state.selectedStyleIndex = idx;
      } else {
        state.selectedStyleIndex = state.styles.length > 0 ? 0 : -1;
      }
    }

    document.getElementById("ignoreInput").value = state.ignoreList.join("\n");
  } catch (e) {
    console.error("Erro ao carregar dados:", e);
    state.styles = [];
    state.selectedStyleIndex = -1;
  }
}

function setupEventListeners() {
  // Input de texto
  document.getElementById("textInput").addEventListener("input", () => {
    processText();
    renderPreview();
  });

  // Seleção de estilo no dropdown
  document.getElementById("styleSelect").addEventListener("change", (e) => {
    state.selectedStyleIndex = parseInt(e.target.value);
    localStorage.setItem("typer_last_style", state.selectedStyleIndex);
  });

  // Atalhos de teclado
  document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    state.keysPressed.add(key);

    // B + A = Avançar e Gerar
    if (state.keysPressed.has('b') && state.keysPressed.has('a')) {
      e.preventDefault();
      nextLine();
      setTimeout(() => run(), 50);
      state.keysPressed.clear();
    }

    // Ctrl/Cmd + Enter = Gerar
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      run();
    }

    // Setas para navegação
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextLine();
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevLine();
    }
  });

  document.addEventListener("keyup", (e) => {
    state.keysPressed.delete(e.key.toLowerCase());
  });

  // Rastrear posição do mouse
  document.addEventListener("mousemove", (e) => {
    state.mouseX = e.clientX;
    state.mouseY = e.clientY;
  });

  // Fechar modais ao clicar fora
  document.addEventListener("click", (e) => {
    if (e.target.id === "styleModal") closeStyleModal();
    if (e.target.id === "configModal") closeConfigModal();
    if (e.target.id === "fontsModal") closeFontsModal();
  });
}

// ===== LÓGICA DE TEXTO =====
function processText() {
  const raw = document.getElementById("textInput").value;
  const rawLines = raw.split("\n");
  
  state.lines = rawLines
    .map(l => l.trim())
    .filter(line => {
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
    notify("Fim do texto!", "info");
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
  if (state.lines.length === 0) return notify("Cole algum texto primeiro!", "error");
  if (state.selectedStyleIndex === -1 || !state.styles[state.selectedStyleIndex]) {
    return notify("Selecione um estilo!", "error");
  }

  const style = state.styles[state.selectedStyleIndex];
  const text = escapeJS(state.lines[state.currentIndex]);
  
  const xPos = Math.max(10, state.mouseX * 2);
  const yPos = Math.max(10, state.mouseY * 2);

  const script = `
    (function() {
      if (app.documents.length == 0) {
        alert("Nenhum documento aberto no Photopea!");
        return;
      }
      
      try {
        var doc = app.activeDocument;
        var layer = doc.artLayers.add();
        layer.kind = LayerKind.TEXT;
        var ti = layer.textItem;
        ti.contents = "${text}";
        ti.size = ${style.size};
        
        try {
          ti.font = "${style.font}";
        } catch(e) {
          // Fonte não disponível
        }
        
        ti.position = [${xPos}, ${yPos}];
        
      } catch(e) {
        alert("Erro ao criar texto: " + e.message);
      }
    })();
  `;

  window.parent.postMessage(script, "*");
  notify("✓ Texto enviado!", "success");
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

  if (!name || !font || isNaN(size)) return notify("Preencha todos os campos!", "error");

  const styleObj = { name, font, size };

  if (state.editingStyleIndex !== null) {
    state.styles[state.editingStyleIndex] = styleObj;
    state.editingStyleIndex = null;
  } else {
    state.styles.push(styleObj);
    state.selectedStyleIndex = state.styles.length - 1;
  }

  // Salvar no localStorage
  localStorage.setItem("typer_styles", JSON.stringify(state.styles));
  localStorage.setItem("typer_last_style", state.selectedStyleIndex);
  
  renderStyleSelect();
  renderStyleManager();
  clearStyleInputs();
  notify("Estilo salvo!");
}

function editStyle(index) {
  const s = state.styles[index];
  document.getElementById("styleName").value = s.name;
  document.getElementById("styleFont").value = s.font;
  document.getElementById("styleSize").value = s.size;
  state.editingStyleIndex = index;
}

function deleteStyle(index) {
  if (confirm("Excluir este estilo?")) {
    state.styles.splice(index, 1);
    
    // Ajustar índice selecionado
    if (state.selectedStyleIndex === index) {
      state.selectedStyleIndex = state.styles.length > 0 ? 0 : -1;
    } else if (state.selectedStyleIndex > index) {
      state.selectedStyleIndex--;
    }
    
    localStorage.setItem("typer_styles", JSON.stringify(state.styles));
    localStorage.setItem("typer_last_style", state.selectedStyleIndex);
    
    renderStyleSelect();
    renderStyleManager();
    notify("Estilo deletado!");
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
  notify("Fonte selecionada!");
}

function renderFontsList() {
  const container = document.getElementById("fontsList");
  container.innerHTML = "";

  const grouped = getFontsByCategory();

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
        <button onclick="selectFont('${font.postscript}')" class="btn-select">Usar</button>
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
  notify("Filtros atualizados!");
}

// ===== UTILITÁRIOS DE RENDERIZAÇÃO =====
function renderAll() {
  renderStyleSelect();
  renderPreview();
}

function renderStyleSelect() {
  const select = document.getElementById("styleSelect");
  select.innerHTML = '<option value="-1">-- Selecione o Estilo --</option>';
  
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
    container.innerHTML = '<div class="empty-state">Aguardando texto...</div>';
    return;
  }

  state.lines.forEach((line, i) => {
    const div = document.createElement("div");
    div.className = `preview-item ${i === state.currentIndex ? 'active' : ''}`;
    div.innerHTML = `<span class="line-num">${i + 1}</span> <span class="line-text">${line}</span>`;
    div.onclick = () => goToLine(i);
    container.appendChild(div);
    
    if (i === state.currentIndex) {
      div.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
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
