// ===== CATÁLOGO DE FONTES DO PHOTOPEA =====
const PHOTOPEA_FONTS = [
  // ARIAL
  { name: "Arial", postscript: "ArialMT", category: "Sans-Serif" },
  { name: "Arial Bold", postscript: "Arial-BoldMT", category: "Sans-Serif" },
  { name: "Arial Italic", postscript: "Arial-ItalicMT", category: "Sans-Serif" },
  { name: "Arial Bold Italic", postscript: "Arial-BoldItalicMT", category: "Sans-Serif" },
  
  // TIMES NEW ROMAN
  { name: "Times New Roman", postscript: "TimesNewRomanPSMT", category: "Serif" },
  { name: "Times New Roman Bold", postscript: "TimesNewRomanPS-BoldMT", category: "Serif" },
  { name: "Times New Roman Italic", postscript: "TimesNewRomanPS-ItalicMT", category: "Serif" },
  { name: "Times New Roman Bold Italic", postscript: "TimesNewRomanPS-BoldItalicMT", category: "Serif" },
  
  // VERDANA
  { name: "Verdana", postscript: "Verdana", category: "Sans-Serif" },
  { name: "Verdana Bold", postscript: "Verdana-Bold", category: "Sans-Serif" },
  { name: "Verdana Italic", postscript: "Verdana-Italic", category: "Sans-Serif" },
  { name: "Verdana Bold Italic", postscript: "Verdana-BoldItalic", category: "Sans-Serif" },
  
  // COURIER NEW
  { name: "Courier New", postscript: "CourierNewPSMT", category: "Monospace" },
  { name: "Courier New Bold", postscript: "CourierNewPS-BoldMT", category: "Monospace" },
  { name: "Courier New Italic", postscript: "CourierNewPS-ItalicMT", category: "Monospace" },
  { name: "Courier New Bold Italic", postscript: "CourierNewPS-BoldItalicMT", category: "Monospace" },
  
  // HELVETICA
  { name: "Helvetica", postscript: "Helvetica", category: "Sans-Serif" },
  { name: "Helvetica Bold", postscript: "Helvetica-Bold", category: "Sans-Serif" },
  { name: "Helvetica Oblique", postscript: "Helvetica-Oblique", category: "Sans-Serif" },
  { name: "Helvetica Bold Oblique", postscript: "Helvetica-BoldOblique", category: "Sans-Serif" },
  
  // GEORGIA
  { name: "Georgia", postscript: "Georgia", category: "Serif" },
  { name: "Georgia Bold", postscript: "Georgia-Bold", category: "Serif" },
  { name: "Georgia Italic", postscript: "Georgia-Italic", category: "Serif" },
  { name: "Georgia Bold Italic", postscript: "Georgia-BoldItalic", category: "Serif" },
  
  // GARAMOND
  { name: "Garamond", postscript: "Garamond", category: "Serif" },
  { name: "Garamond Bold", postscript: "Garamond-Bold", category: "Serif" },
  { name: "Garamond Italic", postscript: "Garamond-Italic", category: "Serif" },
  { name: "Garamond Bold Italic", postscript: "Garamond-BoldItalic", category: "Serif" },
  
  // PALATINO
  { name: "Palatino Linotype", postscript: "PalatinoPSMT", category: "Serif" },
  { name: "Palatino Linotype Bold", postscript: "Palatino-Bold", category: "Serif" },
  { name: "Palatino Linotype Italic", postscript: "Palatino-Italic", category: "Serif" },
  { name: "Palatino Linotype Bold Italic", postscript: "Palatino-BoldItalic", category: "Serif" },
  
  // TREBUCHET MS
  { name: "Trebuchet MS", postscript: "TrebuchetMS", category: "Sans-Serif" },
  { name: "Trebuchet MS Bold", postscript: "TrebuchetMS-Bold", category: "Sans-Serif" },
  { name: "Trebuchet MS Italic", postscript: "TrebuchetMS-Italic", category: "Sans-Serif" },
  { name: "Trebuchet MS Bold Italic", postscript: "TrebuchetMS-BoldItalic", category: "Sans-Serif" },
  
  // IMPACT
  { name: "Impact", postscript: "Impact", category: "Sans-Serif" },
  
  // COMIC SANS MS
  { name: "Comic Sans MS", postscript: "ComicSansMS", category: "Casual" },
  { name: "Comic Sans MS Bold", postscript: "ComicSansMS-Bold", category: "Casual" },
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

// Buscar fonte por PostScript
function getFontByPostScript(postscript) {
  return PHOTOPEA_FONTS.find(f => f.postscript === postscript);
}

// Buscar fonte por nome
function getFontByName(name) {
  return PHOTOPEA_FONTS.find(f => f.name.toLowerCase() === name.toLowerCase());
}
