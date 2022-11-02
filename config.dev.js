const crypto = require('crypto');

const cfg = {
	port: 9090,
	https: false,
	get baseUrl() {
		return 'http://localhost:' + this.port;
	},
	get client() {
		return {
			clientId: '000000',
			clientSecret: '999999',
			accessTokenUri: 'http://192.168.49.2:3009/token', // url santeclick go
			authorizationUri: 'http://localhost:8081/authorize', // url santeclick go
			redirectUri: this.baseUrl + this.paths.authFlowCallback, // url expo ou client callback
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
