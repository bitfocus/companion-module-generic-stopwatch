module.exports = {
	initActions: function () {
		let self = this;
		let actions = {};

		actions.start = {
			name: 'Start',
			options: [],
			callback: async function (action) {
				self.startWatch('+');
			}
		}

		actions.startReverse = {
			name: 'Start in Reverse',
			options: [],
			callback: async function (action) {
				self.startWatch('-');
			},
		}

		actions.stop = {
			name: 'Stop',
			options: [],
			callback: async function (action) {
				self.stopWatch();
			}
		}

		actions.reset = {
			name: 'Reset',
			options: [],
			callback: async function (action) {
				self.resetWatch();
			}
		}

		actions.toggle = {
			name: 'Toggle',
			options: [],
			callback: async function (action) {
				self.toggleWatch();
			}
		}

		actions.set = {
			name: 'Set',
			options: [
				{
					type: 'textinput',
					label: 'Hours',
					id: 'hours',
					default: '0',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Minutes',
					id: 'minutes',
					default: '0',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Seconds',
					id: 'seconds',
					default: '0',
					useVariables: true,
				},
			],
			callback: async function (action) {
				let opt = action.options;

				let hours = parseInt(await self.parseVariablesInString(opt.hours));
				let minutes = parseInt(await self.parseVariablesInString(opt.minutes));
				let seconds = parseInt(await self.parseVariablesInString(opt.seconds));

				self.setWatch(hours, minutes, seconds);
				if (typeof self.broadcastTime === 'function') {
					self.broadcastTime();
				}
			}
		}

		actions.add = {
			name: 'Add',
			options: [
				{
					type: 'textinput',
					label: 'Hours',
					id: 'hours',
					default: '0',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Minutes',
					id: 'minutes',
					default: '0',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Seconds',
					id: 'seconds',
					default: '0',
					useVariables: true,
				},
			],
			callback: async function (action) {
				let opt = action.options;

				let hours = parseInt(await self.parseVariablesInString(opt.hours));
				let minutes = parseInt(await self.parseVariablesInString(opt.minutes));
				let seconds = parseInt(await self.parseVariablesInString(opt.seconds));

				self.addWatch(hours, minutes, seconds);
				if (typeof self.broadcastTime === 'function') {
					self.broadcastTime();
				}
			}
		}

		actions.subtract = {
			name: 'Subtract',
			options: [
				{
					type: 'textinput',
					label: 'Hours',
					id: 'hours',
					default: '0',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Minutes',
					id: 'minutes',
					default: '0',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Seconds',
					id: 'seconds',
					default: '0',
					useVariables: true,
				},
			],
			callback: async function (action) {
				let opt = action.options;

				let hours = parseInt(await self.parseVariablesInString(opt.hours));
				let minutes = parseInt(await self.parseVariablesInString(opt.minutes));
				let seconds = parseInt(await self.parseVariablesInString(opt.seconds));

				self.subtractWatch(hours, minutes, seconds);
				if (typeof self.broadcastTime === 'function') {
					self.broadcastTime();
				}
			}
		}

		self.setActionDefinitions(actions);
	}
}