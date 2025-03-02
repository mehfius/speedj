# Speedj

Uma biblioteca JavaScript para carregar dinamicamente arquivos JS e CSS, com suporte para ambientes de desenvolvimento e produção.

## Instalação

Inclua a biblioteca diretamente no seu HTML:

```html
<script src="https://speedj.mehfi.us/speedj.js"></script>
```

## Uso Básico

### Carregar um Script
```javascript
speedj('script.js')
  .then(() => console.log('Script carregado!'))
  .catch(err => console.error(err));
```

### Carregar um Estilo
```javascript
speedj('style.css')
  .then(() => console.log('Estilo carregado!'))
  .catch(err => console.error(err));
```

### Carregar Múltiplos Arquivos
```javascript
speedj.all(['script1.js', 'script2.js', 'style.css'])
  .then(() => console.log('Todos os arquivos carregados!'));
```

## Funcionalidades

### Detecção Automática de Ambiente
- **Desenvolvimento:** `localhost` ou `127.0.0.1`.
- **Produção:** Qualquer outro domínio.

### Limpeza Automática de Cache
Em ambiente de desenvolvimento, a biblioteca remove automaticamente versões antigas de scripts e estilos ao carregar novos recursos.

### Normalização de URLs
- **Produção:** `script.js` → `https://meudominio.com/script.js`.
- **Desenvolvimento:** `script.js` → `http://127.0.0.1/script.js?v=123456789`.

## Métodos Adicionais

### `speedj.all(urls)`
Carrega múltiplos arquivos simultaneamente.

```javascript
speedj.all(['script1.js', 'script2.js', 'style.css'])
  .then(() => console.log('Todos os arquivos carregados!'));
```

### `speedj.clearCache()`
Limpa o cache de scripts e styles carregados dinamicamente. **Funciona apenas em ambiente de desenvolvimento**.

```javascript
speedj.clearCache();
```

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE). 