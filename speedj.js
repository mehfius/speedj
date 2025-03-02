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
  // Considera produção se não for localhost ou 127.0.0.1
  return !(host === 'localhost' || host === '127.0.0.1');
}

function normalizeUrl(url) {
  // Verifica se a URL já é HTTPS ou HTTP
  if (url.startsWith('http://') || url.startsWith('https://')) {
    // Em produção, força HTTPS
    if (isProduction() && url.startsWith('http://')) {
      return url.replace('http://', 'https://');
    }
    return url;
  }

  // URLs relativas: normaliza para o ambiente correto
  if (isProduction()) {
    return 'https://' + window.location.hostname + '/' + url;
  } else {
    return 'http://127.0.0.1:3001/' + url + '?v=' + new Date().getTime();
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

// Limpa cache de scripts e styles
speedj.clearCache = function() {
  const scripts = document.querySelectorAll('script[src*="?v="]');
  const links = document.querySelectorAll('link[href*="?v="]');
  scripts.forEach(s => s.remove());
  links.forEach(l => l.remove());
};
