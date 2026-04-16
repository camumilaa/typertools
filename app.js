// ===== IGNORE =====
let ignoreList = [
  "SFX:","Sfx:","sfx:","SFX","Sfx","sfx",
  "##","Halaman","Page","---","page","===",
  "P1","P2","[1]","Pg.","PAGE","=0","--"
];

// ===== ESTILOS =====
let styles = [];
let loadStyles = () => {
  try {
    const stored = localStorage.getItem("styles");
    styles = stored ? JSON.parse(stored) : [];
  } catch(e) {
    console.error("Erro ao carregar estilos:", e);
    styles = [];
  }
};
loadStyles();

// ===== DADOS =====
let lines = [];
let index = 0;
let editingIndex = null;

// ===== FONTES SEGURAS =====
let fontList = [
  "ArialMT",
  "Arial-BoldMT",
  "Arial-ItalicMT",
  "Arial-BoldItalicMT",
  "TimesNewRomanPSMT",
  "TimesNewRomanPS-BoldMT",
  "TimesNewRomanPS-ItalicMT",
  "TimesNewRomanPS-BoldItalicMT",
  "Verdana",
  "Verdana-Bold",
  "Verdana-Italic",
  "Verdana-BoldItalic",
  "CourierNewPSMT",
  "CourierNewPS-BoldMT",
  "CourierNewPS-ItalicMT",
  "CourierNewPS-BoldItalicMT",
  "Helvetica",
  "Helvetica-Bold",
  "Helvetica-Oblique",
  "Helvetica-BoldOblique",
  "Georgia",
  "Georgia-Bold",
  "Georgia-Italic",
  "Georgia-BoldItalic"
];

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("ignore").value = ignoreList.join("\n");
  updateStyleList();
  processText();
  
  // Auto-processar ao colar texto
  document.getElementById("text").addEventListener("input", processText);
});

// ===== TEXTO =====
function processText(){
  try {
    let raw = document.getElementById("text").value;
    
    lines = raw.split("\n").filter(line => {
      let t = line.trim();
      if (!t) return false;
      return !ignoreList.some(tag => t.startsWith(tag));
    });

    index = 0;
    updatePreview();
  } catch(e) {
    console.error("Erro ao processar texto:", e);
  }
}

// ===== PREVIEW =====
function updatePreview(){
  try {
    let preview = document.getElementById("preview");
    preview.innerHTML = "";

    if(lines.length === 0) {
      let empty = document.createElement("div");
      empty.style.textAlign = "center";
      empty.style.color = "#999";
      empty.textContent = "Nenhuma linha para exibir";
      preview.appendChild(empty);
      return;
    }

    lines.forEach((line, i) => {
      let div = document.createElement("div");
      div.className = "item";
      if(i === index) div.classList.add("active");

      div.textContent = (i+1) + ". " + line;
      div.style.cursor = "pointer";
      div.onclick = () => {
        index = i;
        updatePreview();
      };
      preview.appendChild(div);
    });
  } catch(e) {
    console.error("Erro ao atualizar preview:", e);
  }
}

// ===== NEXT =====
function nextLine(){
  if(index < lines.length - 1){
    index++;
    updatePreview();
  }
}

// ===== ESCAPE STRING =====
function escapeString(str) {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t");
}

// ===== GERAR =====
function run(){
  try {
    let selected = document.getElementById("styleSelect").value;
    
    if(selected === "" || !styles[selected]){
      alert("Escolha um estilo!");
      return;
    }

    if(lines.length === 0) {
      alert("Nenhuma linha para gerar!");
      return;
    }

    let style = styles[selected];
    let text = escapeString(lines[index]);

    let script = `
    var layer = app.activeDocument.artLayers.add();
    layer.kind = LayerKind.TEXT;
    layer.textItem.contents = "${text}";
    layer.textItem.position = [200, 200];
    
    try {
      layer.textItem.font = "${style.font}";
    } catch(e) {
      // Fonte não disponível, usar padrão
    }
    
    layer.textItem.size = ${parseInt(style.size) || 32};
    `;

    window.parent.postMessage(script, "*");
    
    // Feedback visual
    let btn = event.target;
    let original = btn.textContent;
    btn.textContent = "✓ Enviado!";
    setTimeout(() => {
      btn.textContent = original;
    }, 1500);
    
  } catch(e) {
    console.error("Erro ao gerar:", e);
    alert("Erro ao gerar texto. Verifique o console.");
  }
}

// ===== CONFIG =====
function toggleConfig(){
  document.getElementById("configModal").classList.toggle("hidden");
}

function saveConfig(){
  try {
    let raw = document.getElementById("ignore").value;
    ignoreList = raw.split("\n").map(t => t.trim()).filter(t => t);
    toggleConfig();
    processText();
  } catch(e) {
    console.error("Erro ao salvar config:", e);
    alert("Erro ao salvar configuração!");
  }
}

// ===== STYLE UI =====
function toggleStyle(){
  document.getElementById("styleModal").classList.toggle("hidden");
}

// ===== SALVAR / EDITAR =====
function saveStyle(){
  try {
    let name = document.getElementById("styleName").value.trim();
    let font = document.getElementById("fontFamily").value.trim();
    let size = document.getElementById("fontSize").value;

    if(!name) {
      alert("Digite um nome para o estilo!");
      return;
    }
    
    if(!font) {
      alert("Digite o nome da fonte!");
      return;
    }

    size = parseInt(size) || 32;
    if(size < 1 || size > 1000) {
      alert("Tamanho deve estar entre 1 e 1000!");
      return;
    }

    let obj = { name, font, size };

    if(editingIndex !== null){
      styles[editingIndex] = obj;
      editingIndex = null;
    } else {
      styles.push(obj);
    }

    localStorage.setItem("styles", JSON.stringify(styles));

    // Limpar campos
    document.getElementById("styleName").value = "";
    document.getElementById("fontFamily").value = "";
    document.getElementById("fontSize").value = "32";

    updateStyleList();
    toggleStyle();
  } catch(e) {
    console.error("Erro ao salvar estilo:", e);
    alert("Erro ao salvar estilo!");
  }
}

// ===== LISTA DE ESTILOS =====
function updateStyleList(){
  try {
    let select = document.getElementById("styleSelect");
    select.innerHTML = '<option value="">-- Selecione um estilo --</option>';

    styles.forEach((s, i) => {
      let opt = document.createElement("option");
      opt.value = i;
      opt.textContent = s.name + " (" + s.font + ", " + s.size + "px)";
      select.appendChild(opt);
    });

    updateStyleManager();
  } catch(e) {
    console.error("Erro ao atualizar lista de estilos:", e);
  }
}

// ===== GERENCIAR ESTILOS =====
function updateStyleManager(){
  try {
    let list = document.getElementById("styleManager");
    if(!list) return;

    list.innerHTML = "";

    if(styles.length === 0) {
      let empty = document.createElement("div");
      empty.style.textAlign = "center";
      empty.style.color = "#999";
      empty.textContent = "Nenhum estilo criado";
      list.appendChild(empty);
      return;
    }

    styles.forEach((s, i) => {
      let div = document.createElement("div");
      div.className = "item";

      div.innerHTML = `
        <b>${escapeString(s.name)}</b><br>
        Fonte: ${escapeString(s.font)}<br>
        Tamanho: ${s.size}px
        <br>
        <button class="btn-small" onclick="editStyle(${i})">Editar</button>
        <button class="btn-small btn-danger" onclick="deleteStyle(${i})">Deletar</button>
      `;

      list.appendChild(div);
    });
  } catch(e) {
    console.error("Erro ao atualizar gerenciador de estilos:", e);
  }
}

// ===== EDITAR =====
function editStyle(i){
  try {
    if(i < 0 || i >= styles.length) {
      alert("Estilo não encontrado!");
      return;
    }

    let s = styles[i];

    document.getElementById("styleName").value = s.name;
    document.getElementById("fontFamily").value = s.font;
    document.getElementById("fontSize").value = s.size;

    editingIndex = i;
    toggleStyle();
  } catch(e) {
    console.error("Erro ao editar estilo:", e);
    alert("Erro ao editar estilo!");
  }
}

// ===== DELETAR =====
function deleteStyle(i){
  try {
    if(i < 0 || i >= styles.length) {
      alert("Estilo não encontrado!");
      return;
    }

    if(confirm("Tem certeza que deseja deletar este estilo?")) {
      styles.splice(i, 1);
      localStorage.setItem("styles", JSON.stringify(styles));
      updateStyleList();
    }
  } catch(e) {
    console.error("Erro ao deletar estilo:", e);
    alert("Erro ao deletar estilo!");
  }
}
