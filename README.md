# Speedj

Speedj is a powerful and flexible library that simplifies dynamic resource loading, supports different environments, and makes configuration and usage easy. Its features are designed to improve performance and developer experience, making it an excellent choice for projects that require dynamic loading of scripts and styles.

## About the Project

**Developer:** Matheus Ferraz 
**GitHub Username:** @mehfius 
**Repository:** speedj  
**Production Domain:** https://github.com/mehfius/speedj

## Installation

Include the library directly in your HTML:

```html
<script 
  src="/speedj/src/speedj.js" 
  data-production-domain="exampledomain.com">
</script>
```

## Basic Usage

### Load a Script
```javascript
speedj('script.js')
  .then(() => console.log('Script loaded!'))
  .catch(err => console.error(err));
```

### Load a Style
```javascript
speedj('style.css')
  .then(() => console.log('Style loaded!'))
  .catch(err => console.error(err));
```

### Load Multiple Files
```javascript
speedj.all(['script1.js', 'script2.js', 'style.css'])
  .then(() => console.log('All files loaded!'));
```

## Features

### Automatic Environment Detection
- **Development:** Any domain different from the configured production domain
- **Production:** User-configured domain

### Automatic Cache Cleanup
In development environment, the library automatically removes old versions of scripts and styles when loading new resources.

### URL Normalization
- **Production:** `script.js` → `https://mydomain.com/script.js`
- **Development:** `script.js` → `http://[current-host]/script.js?v=123456789`

### Dynamic URL Handling
- Automatically detects and uses the correct base URL
- Works seamlessly in both local and production environments
- Handles relative paths efficiently

## Additional Methods

### `speedj.all(urls)`
Loads multiple files simultaneously.

```javascript
speedj.all(['script1.js', 'script2.js', 'style.css'])
  .then(() => console.log('All files loaded!'));
```

## Configuration

### Set Production Domain
You can configure the production domain via script attribute:

```html
<script 
  src="https://speedj.mehfi.us/speedj.js" 
  data-production-domain="mydomain.com">
</script>
```

With this approach, the library becomes more adaptable and easy to use in different scenarios. 🚀

## License

This project is licensed under the [MIT License](LICENSE).

## Examples

See the live example at: [https://mehfius.github.io/speedj/](https://mehfius.github.io/speedj/)

## Documentation

For more details, see:
- [CHANGELOG.md](CHANGELOG.md) - Change history
- [Examples](docs/examples/) - Usage examples 