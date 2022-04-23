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
	console.log(resp);
	// process.stdout.write(resp);
	// process.stdout.write('\n\n');
});
let command,
	tasks = [];
rl.on('line', (input) => {
	[command, ...task] = input.split(' ');
	// console.log(`command: ${command}`);
	// console.log(`tasks: ${tasks}`);

	// command = input.split(' ')[0];
	// tasks = input.split(' ').slice(1);
	client.emit('command', command, tasks);
	client.emit('command', input);
});
