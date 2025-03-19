// ╔══════════════════════╗
// ║  Speedj v1.0.5       ║
// ║  Production Ready    ║
// ║  MIT Licensed        ║
// ╚══════════════════════╝

const speedj = (function() {
	// Private functions
	function is_production() {
		return window.location.protocol === 'https:';
	}

	function get_file_extension(url) {
		return url.split('?')[0].split('.').pop().toLowerCase();
	}

	function load_script(url, resolve, reject) {
		const base_url = url.split('?')[0];
		const previous_scripts = document.querySelectorAll(`script[src^="${base_url}"]`);

		if (!is_production()) {
			const separator = url.includes('?') ? '&' : '?';
			url = `${url}${separator}cache_bust=${new Date().getTime()}`;
		}

		const script = document.createElement('script');
		script.src = url;
		script.onload = () => {
			setTimeout(() => {
				previous_scripts.forEach(s => s.remove());
				resolve();
			}, 0);
		};
		script.onerror = () => reject(`Error loading script: ${url}`);
		document.head.appendChild(script);
	}

	function load_style(url, resolve, reject) {
		const base_url = url.split('?')[0];
		const previous_links = document.querySelectorAll(`link[rel="stylesheet"][href^="${base_url}"]`);

		if (!is_production()) {
			const separator = url.includes('?') ? '&' : '?';
			url = `${url}${separator}cache_bust=${new Date().getTime()}`;
		}

		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = url;
		link.onload = () => {
			setTimeout(() => {
				previous_links.forEach(s => s.remove());
				resolve();
			}, 0);
		};
		link.onerror = () => reject(`Error loading style: ${url}`);
		document.head.appendChild(link);
	}

	// Public API
	const speedj = async function (url) {
		try {
			return new Promise((resolve, reject) => {
				const ext = get_file_extension(url);

				switch (ext) {
					case 'js':
						load_script(url, resolve, reject);
						break;
					case 'css':
						load_style(url, resolve, reject);
						break;
					default:
						reject(`Unsupported file type: ${ext}`);
				}
			});
		} catch (error) {
			return Promise.reject(`Error loading resource: ${error.message}`);
		}
	};

	speedj.version = '1.0.5';

	speedj.all = function (urls) {
		return Promise.all(urls.map(url => speedj(url)));
	};

	speedj.config = {
		production_domain: null
	};

	if (!is_production()) {
		console.log(`%c Speedj v${speedj.version} - Running in development environment `, 'color: white; background: green; font-weight: bold');
	}

	return speedj;
})();
