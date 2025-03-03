const speedj = (function() {
	// Private functions
	function isProduction() {
		const host = window.location.hostname;
		const configDomain = speedj.config.productionDomain;

		if (!configDomain) return false;

		const cleanConfigDomain = configDomain.split(':')[0];

		const cleanHost = host.split(':')[0];

		return cleanHost === cleanConfigDomain;
	}

	function normalizeUrl(url) {
		if (url.startsWith('http://') || url.startsWith('https://')) {
			return url;
		}

		const protocol = window.location.protocol;
		const host = window.location.host;
		const baseUrl = `${protocol}//${host}`;

		if (isProduction()) {
			return `${baseUrl}/${url}`;
		} else {
			return `${baseUrl}/${url}?v=${new Date().getTime()}`;
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
				previousScripts.forEach(s => s.remove());
				resolve();
			}, 0);
		};
		script.onerror = () => reject(`Error loading script: ${url}`);
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
		link.onerror = () => reject(`Error loading style: ${url}`);
		document.head.appendChild(link);
	}

	// Public API
	const speedj = async function (url) {
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
						reject(`Unsupported file type: ${ext}`);
				}
			});
		} catch (error) {
			return Promise.reject(`Error normalizing URL: ${error.message}`);
		}
	};

	speedj.version = '1.0.5';

	speedj.all = function (urls) {
		return Promise.all(urls.map(url => speedj(url)));
	};

	speedj.config = {
		productionDomain: null
	};

	const scriptElement = document.currentScript;
	if (scriptElement) {
		const prodDomain = scriptElement.getAttribute('data-production-domain');
		if (prodDomain) {
			speedj.config.productionDomain = prodDomain;
		} else {
			console.error('%c Error: The "data-production-domain" attribute is not set. Please configure the production domain. ', 'color: red; background: black');
		}
	}
	if (!isProduction()) {
		console.log('%c Running in development environment ', 'color: yellow; background: black');
		console.log(`%c Speedj v${speedj.version} `, 'color: white; background: green; font-weight: bold');
	}

	return speedj;
})();
