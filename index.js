const express = require('express');
const https = require('https');
const http = require('http');
const util = require('util');
const fs = require('fs');
var cors = require('cors');
const ClientOAuth2 = require('client-oauth2');
const cfg = require('./config.dev');
const app = express();
var corsOptions = {
	origin: cfg.baseUrl,
	optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
const client = new ClientOAuth2(cfg.client);

const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');
let server = http.createServer(app);
if (cfg.https) {
	server = https.createServer({ key: key, cert: cert }, app);
}
app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', function (req, res) {
	//page du site client où sera present un button de connexion
	res.render('index', { cfg: cfg });
});

app.get(cfg.paths.authFlowStart, function (req, res) {
	var uri = client.code.getUri();
	console.log(uri);
	res.redirect(uri);
});

app.get(cfg.paths.authFlowCallback, function (req, res) {
	console.log(cfg.paths.authFlowCallback, req.originalUrl);

	client.code
		.getToken(req.originalUrl)
		.then(function (user) {
			console.log(user);
			return res.render('token', { user: util.inspect(user) });
		})
		.catch(function (error) {
			console.log(error);
			return res.render('error', { error: error });
		});
});

app.get('/login', function (req, res) {
	return res.render('login');
});

server.listen(cfg.port, function () {
	'use strict';
	console.log('\n');
	console.log('+--------------------------');
	console.log(' PID %d', process.pid);
	console.log(' Listening on port', cfg.port);
	console.log('+--------------------------');
});
