// ===== CATÁLOGO DE FONTES REAIS DO PHOTOPEA =====
// Estas são as fontes padrão que o Photopea carrega nativamente.
const PHOTOPEA_FONTS = [
  // SANS-SERIF (Básicas e Seguras)
  { name: "Arial", postscript: "ArialMT", category: "Sans-Serif" },
  { name: "Arial Bold", postscript: "Arial-BoldMT", category: "Sans-Serif" },
  { name: "Arial Italic", postscript: "Arial-ItalicMT", category: "Sans-Serif" },
  { name: "Arial Bold Italic", postscript: "Arial-BoldItalicMT", category: "Sans-Serif" },
  
  { name: "Verdana", postscript: "Verdana", category: "Sans-Serif" },
  { name: "Verdana Bold", postscript: "Verdana-Bold", category: "Sans-Serif" },
  { name: "Verdana Italic", postscript: "Verdana-Italic", category: "Sans-Serif" },
  
  { name: "Trebuchet MS", postscript: "TrebuchetMS", category: "Sans-Serif" },
  { name: "Trebuchet MS Bold", postscript: "TrebuchetMS-Bold", category: "Sans-Serif" },
  
  { name: "Impact", postscript: "Impact", category: "Sans-Serif" },

  // SERIF (Clássicas)
  { name: "Times New Roman", postscript: "TimesNewRomanPSMT", category: "Serif" },
  { name: "Times New Roman Bold", postscript: "TimesNewRomanPS-BoldMT", category: "Serif" },
  { name: "Times New Roman Italic", postscript: "TimesNewRomanPS-ItalicMT", category: "Serif" },
  
  { name: "Georgia", postscript: "Georgia", category: "Serif" },
  { name: "Georgia Bold", postscript: "Georgia-Bold", category: "Serif" },
  
  // MONOSPACE (Código/Máquina de escrever)
  { name: "Courier New", postscript: "CourierNewPSMT", category: "Monospace" },
  { name: "Courier New Bold", postscript: "CourierNewPS-BoldMT", category: "Monospace" },
  
  // GOOGLE FONTS (Muito comuns no Photopea)
  { name: "Open Sans Regular", postscript: "OpenSans-Regular", category: "Google Fonts" },
  { name: "Open Sans Bold", postscript: "OpenSans-Bold", category: "Google Fonts" },
  
  { name: "Roboto Regular", postscript: "Roboto-Regular", category: "Google Fonts" },
  { name: "Roboto Bold", postscript: "Roboto-Bold", category: "Google Fonts" },
  
  { name: "Lato Regular", postscript: "Lato-Regular", category: "Google Fonts" },
  { name: "Lato Bold", postscript: "Lato-Bold", category: "Google Fonts" },
  
  { name: "Montserrat Regular", postscript: "Montserrat-Regular", category: "Google Fonts" },
  { name: "Montserrat Bold", postscript: "Montserrat-Bold", category: "Google Fonts" },
  
  { name: "Oswald Regular", postscript: "Oswald-Regular", category: "Google Fonts" },
  
  // CASUAL / COMIC
  { name: "Comic Sans MS", postscript: "ComicSansMS", category: "Casual" },
  { name: "Comic Sans MS Bold", postscript: "ComicSansMS-Bold", category: "Casual" },
  
  // NOTO SANS (Padrão do Photopea para muitos idiomas)
  { name: "Noto Sans Regular", postscript: "NotoSans-Regular", category: "Noto" },
  { name: "Noto Sans Bold", postscript: "NotoSans-Bold", category: "Noto" }
];

// Agrupar fontes por categoria
function getFontsByCategory() {
  const grouped = {};
  PHOTOPEA_FONTS.forEach(font => {
    if (!grouped[font.category]) grouped[font.category] = [];
    grouped[font.category].push(font);
  });
  return grouped;
}
