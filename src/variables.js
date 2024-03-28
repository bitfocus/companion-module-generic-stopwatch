module.exports = {
	initVariables: function () {
		let self = this;
		let variables = []

		variables.push({ variableId: 'hmsms', name: 'Hours, Minutes, Seconds, Milliseconds' });

		variables.push({ variableId: 'hours', name: 'Hours' });
		variables.push({ variableId: 'minutes', name: 'Minutes' });
		variables.push({ variableId: 'seconds', name: 'Seconds' });
		variables.push({ variableId: 'milliseconds', name: 'Milliseconds' });

		variables.push({ variableId: 'isRunning', name: 'Is Running' });
		
		self.setVariableDefinitions(variables);

		self.watch = 0;
		self.checkVariables();
	},

	checkVariables: function () {
		let self = this;

		//convert self.watch milliseconds into hours, minutes, seconds, milliseconds
		let hours = Math.floor(self.watch / 3600000);
		let minutes = Math.floor((self.watch % 3600000) / 60000);
		let seconds = Math.ceil((self.watch % 60000) / 1000);
		let milliseconds = Math.ceil(self.watch % 1000);

		//set variables
		let variableObj = {};
		variableObj.hmsms = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds}`;
		variableObj.hours = `${hours}`;
		variableObj.minutes = `${minutes.toString().padStart(2, '0')}`;
		variableObj.seconds = `${seconds.toString().padStart(2, '0')}`;
		variableObj.milliseconds = `${milliseconds}`;

		if (self.timer) {
			variableObj.isRunning = 'True';
		} else {
			variableObj.isRunning = 'False';
		}

		self.setVariableValues(variableObj);
	}
}