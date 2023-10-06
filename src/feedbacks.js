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
			options: [],
			callback: function (feedback, bank) {
				if (self.timer) {
					return true
				}

				return false
			},
		}

		self.setFeedbackDefinitions(feedbacks);
	}
}