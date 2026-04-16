# TyperTools Master - Photopea Edition

A versão definitiva e mais avançada da extensão TyperTools. Projetada para máxima produtividade com interface intuitiva, atalhos poderosos e catálogo completo de fontes.

## ✨ Principais Funcionalidades

- **Filtragem Inteligente**: Ignora automaticamente números, páginas, SFX e marcadores customizáveis
- **Atalhos de Teclado Poderosos**: B+A para fluxo contínuo, Ctrl+Enter para gerar, setas para navegar
- **Catálogo de Fontes Interativo**: 📚 Visualize todas as fontes disponíveis no Photopea com um clique
- **Posicionamento via Mouse**: Texto é colocado exatamente onde seu mouse está
- **Preview Completo**: Veja todas as linhas processadas com scroll fluido
- **Gerenciamento de Estilos**: Crie, edite e delete estilos personalizados
- **Persistência Automática**: Todos os dados são salvos localmente

## 🚀 Como Usar

### 1. Colar Texto
Cole seu script na área de texto. A extensão filtrará automaticamente:
- Linhas que são apenas números (1, 2, 3)
- Linhas que começam com números (1. Texto, 2- Fala)
- Linhas que começam com termos configurados (SFX, Page, etc.)

### 2. Selecionar ou Criar Estilo
- Escolha um estilo existente no dropdown
- Ou clique em 🎨 para criar um novo
- Use 📚 para ver o catálogo de fontes

### 3. Navegar e Gerar
- Use **B + A** para avançar e gerar automaticamente
- Ou use as setas ⬅️ / ➡️ para navegar manualmente
- Clique em qualquer linha no preview para ir direto para ela
- Clique em **GERAR TEXTO** ou use **Ctrl + Enter**

## ⌨️ Atalhos de Teclado

| Atalho | Ação |
|--------|------|
| **B + A** | Avança para próxima linha e gera texto (fluxo contínuo) |
| **Ctrl + Enter** | Gera texto na linha atual |
| **Seta Direita (→)** | Próxima linha |
| **Seta Esquerda (←)** | Linha anterior |

## 📚 Catálogo de Fontes

Clique no botão 📚 para abrir o catálogo completo de fontes. Você verá:
- Nome legível da fonte
- Nome PostScript (usado pelo Photopea)
- Categoria (Sans-Serif, Serif, Monospace, etc.)
- Botão "Usar" para seleção rápida

As fontes disponíveis incluem:
- **Arial** (Regular, Bold, Italic, Bold Italic)
- **Times New Roman** (Regular, Bold, Italic, Bold Italic)
- **Verdana** (Regular, Bold, Italic, Bold Italic)
- **Courier New** (Regular, Bold, Italic, Bold Italic)
- **Helvetica** (Regular, Bold, Oblique, Bold Oblique)
- **Georgia** (Regular, Bold, Italic, Bold Italic)
- **Garamond** (Regular, Bold, Italic, Bold Italic)
- **Palatino** (Regular, Bold, Italic, Bold Italic)
- **Trebuchet MS** (Regular, Bold, Italic, Bold Italic)
- **Impact**
- **Comic Sans MS** (Regular, Bold)

## 🎨 Criando Estilos

1. Clique em 🎨 (Gerenciar Estilos)
2. Digite o nome do estilo (ex: "Fala Normal", "Grito")
3. Digite o nome PostScript da fonte ou clique em 📚 para escolher
4. Configure o tamanho em pixels
5. Clique em "Salvar Estilo"

## ⚙️ Configurando Filtros

Clique em ⚙️ para editar a lista de termos ignorados. Cada termo em uma linha separada.

**Exemplo padrão:**
```
SFX
Page
---
P1
P2
```

Qualquer linha que comece com esses termos (case-insensitive) será ignorada.

## 🖱️ Posicionamento de Texto

O texto é posicionado automaticamente onde seu mouse está no Photopea. Fluxo de trabalho recomendado:

1. Coloque seu mouse no balão/área onde quer o texto
2. Pressione **B + A** para avançar e gerar
3. Repita

## 💾 Dados Salvos

Todos os dados são armazenados localmente no navegador:
- ✅ Estilos criados
- ✅ Filtros personalizados
- ✅ Último estilo selecionado

## 🔧 Troubleshooting

**Problema**: Atalho B+A não funciona
- **Solução**: Certifique-se de que o Photopea está em foco. Alguns navegadores podem bloquear certos atalhos.

**Problema**: Fonte não está sendo aplicada
- **Solução**: Use o catálogo de fontes (📚) para copiar o nome PostScript correto.

**Problema**: Texto não aparece onde o mouse está
- **Solução**: Certifique-se de que o Photopea está em foco e há um documento aberto.

**Problema**: Linhas que deveriam ser ignoradas não estão sendo
- **Solução**: Verifique se o termo está exatamente como aparece no texto (a filtragem é case-insensitive).

---

**TyperTools Master** - Desenvolvido para máxima produtividade ⚡
