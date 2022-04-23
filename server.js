const EventEmitter = require('events');
class Server extends EventEmitter {
	constructor(client) {
		super();
		process.nextTick(() => {
			// To make sure the client is ready
			this.emit('response', 'Welcome to the server!');
			this.emit('response', 'Type help to see available commands.');
		});
		client.on('command', (command, ...args) => {
			console.log(`Command: ${command} `);
			// help, add, ls, delete
			switch (command) {
				case 'help':
					this.help();
					break;
				case 'add':
					this.add(args);
					break;
				case 'ls':
					this.ls();
					break;
				case 'delete':
					this.delete();
					break;
				default:
					console.log('Command not found');
			}
		});
	}
	help() {
		this.emit(
			'response',
			`Available commands: 
      1- help,
      2- add task,
      3- ls,
      4- delete task`,
		);
	}
	add(args) {
		this.emit('response', args.join(' '));
	}
	ls() {
		this.emit('response', 'ls...');
	}
	delete() {
		this.emit('response', 'delete...');
	}
}
module.exports = (client) => new Server(client);
