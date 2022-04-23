const EventEmitter = require('events');
class Server extends EventEmitter {
	constructor(client) {
		super();
		this.tasks = {};
		this.taskId = 1;
		process.nextTick(() => {
			// To make sure the client is ready
			this.emit('response', 'Welcome to the server!');
			this.emit('response', 'Type help to see available commands.');
		});
		client.on('command', (command, ...tasks) => {
			console.log(`Command: ${command} `);
			// help, add, ls, delete
			switch (command) {
				case 'help':
					this.help();
					break;
				case 'add':
					this.add(tasks);
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
	tasksString() {
		// let tasksString = '';
		// for (let task in this.tasks) {
		//   tasksString += `${task}: ${this.tasks[task]}\n`;
		// }
		// return tasksString;

		return Object.keys(this.tasks)
			.map((key) => {
				return `${key}: ${this.tasks[key]}`;
			})
			.join('\n');
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
	add(tasks) {
		this.tasks[this.taskId] = tasks.join(' ');
		this.emit('response', `Added task ${this.taskId}: ${tasks.join(' ')}`);
		this.taskId++;
	}
	ls() {
		this.emit('response', `Tasks:\n${this.tasksString()}`);
	}
	delete(tasks) {
		delete this.tasks[tasks];
		this.emit('response', `Deleted task ${tasks[0]}`);
	}
}
module.exports = (client) => new Server(client);
