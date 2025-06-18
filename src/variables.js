module.exports = {
	initVariables: function () {
		let self = this;
		let variables = []

		variables.push({ variableId: 'hms', name: 'Hours, Minutes, Seconds' });
		variables.push({ variableId: 'hmsms', name: 'Hours, Minutes, Seconds, Milliseconds' });

		variables.push({ variableId: 'hours', name: 'Hours (HH)' });
		variables.push({ variableId: 'minutes', name: 'Minutes (MM)' });
		variables.push({ variableId: 'seconds', name: 'Seconds (SS)' });
		variables.push({ variableId: 'milliseconds', name: 'Milliseconds' });

		variables.push({ variableId: 'mmm', name: 'Minutes Only (MMM)' });
		variables.push({ variableId: 'sss', name: 'Seconds Only (SSS)' });

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
		let seconds = Math.floor((self.watch % 60000) / 1000);
		let milliseconds = self.watch % 1000;

		//calculate mmm and sss amounts
		let mmm = Math.floor(self.watch / 60000);
		let sss = Math.floor(self.watch / 1000);

		//set variables
		let variableObj = {};

		variableObj.hours = `${hours.toString().padStart(2, '0')}`;
		variableObj.minutes = `${minutes.toString().padStart(2, '0')}`;
		variableObj.seconds = `${seconds.toString().padStart(2, '0')}`;
		variableObj.milliseconds = `${milliseconds.toString().padStart(3, '0')}`;

		variableObj.hms = `${variableObj.hours}:${variableObj.minutes}:${variableObj.seconds}`;
		variableObj.hmsms = `${variableObj.hours}:${variableObj.minutes}:${variableObj.seconds}.${variableObj.milliseconds}`;

		//add mmm, sss variables
		variableObj.mmm = `${mmm.toString()}`;
		variableObj.sss = `${sss.toString()}`;

		if (self.timer) {
			variableObj.isRunning = 'True';
		} else {
			variableObj.isRunning = 'False';
		}

		self.setVariableValues(variableObj);
	}
}
