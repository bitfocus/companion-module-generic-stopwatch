module.exports = {
	startWatch: function () {
		let self = this;

		self.clearTimer();

		self.timer = setInterval(() => {
			self.watch += 50;
			self.checkVariables();
		}, 50);

		self.checkFeedbacks();
	},

	stopWatch: function () {
		let self = this;

		self.clearTimer();
	},

	resetWatch: function () {
		let self = this;

		self.clearTimer();
		self.watch = 0;
		self.checkVariables();
	},

	toggleWatch: function () {
		let self = this;

		if (self.timer) {
			self.stopWatch();
		} else {
			self.startWatch();
		}
	},

	setWatch: function (hours, minutes, seconds) {
		let self = this;

		self.clearTimer();

		self.watch = (hours * 3600000) + (minutes * 60000) + (seconds * 1000);
		self.checkVariables();
	},

	addWatch: function (hours, minutes, seconds) {
		let self = this;

		self.watch += (hours * 3600000) + (minutes * 60000) + (seconds * 1000);
		self.checkVariables();
		self.checkFeedbacks();
	},

	subtractWatch: function (hours, minutes, seconds) {
		let self = this;

		self.watch -= (hours * 3600000) + (minutes * 60000) + (seconds * 1000);
		self.checkVariables();
		self.checkFeedbacks();
	},

	clearTimer: function () {
		let self = this;

		if (self.timer) {
			clearInterval(self.timer);
			delete self.timer;
		}

		self.checkFeedbacks();
	},
}