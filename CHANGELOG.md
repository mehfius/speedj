# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/lang/en/).

## [1.0.1] - 2024-01-01

### Adicionado
- Arquivo `CHANGELOG.md` para documentar as mudanças do projeto
- Estrutura de diretórios organizada seguindo boas práticas de desenvolvimento

### Alterado
- Movido o arquivo principal `speedj.js` para a pasta `src/`
- Atualizados os caminhos de referência nos arquivos de documentação e exemplos

### Corrigido
- Links de referência no README.md e exemplos para apontar para o novo caminho do arquivo principal 

## [1.0.2] - 2024-01-01

### Changed
- Renamed example files to be more descriptive:
  - `exemplo.js` → `speedj-example.js`
  - `exemplo.css` → `speedj-example.css`
  - `exemplo.html` → `speedj-example.html`
- Updated references in documentation and example files 

## [1.0.3] - 2024-01-01

### Changed
- Updated URL normalization to use dynamic base URL detection
- Modified script loading path to work both locally and on GitHub Pages
- Improved error handling for URL normalization

### Fixed
- Corrected script path in example HTML files
- Resolved 404 errors when accessing examples through GitHub Pages 

## [1.0.4] - 2024-01-01

### Adicionado
- Exibição da versão da biblioteca no console quando em ambiente de desenvolvimento

### Alterado
- Atualizada versão da biblioteca para 1.0.4 

## [1.0.5] - 2024-01-01

### Changed
- Updated CDN URL to use fastly.jsdelivr.net instead of cdn.jsdelivr.net for better cache control
- Added timestamp parameter to CDN URL to prevent caching issues during development

### Fixed
- Resolved jsDelivr caching issues that prevented library updates from being reflected
- Improved cache busting mechanism for development environment 

## [1.0.6] - 2024-01-01

### Changed
- Updated cache busting parameter from `v` to `cache_bust` for better clarity
- Simplified development environment console message
- Removed unnecessary console.log statements

### Fixed
- Corrected template literal in development environment message
- Improved URL handling for cache busting 