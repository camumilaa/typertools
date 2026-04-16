// ===== CATÁLOGO DE FONTES EXPANDIDO DO PHOTOPEA =====
// Baseado na biblioteca real do Photopea e fontes populares para design/manga.
const PHOTOPEA_FONTS = [
  // SANS-SERIF (Essenciais)
  { name: "Arial", postscript: "ArialMT", category: "Sans-Serif" },
  { name: "Arial Bold", postscript: "Arial-BoldMT", category: "Sans-Serif" },
  { name: "Arial Italic", postscript: "Arial-ItalicMT", category: "Sans-Serif" },
  { name: "Verdana", postscript: "Verdana", category: "Sans-Serif" },
  { name: "Verdana Bold", postscript: "Verdana-Bold", category: "Sans-Serif" },
  { name: "Impact", postscript: "Impact", category: "Sans-Serif" },
  { name: "Trebuchet MS", postscript: "TrebuchetMS", category: "Sans-Serif" },
  { name: "Helvetica", postscript: "Helvetica", category: "Sans-Serif" },
  { name: "Helvetica Bold", postscript: "Helvetica-Bold", category: "Sans-Serif" },

  // SERIF (Clássicas)
  { name: "Times New Roman", postscript: "TimesNewRomanPSMT", category: "Serif" },
  { name: "Times New Roman Bold", postscript: "TimesNewRomanPS-BoldMT", category: "Serif" },
  { name: "Georgia", postscript: "Georgia", category: "Serif" },
  { name: "Georgia Bold", postscript: "Georgia-Bold", category: "Serif" },
  { name: "Garamond", postscript: "Garamond", category: "Serif" },
  { name: "Palatino", postscript: "PalatinoPSMT", category: "Serif" },

  // GOOGLE FONTS (Muito populares no Photopea)
  { name: "Roboto Regular", postscript: "Roboto-Regular", category: "Google Fonts" },
  { name: "Roboto Bold", postscript: "Roboto-Bold", category: "Google Fonts" },
  { name: "Open Sans Regular", postscript: "OpenSans-Regular", category: "Google Fonts" },
  { name: "Open Sans Bold", postscript: "OpenSans-Bold", category: "Google Fonts" },
  { name: "Lato Regular", postscript: "Lato-Regular", category: "Google Fonts" },
  { name: "Lato Bold", postscript: "Lato-Bold", category: "Google Fonts" },
  { name: "Montserrat Regular", postscript: "Montserrat-Regular", category: "Google Fonts" },
  { name: "Montserrat Bold", postscript: "Montserrat-Bold", category: "Google Fonts" },
  { name: "Oswald Regular", postscript: "Oswald-Regular", category: "Google Fonts" },
  { name: "Raleway Regular", postscript: "Raleway-Regular", category: "Google Fonts" },
  { name: "Poppins Regular", postscript: "Poppins-Regular", category: "Google Fonts" },
  { name: "Poppins Bold", postscript: "Poppins-Bold", category: "Google Fonts" },
  { name: "Bebas Neue", postscript: "BebasNeue-Regular", category: "Google Fonts" },
  { name: "Playfair Display", postscript: "PlayfairDisplay-Regular", category: "Google Fonts" },

  // COMIC / MANGA (Específicas para Typesetting)
  { name: "Comic Sans MS", postscript: "ComicSansMS", category: "Comic/Manga" },
  { name: "Comic Sans MS Bold", postscript: "ComicSansMS-Bold", category: "Comic/Manga" },
  { name: "Wild Words", postscript: "WildWords-Regular", category: "Comic/Manga" },
  { name: "CC Wild Words", postscript: "CCWildWords-Regular", category: "Comic/Manga" },
  { name: "Anime Ace", postscript: "AnimeAce-Regular", category: "Comic/Manga" },
  { name: "Bangers", postscript: "Bangers-Regular", category: "Comic/Manga" },
  { name: "Indie Flower", postscript: "IndieFlower", category: "Comic/Manga" },
  { name: "Luckiest Guy", postscript: "LuckiestGuy-Regular", category: "Comic/Manga" },
  { name: "Permanent Marker", postscript: "PermanentMarker-Regular", category: "Comic/Manga" },

  // DISPLAY / DECORATIVE
  { name: "Lemon Milk", postscript: "LemonMilk-Regular", category: "Display" },
  { name: "Anton", postscript: "Anton-Regular", category: "Display" },
  { name: "Lobster", postscript: "Lobster-Regular", category: "Display" },
  { name: "Pacifico", postscript: "Pacifico-Regular", category: "Display" },
  { name: "Fredoka One", postscript: "FredokaOne-Regular", category: "Display" },
  { name: "Righteous", postscript: "Righteous-Regular", category: "Display" },
  { name: "Abril Fatface", postscript: "AbrilFatface-Regular", category: "Display" },

  // MONOSPACE
  { name: "Courier New", postscript: "CourierNewPSMT", category: "Monospace" },
  { name: "Courier New Bold", postscript: "CourierNewPS-BoldMT", category: "Monospace" },
  { name: "Source Code Pro", postscript: "SourceCodePro-Regular", category: "Monospace" },
  { name: "Inconsolata", postscript: "Inconsolata-Regular", category: "Monospace" }
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
