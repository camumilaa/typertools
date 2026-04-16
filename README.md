# TyperTools - Extensão para Photopea

Uma extensão poderosa para o **Photopea** que facilita a digitação de textos em imagens, ideal para typesetters, tradutores de mangá, comics e qualquer projeto que envolva adicionar texto a imagens em lote.

## 🎯 Funcionalidades

- **Processamento de Texto em Lote**: Cole múltiplas linhas de texto e processe uma por uma
- **Gerenciamento de Estilos**: Crie e salve estilos de texto personalizados (fonte, tamanho)
- **Filtros Inteligentes**: Ignore automaticamente linhas com prefixos específicos (SFX, Page, etc.)
- **Preview em Tempo Real**: Visualize as linhas processadas antes de gerar
- **Integração Photopea**: Envie textos diretamente para o Photopea com um clique
- **Armazenamento Local**: Seus estilos são salvos automaticamente no navegador
- **Interface Escura**: Design moderno e confortável para longas sessões de trabalho

## 🚀 Como Usar

### 1. Instalar a Extensão

A extensão já está integrada ao Photopea. Acesse através do menu de extensões.

### 2. Colar Texto

Cole o texto que deseja processar na área de texto principal. A extensão filtrará automaticamente as linhas baseado nas configurações de ignore.

### 3. Criar Estilos

1. Clique no botão **🎨** (Estilos)
2. Digite um nome para o estilo (ex: "Fala", "Grito")
3. Digite o nome da fonte (ex: "ArialMT", "TimesNewRomanPSMT")
4. Configure o tamanho da fonte
5. Clique em "Salvar / Atualizar Estilo"

### 4. Gerar Texto

1. Selecione um estilo no dropdown
2. Navegue pelas linhas usando o botão "Próximo"
3. Clique em "Gerar" para criar a camada de texto no Photopea

### 5. Configurar Filtros

1. Clique no botão **⚙️** (Configurações)
2. Digite os prefixos de linhas que devem ser ignoradas
3. Clique em "Salvar"

## 📝 Fontes Disponíveis

A extensão suporta as seguintes fontes do Photopea:

- **Arial**: ArialMT, Arial-BoldMT, Arial-ItalicMT, Arial-BoldItalicMT
- **Times New Roman**: TimesNewRomanPSMT, TimesNewRomanPS-BoldMT, TimesNewRomanPS-ItalicMT, TimesNewRomanPS-BoldItalicMT
- **Verdana**: Verdana, Verdana-Bold, Verdana-Italic, Verdana-BoldItalic
- **Courier New**: CourierNewPSMT, CourierNewPS-BoldMT, CourierNewPS-ItalicMT, CourierNewPS-BoldItalicMT
- **Helvetica**: Helvetica, Helvetica-Bold, Helvetica-Oblique, Helvetica-BoldOblique
- **Georgia**: Georgia, Georgia-Bold, Georgia-Italic, Georgia-BoldItalic

## 🔧 Configuração Padrão de Filtros

Por padrão, as seguintes linhas são ignoradas:

- `SFX:`, `Sfx:`, `sfx:` - Efeitos sonoros
- `##` - Comentários
- `Halaman`, `Page`, `page` - Indicadores de página
- `---`, `===` - Separadores
- `P1`, `P2` - Indicadores de personagem
- `[1]`, `Pg.`, `PAGE` - Variações de página
- `=0`, `--` - Outros marcadores

## 💾 Armazenamento de Dados

Todos os estilos criados são armazenados no **localStorage** do navegador, o que significa:

- ✅ Seus estilos persistem entre sessões
- ✅ Cada navegador tem seu próprio conjunto de estilos
- ✅ Limpar o cache do navegador apagará os estilos

## 🐛 Tratamento de Erros

A extensão inclui tratamento robusto de erros:

- Validação de entrada em todos os formulários
- Escape adequado de caracteres especiais
- Tratamento de localStorage corrompido
- Feedback visual ao usuário
- Logs de erro no console do navegador

## 📱 Compatibilidade

- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Photopea (versão atual)
- ✅ Responsivo em telas pequenas

## 🔐 Segurança

- Todos os dados são processados localmente
- Nenhuma informação é enviada para servidores externos
- Escape de caracteres especiais em scripts
- Validação de entrada em todos os campos

## 📚 Estrutura de Arquivos

```
typertools-main/
├── index.html      # Interface HTML
├── app.js          # Lógica JavaScript
├── style.css       # Estilos CSS
└── README.md       # Documentação
```

## 🎨 Melhorias Recentes

### v2.0
- ✨ Tratamento robusto de erros
- ✨ Escape adequado de strings
- ✨ Auto-atualização de preview ao colar texto
- ✨ Clique em linhas para navegar
- ✨ Feedback visual ao gerar texto
- ✨ Mais fontes disponíveis
- ✨ Melhor design da interface
- ✨ Validação de entrada aprimorada
- ✨ Documentação completa
- ✨ Acessibilidade melhorada

## 🤝 Contribuições

Para reportar bugs ou sugerir melhorias, entre em contato com o desenvolvedor.

## 📄 Licença

Consulte o arquivo de licença para mais informações.

---

**Desenvolvido com ❤️ para typesetters e tradutores**
