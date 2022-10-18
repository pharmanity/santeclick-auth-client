const crypto = require('crypto');

const cfg = {
    port: 9090,
    get baseUrl() {
        return 'http://localhost:' + this.port
    },
    get client(){
        return {
            clientId: '000000',
            clientSecret: '999999',
            accessTokenUri: 'http://192.168.49.2:3009/token',
            authorizationUri: 'http://192.168.49.2:3009/authorize',
            redirectUri: this.baseUrl + this.paths.authFlowCallback,
            scopes: ['read'],
            state: crypto.randomBytes(16).toString('hex')
        }
    },
    paths: {
        authFlowStart: '/oauth-client/auth',
        authFlowCallback: '/oauth-client/auth/callback'
    }
};

module.exports = cfg;
