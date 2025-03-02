const speedj = async function(url) {
  // Normaliza a URL
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
};

function normalizeUrl(url) {
  if (!url.startsWith('https')) {
    if (window.location.href.includes("mehfi.us")) {
      return 'https://mehfi.us/' + url;
    } else {
      return 'http://127.0.0.1:3001/' + url + '?v=' + new Date().getTime();
    }
  }
  return url;
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
      previousScripts.forEach(s => s.remove());
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
      previousLinks.forEach(s => s.remove());
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
