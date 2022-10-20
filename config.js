const crypto = require('crypto');

const cfg = {
	port: 9090,
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
		};
	},
	paths: {
		authFlowStart: '/oauth-client/auth',
		authFlowCallback: '/oauth-client/auth/callback',
	},
};

module.exports = cfg;
