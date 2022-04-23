const EventEmitter = require('events');
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
const client = new EventEmitter();
const server = require('./server')(client);
server.on('response', (resp) => {
	process.stdout.write('\u001B[2J\u001B[0;0f');

	console.log(`response: ${resp}`);
	process.stdout.write(resp);
});
rl.on('line', (input) => {
	//client.emit('command', input);
	console.log('input:', input);
	client.emit('command', input);
});
