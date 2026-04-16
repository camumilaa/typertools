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
  keysPressed: {}
};

// ===== INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", () => {
  loadData();
  setupEventListeners();
  renderAll();
});

function loadData() {
  try {
    const savedStyles = localStorage.getItem("typer_styles");
    state.styles = savedStyles ? JSON.parse(savedStyles) : [];
    
    const savedIgnore = localStorage.getItem("typer_ignore");
    if (savedIgnore) state.ignoreList = JSON.parse(savedIgnore);
    
    const savedLastStyle = localStorage.getItem("typer_last_style");
    if (savedLastStyle !== null) state.selectedStyleIndex = parseInt(savedLastStyle);

    document.getElementById("ignoreInput").value = state.ignoreList.join("\n");
  } catch (e) {
    console.error("Erro ao carregar dados:", e);
  }
}

function setupEventListeners() {
  // Input de texto
  document.getElementById("textInput").addEventListener("input", () => {
    processText();
    renderPreview();
  });

  // Seleção de estilo
  document.getElementById("styleSelect").addEventListener("change", (e) => {
    state.selectedStyleIndex = parseInt(e.target.value);
    localStorage.setItem("typer_last_style", state.selectedStyleIndex);
  });

  // Atalhos de teclado
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);

  // Rastrear posição do mouse
  document.addEventListener("mousemove", (e) => {
    state.mouseX = e.clientX;
    state.mouseY = e.clientY;
  });
}

// ===== ATALHOS DE TECLADO =====
function handleKeyDown(e) {
  state.keysPressed[e.key.toLowerCase()] = true;

  // B + A = Avançar e Gerar
  if (state.keysPressed['b'] && state.keysPressed['a']) {
    e.preventDefault();
    nextLine();
    setTimeout(() => run(), 100);
  }
}

function handleKeyUp(e) {
  state.keysPressed[e.key.toLowerCase()] = false;
}

// ===== LÓGICA DE TEXTO COM FILTRAGEM CORRIGIDA =====
function processText() {
  const raw = document.getElementById("textInput").value;
  const rawLines = raw.split("\n");
  
  state.lines = rawLines
    .map(l => l.trim())
    .filter(line => {
      // Rejeita linhas vazias
      if (!line) return false;

      // Verifica se a linha INTEIRA é um dos itens da ignoreList (case insensitive)
      const lowerLine = line.toLowerCase();
      
      // Primeiro, testa correspondência exata
      if (state.ignoreList.some(pattern => lowerLine === pattern.toLowerCase())) {
        return false;
      }

      // Depois, testa se começa com o padrão
      if (state.ignoreList.some(pattern => lowerLine.startsWith(pattern.toLowerCase()))) {
        return false;
      }

      // Testa se a linha é APENAS números
      if (/^\d+$/.test(line)) {
        return false;
      }

      // Testa se começa com números seguidos de espaço ou caractere especial
      if (/^\d+[\s\-_\.\,\:\;]/.test(line)) {
        return false;
      }

      // Se passou em todos os testes, inclui a linha
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

// ===== EXECUÇÃO PHOTOPEA COM POSICIONAMENTO =====
function run() {
  if (state.lines.length === 0) return notify("Cole algum texto primeiro!", "error");
  if (state.selectedStyleIndex === -1 || !state.styles[state.selectedStyleIndex]) {
    return notify("Selecione um estilo!", "error");
  }

  const style = state.styles[state.selectedStyleIndex];
  const text = escapeJS(state.lines[state.currentIndex]);
  
  // Calcular posição relativa ao documento Photopea
  // A posição será baseada na posição do mouse na tela
  const xPos = Math.max(10, state.mouseX * 2); // Escala aproximada
  const yPos = Math.max(10, state.mouseY * 2);

  // Script otimizado para Photopea com posicionamento
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
        
        // Tentar aplicar a fonte
        try {
          ti.font = "${style.font}";
        } catch(e) {
          // Fonte não disponível, usar padrão
        }
        
        // Posicionar o texto onde o mouse estava
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
    if (state.selectedStyleIndex >= state.styles.length) state.selectedStyleIndex = state.styles.length - 1;
    localStorage.setItem("typer_styles", JSON.stringify(state.styles));
    renderStyleSelect();
    renderStyleManager();
    notify("Estilo deletado!");
  }
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
    container.innerHTML = '<div class="empty-state">Nenhum texto processado</div>';
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

  // Atualizar contador
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
