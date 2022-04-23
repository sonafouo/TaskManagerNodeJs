const EventEmitter = require('events');
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
const client = new EventEmitter();
const server = require('./server')(client);
server.on('response', (resp) => {
	// process.stdout.write('\u001B[2J\u001B[0;0f');
	console.log(`response: ${resp}`);
	// process.stdout.write(resp);
	// process.stdout.write('\n\n');
});
let command, args;
rl.on('line', (input) => {
	[command, ...args] = input.split(' ');
	// console.log(`command: ${command}`);
	// console.log(`args: ${args}`);

	// command = input.split(' ')[0];
	// args = input.split(' ').slice(1);
	client.emit('command', command, args);
	//client.emit('command', input);
	console.log('input:', input);
	client.emit('command', input);
});
