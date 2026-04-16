// ===== IGNORE =====
let ignoreList = [
"SFX:","Sfx:","sfx:","SFX","Sfx","sfx",
"##","Halaman","Page","---","page","===",
"P1","P2","[1]","Pg.","PAGE","=0","--"
];

// ===== ESTILOS =====
let styles = JSON.parse(localStorage.getItem("styles") || "[]");

// ===== DADOS =====
let lines = [];
let index = 0;
let editingIndex = null;

// ===== FONTES SEGURAS =====
let fontList = [
"ArialMT",
"Arial-BoldMT",
"TimesNewRomanPSMT",
"Verdana",
"CourierNewPSMT"
];

// ===== INIT =====
document.getElementById("ignore").value = ignoreList.join("\n");
updateStyleList();
processText();

// ===== TEXTO =====
function processText(){
  let raw = document.getElementById("text").value;

  lines = raw.split("\n").filter(line => {
    let t = line.trim();
    if (!t) return false;
    return !ignoreList.some(tag => t.startsWith(tag));
  });

  index = 0;
  updatePreview();
}

// ===== PREVIEW =====
function updatePreview(){
  let preview = document.getElementById("preview");
  preview.innerHTML = "";

  lines.forEach((line, i) => {
    let div = document.createElement("div");
    div.className = "item";
    if(i === index) div.classList.add("active");

    div.textContent = (i+1) + ". " + line;
    preview.appendChild(div);
  });
}

// ===== NEXT =====
function nextLine(){
  if(index < lines.length - 1){
    index++;
    updatePreview();
  }
}

// ===== GERAR =====
function run(){

  let selected = document.getElementById("styleSelect").value;
  let style = styles[selected];

  if(!style){
    alert("Escolha um estilo!");
    return;
  }

  let script = `
  var layer = app.activeDocument.artLayers.add();
  layer.kind = LayerKind.TEXT;

  layer.textItem.contents = "${lines[index]}";
  layer.textItem.position = [200, 200];

  try {
    layer.textItem.font = "${style.font}";
  } catch(e){}

  layer.textItem.size = ${style.size};
  `;

  window.parent.postMessage(script, "*");
}

// ===== CONFIG =====
function toggleConfig(){
  document.getElementById("configModal").classList.toggle("hidden");
}

function saveConfig(){
  let raw = document.getElementById("ignore").value;
  ignoreList = raw.split("\n").map(t => t.trim()).filter(t => t);
  toggleConfig();
  processText();
}

// ===== STYLE UI =====
function toggleStyle(){
  document.getElementById("styleModal").classList.toggle("hidden");
}

// ===== SALVAR / EDITAR =====
function saveStyle(){

  let name = document.getElementById("styleName").value;
  let font = document.getElementById("fontFamily").value;
  let size = document.getElementById("fontSize").value;

  if(!name || !font){
    alert("Preencha tudo!");
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

  updateStyleList();
  toggleStyle();
}

// ===== LISTA DE ESTILOS =====
function updateStyleList(){
  let select = document.getElementById("styleSelect");
  select.innerHTML = "";

  styles.forEach((s, i) => {
    let opt = document.createElement("option");
    opt.value = i;
    opt.textContent = s.name + " (" + s.font + ")";
    select.appendChild(opt);
  });

  updateStyleManager();
}

// ===== GERENCIAR ESTILOS =====
function updateStyleManager(){
  let list = document.getElementById("styleManager");
  if(!list) return;

  list.innerHTML = "";

  styles.forEach((s, i) => {

    let div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <b>${s.name}</b><br>
      Fonte: ${s.font}<br>
      Tamanho: ${s.size}
      <br>
      <button onclick="editStyle(${i})">Editar</button>
      <button onclick="deleteStyle(${i})">Deletar</button>
    `;

    list.appendChild(div);
  });
}

// ===== EDITAR =====
function editStyle(i){
  let s = styles[i];

  document.getElementById("styleName").value = s.name;
  document.getElementById("fontFamily").value = s.font;
  document.getElementById("fontSize").value = s.size;

  editingIndex = i;
  toggleStyle();
}

// ===== DELETAR =====
function deleteStyle(i){
  styles.splice(i,1);
  localStorage.setItem("styles", JSON.stringify(styles));
  updateStyleList();
}
