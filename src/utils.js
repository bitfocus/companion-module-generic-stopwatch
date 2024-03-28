module.exports = {
	startWatch: function (dir) {
		let self = this;

		self.clearTimer();

		self.startingValue = new Date().getTime(); //store the current time in milliseconds

		self.timer = setInterval(() => {
			let currentTime = new Date().getTime();

			let diff = currentTime - self.startingValue;

			if (dir === '-') {
				self.watch -= diff;
				if (self.watch <= 0) {
					self.watch = 0;
					self.stopWatch();
				}
			} else {
				self.watch += diff;
			}

			self.startingValue = currentTime;

			self.checkVariables();
		}, self.amount);

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
		self.checkFeedbacks();
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