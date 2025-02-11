const crypto = require('crypto');

const cfg = {
	port: 9090,
	https: true,
	get baseUrl() {
		return 'https://front.santeclick.staging-pharmanity.fr:' + this.port;
	},
	get client() {
		return {
			clientId: '000000',
			clientSecret: '999999',
			accessTokenUri: 'https://santeclick.staging-pharmanity.fr/token',
			authorizationUri: 'https://santeclick.staging-pharmanity.fr/authorize',
			redirectUri: this.baseUrl + this.paths.authFlowCallback,
			scopes: ['read'],
			state: crypto.randomBytes(10).toString('hex'),
		};
	},
	paths: {
		authFlowStart: '/oauth-client/auth',
		authFlowCallback: '/oauth-client/auth/callback',
	},
};

module.exports = cfg;
