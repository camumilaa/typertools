// ===== IGNORE PADRÃO =====
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

// carregar ignore no config
document.getElementById("ignore").value = ignoreList.join("\n");

// ===== PROCESSAR TEXTO =====
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
  let style = styles[selected] || { font:"ArialMT", size:32 };

  let script = `
  var layer = app.activeDocument.artLayers.add();
  layer.kind = LayerKind.TEXT;

  layer.textItem.contents = "${lines[index]}";
  layer.textItem.position = [200, 200];

  layer.textItem.font = "${style.font}";
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

// ===== STYLE =====
function toggleStyle(){
  document.getElementById("styleModal").classList.toggle("hidden");
}

function saveStyle(){
  let name = document.getElementById("styleName").value;
  let font = document.getElementById("fontFamily").value;
  let size = document.getElementById("fontSize").value;

  styles.push({ name, font, size });
  localStorage.setItem("styles", JSON.stringify(styles));

  updateStyleSelect();
  toggleStyle();
}

// ===== SELECT =====
function updateStyleSelect(){
  let select = document.getElementById("styleSelect");
  select.innerHTML = "";

  styles.forEach((s, i) => {
    let opt = document.createElement("option");
    opt.value = i;
    opt.textContent = s.name;
    select.appendChild(opt);
  });
}

// ===== INIT =====
updateStyleSelect();
document.getElementById("text").addEventListener("input", processText);
