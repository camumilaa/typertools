let ignoreList = [
"SFX:", "Sfx:", "sfx:", "SFX", "Sfx", "sfx",
"##","Halaman","Page","---","page","===",
"P1","P2","[1]","Pg.","PAGE","=0","--"
];

let lines = [];
let index = 0;

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

function updatePreview(){
  let preview = document.getElementById("preview");
  preview.innerHTML = "";

  lines.forEach((line, i) => {
    let div = document.createElement("div");
    div.className = "item";
    div.textContent = (i === index ? "👉 " : "") + line;
    preview.appendChild(div);
  });
}

function nextLine(){
  if(index < lines.length - 1){
    index++;
    updatePreview();
  }
}

function run(){
  let script = `
  var layer = app.activeDocument.artLayers.add();
  layer.kind = LayerKind.TEXT;

  layer.textItem.contents = "${lines[index]}";
  layer.textItem.position = [200, 200];
  `;

  window.parent.postMessage(script, "*");
}

function toggleConfig(){
  document.getElementById("config").classList.toggle("hidden");
}

// atualiza automaticamente
document.getElementById("text").addEventListener("input", processText);
