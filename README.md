# Speedj

Uma biblioteca JavaScript para carregar dinamicamente arquivos JS e CSS, com suporte para ambientes de desenvolvimento e produção.

## Instalação

Inclua a biblioteca diretamente no seu HTML:

```html
<script 
  src="https://speedj.mehfi.us/speedj.js" 
  data-production-domain="meudominio.com">
</script>
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
- **Desenvolvimento:** Qualquer domínio diferente do configurado como produção
- **Produção:** Domínio configurado pelo usuário

### Limpeza Automática de Cache
Em ambiente de desenvolvimento, a biblioteca remove automaticamente versões antigas de scripts e estilos ao carregar novos recursos.

### Normalização de URLs
- **Produção:** `script.js` → `https://meudominio.com/script.js`
- **Desenvolvimento:** `script.js` → `http://[host-atual]/script.js?v=123456789`

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

## Configuração

### Definir Domínio de Produção
Você pode configurar o domínio de produção de duas maneiras:

1. Via atributo no script:
```html
<script 
  src="https://speedj.mehfi.us/speedj.js" 
  data-production-domain="meudominio.com">
</script>
```

2. Via JavaScript:
```javascript
// Configura o domínio de produção
speedj.setConfig({ productionDomain: 'meudominio.com' });
```

### Benefícios
- **Simplicidade:** Apenas o domínio de produção precisa ser configurado.
- **Flexibilidade:** Qualquer domínio diferente do configurado é automaticamente considerado desenvolvimento.
- **Manutenção:** Centraliza a lógica de verificação de ambiente em um único lugar.

Com essa abordagem, a biblioteca se torna mais adaptável e fácil de usar em diferentes cenários. 🚀

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE). 