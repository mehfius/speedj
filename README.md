## Uso Básico

```javascript
// Carregar um script
speedj('script.js')
  .then(() => console.log('Script carregado!'))
  .catch(err => console.error(err));

// Carregar um estilo
speedj('style.css')
  .then(() => console.log('Estilo carregado!'))
  .catch(err => console.error(err));

// Carregar múltiplos arquivos
speedj.all(['script1.js', 'script2.js', 'style.css'])
  .then(() => console.log('Todos os arquivos carregados!'));
```

### 5. **Testes**
```javascript:test/speedj.test.js
// ... existing code ...

describe('speedj', () => {
  it('deve carregar um script JS', (done) => {
    speedj('test.js')
      .then(() => done())
      .catch(done.fail);
  });

  it('deve carregar um arquivo CSS', (done) => {
    speedj('test.css')
      .then(() => done())
      .catch(done.fail);
  });
});
```

Essas melhorias mantêm o foco em JavaScript e CSS, enquanto tornam o código mais modular, legível e fácil de manter. A adição de métodos estáticos e documentação básica também melhora a usabilidade da biblioteca. 

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE) - veja o arquivo [LICENSE](LICENSE) para mais detalhes. 