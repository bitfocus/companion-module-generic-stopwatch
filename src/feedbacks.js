const { combineRgb } = require('@companion-module/base')

module.exports = {
	initFeedbacks: function () {
		let self = this
		let feedbacks = {}

		const foregroundColor = combineRgb(255, 255, 255) // White
		const backgroundColorRed = combineRgb(255, 0, 0) // Red

		feedbacks.isRunning = {
			type: 'boolean',
			name: 'Stopwatch is running',
			description: 'Change colors of the bank if the stopwatch is running',
			defaultStyle: {
				color: foregroundColor,
				bgcolor: backgroundColorRed,
			},
			options: [
				{
                    type: 'dropdown',
                    label: 'Direction',
                    id: 'dir',
                    default: 'any',
                    choices: [
                        { id: undefined, label: 'Any' },
                        { id: '+', label: 'Normal' },
                        { id: '-', label: 'Reverse' },
                    ],
                },
			],
			callback: function (feedback, bank) {
				if (feedback.options.dir == undefined && self.timer) {
					return true;
				}
				else if (feedback.options.dir === '+' && self.timer && !(typeof self.targetTime === 'number' && !isNaN(self.targetTime))) {
					return true;
				}
				else if (feedback.options.dir === '-' && self.timer && typeof self.targetTime === 'number' && !isNaN(self.targetTime)) {
					return true;
				}

				return false
			},
		}

		self.setFeedbackDefinitions(feedbacks);
	}
}