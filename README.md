# TyperTools Pro - Photopea Edition

A extensão mais rápida e elegante para digitação de textos em imagens no Photopea. Perfeita para typesetters, tradutores de mangá, comics e qualquer projeto que exija adicionar texto em lote.

## 🚀 Funcionalidades Principais

- **Filtragem Inteligente**: Ignora automaticamente números, páginas, SFX e outros marcadores
- **Atalhos de Teclado**: Pressione **B + A** para avançar e gerar texto automaticamente
- **Posicionamento via Mouse**: O texto é colocado exatamente onde seu mouse está
- **Gerenciamento de Estilos**: Crie e salve estilos personalizados (fonte, tamanho)
- **Preview em Tempo Real**: Visualize todas as linhas processadas com scroll automático
- **Persistência**: Seus estilos e configurações são salvos automaticamente
- **Interface Pro**: Design moderno, responsivo e otimizado para o painel do Photopea

## 📖 Como Usar

### 1. Colar Texto
Cole seu script na área de texto. A extensão filtrará automaticamente linhas que:
- São apenas números (1, 2, 3, etc.)
- Começam com números (1. Texto, 2- Fala, etc.)
- Começam com os termos configurados (SFX, Page, etc.)

### 2. Selecionar Estilo
Escolha um estilo no dropdown. Se nenhum estilo existir, crie um novo clicando em 🎨.

### 3. Navegar
- Use as setas **⬅️** e **➡️** para navegar
- Clique diretamente em qualquer linha no preview
- Ou use o atalho **B + A** para avançar automaticamente

### 4. Gerar
Clique em **GERAR TEXTO** ou use o atalho **B + A**. O texto será colocado no Photopea onde seu mouse está.

## ⌨️ Atalhos de Teclado

| Atalho | Ação |
|--------|------|
| **B + A** | Avança para próxima linha e gera texto automaticamente |
| **⬅️** | Volta para linha anterior |
| **➡️** | Avança para próxima linha |

## 🎨 Criando Estilos

1. Clique no ícone 🎨
2. Digite o nome do estilo (ex: "Fala Normal", "Grito")
3. Digite o nome PostScript da fonte (ex: `ArialMT`, `TimesNewRomanPSMT`)
4. Configure o tamanho em pixels
5. Clique em "Salvar Estilo"

### Fontes Recomendadas

- **Arial**: `ArialMT`, `Arial-BoldMT`, `Arial-ItalicMT`, `Arial-BoldItalicMT`
- **Times New Roman**: `TimesNewRomanPSMT`, `TimesNewRomanPS-BoldMT`
- **Verdana**: `Verdana`, `Verdana-Bold`, `Verdana-Italic`
- **Courier**: `CourierNewPSMT`, `CourierNewPS-BoldMT`

## ⚙️ Configurando Filtros

Clique em ⚙️ para editar a lista de termos que devem ser ignorados. Cada termo em uma linha separada.

**Exemplo padrão:**
```
SFX
Page
---
P1
P2
```

Qualquer linha que comece com esses termos (case-insensitive) será ignorada, assim como linhas que são apenas números.

## 🖱️ Posicionamento de Texto

O texto é posicionado automaticamente onde seu mouse está no Photopea. Isso permite colocar cada texto exatamente onde você quer, sem precisar mover manualmente.

## 💾 Dados Salvos

Todos os dados são armazenados localmente no navegador:
- ✅ Estilos criados
- ✅ Filtros personalizados
- ✅ Último estilo selecionado

## 🔧 Troubleshooting

**Problema**: Fonte não está sendo aplicada
- **Solução**: Verifique o nome PostScript exato da fonte no Photopea. Use a aba de fontes para copiar o nome correto.

**Problema**: Linhas que deveriam ser ignoradas não estão sendo
- **Solução**: Verifique se o termo está exatamente como aparece no texto. A filtragem é case-insensitive, mas precisa do termo correto.

**Problema**: Texto não aparece onde o mouse está
- **Solução**: Certifique-se de que o Photopea está em foco e que há um documento aberto.

---

**TyperTools Pro** - Desenvolvido para máxima produtividade ⚡
