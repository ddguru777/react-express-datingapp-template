require('dotenv').config({ path: '.env.development' });
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const socketInit = require('./socket');
const database = require('./postgresql');

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 8080;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

/* Better stack traces */
process.on('unhandledRejection', r => console.log(r));

const facebook = require('./facebook/connect')(app);
app.use(express.static(publicPath));

app.get('*', (req, res) => {
	res.sendFile(path.join(publicPath, 'index.html'));
});

io.on('connection', socketInit);

server.listen(port, () => {
	if (port == 8080) {
		console.log('URL: http://localhost:8080/')
	}
	console.log(`Server is up on ${port}`);
});
