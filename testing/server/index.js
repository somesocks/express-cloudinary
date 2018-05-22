const path = require('path');
const http = require('http');
const express = require('express');

const CloudinaryMiddleware = require('../../dist/CloudinaryMiddleware');

const CloudinaryConfig = require('../../cloudinary-secrets');

const cloudinaryMiddlewareInstance = CloudinaryMiddleware({ cloudinary: CloudinaryConfig });

const app = express();

app.use(cloudinaryMiddlewareInstance);
app.use('/images', express.static(path.join(__dirname, '/images')));

const server = http.createServer(app);

server.listen(3000, () => {
	console.log('server listening on 3000'); // eslint-disable-line no-console
});

module.exports = app;
