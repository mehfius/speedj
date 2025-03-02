const speedj = async function(url) {
  try {
    url = normalizeUrl(url);
    return new Promise((resolve, reject) => {
      const ext = getFileExtension(url);

      switch (ext) {
        case 'js':
          loadScript(url, resolve, reject);
          break;
        case 'css':
          loadStyle(url, resolve, reject);
          break;
        default:
          reject(`Tipo de arquivo não suportado: ${ext}`);
      }
    });
  } catch (error) {
    return Promise.reject(`Erro ao normalizar a URL: ${error.message}`);
  }
};

function isProduction() {
  const host = window.location.hostname;
  const configDomain = speedj.config.productionDomain;
  
  if (!configDomain) return false;
  
  // Remove porta do domínio configurado (se houver)
  const cleanConfigDomain = configDomain.split(':')[0];
  // Remove porta do host atual
  const cleanHost = host.split(':')[0];
  
  return cleanHost === cleanConfigDomain;
}

function normalizeUrl(url) {
  // Verifica se a URL já é absoluta (HTTP ou HTTPS)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url; // Retorna a URL sem modificações
  }

  // URLs relativas: normaliza para o ambiente correto
  const fullHost = window.location.host; // Inclui a porta se houver
  if (isProduction()) {
    return 'https://' + fullHost + '/' + url;
  } else {
    return 'http://' + fullHost + '/' + url + '?v=' + new Date().getTime();
  }
}

function getFileExtension(url) {
  return url.split('?')[0].split('.').pop().toLowerCase();
}

function loadScript(url, resolve, reject) {
  const baseUrl = url.split('?')[0];
  const previousScripts = document.querySelectorAll(`script[src^="${baseUrl}"]`);

  const script = document.createElement('script');
  script.src = url;
  script.onload = () => {
    setTimeout(() => {
      // Remove scripts antigos apenas em desenvolvimento
      if (!isProduction()) {
        previousScripts.forEach(s => s.remove());
      }
      resolve();
    }, 0);
  };
  script.onerror = () => reject(`Erro ao carregar script: ${url}`);
  document.head.appendChild(script);
}

function loadStyle(url, resolve, reject) {
  const baseUrl = url.split('?')[0];
  const previousLinks = document.querySelectorAll(`link[rel="stylesheet"][href^="${baseUrl}"]`);

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  link.onload = () => {
    setTimeout(() => {
      // Remove estilos antigos apenas em desenvolvimento
      if (!isProduction()) {
        previousLinks.forEach(s => s.remove());
      }
      resolve();
    }, 0);
  };
  link.onerror = () => reject(`Erro ao carregar estilo: ${url}`);
  document.head.appendChild(link);
}

// Versão da biblioteca
speedj.version = '1.0.0';

// Carrega múltiplos arquivos
speedj.all = function(urls) {
  return Promise.all(urls.map(url => speedj(url)));
};

// Configurações globais
speedj.config = {
  productionDomain: null
};

// Verifica se há configuração no script de carregamento
const scriptElement = document.currentScript;
if (scriptElement) {
  const prodDomain = scriptElement.getAttribute('data-production-domain');
  if (prodDomain) {
    speedj.config.productionDomain = prodDomain;
  } else {
    console.error('%cError: The "data-production-domain" attribute is not set. Please configure the production domain.', 'color: red');
  }
}

// Exibe mensagem apenas em desenvolvimento
if (!isProduction()) {
  console.log('%cRunning in development environment', 'color: blue');
}
