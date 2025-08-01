module.exports = {
	startWatch: function (dir) {
		let self = this;

		self.clearTimer();

		self.startingValue = new Date().getTime();
		if (dir === '-') {
			if (self.config && self.config['production-timer']) {
				self.watch = Math.ceil((self.watch + 1) / 1000) * 1000 - 1;
			}

			const targetTime = new Date(self.startingValue + self.watch);
			self.targetTime = targetTime.getTime();
			self.setVariableValues({
				target12_hms: targetTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }),
				target24_hms: targetTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
				isReverse: true,
			});
		} else {
			self.setVariableValues({
				target12_hms: '--:--:--',
				target24_hms: '--:--:--',
				isReverse: false,
			});
		}

		self.timer = setInterval(() => {
			let currentTime = new Date().getTime();

			let diff = currentTime - self.startingValue;

			if (dir === '-') {
				self.watch -= diff;
				if (
					(self.config && self.config['production-timer'] && self.watch < 1000) ||
					(!self.config?.['production-timer'] && self.watch <= 0)
				) {
					self.watch = 0;
					if (typeof self.broadcastTime === 'function') {
						self.broadcastTime();
					}
					self.checkVariables();
					self.stopWatch();
				}
			} else {
				self.watch += diff;
			}

			if (typeof self.broadcastTime === 'function') {
				self.broadcastTime();
			}

			self.startingValue = currentTime;

			self.checkVariables();
		}, self.precision);

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
		if (typeof self.broadcastTime === 'function') {
			self.broadcastTime();
		}
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
		if (typeof self.broadcastTime === 'function') {
			self.broadcastTime();
		}
	},

	addWatch: function (hours, minutes, seconds) {
		let self = this;

		const delta = (hours * 3600000) + (minutes * 60000) + (seconds * 1000);

		self.watch += delta;
		self.checkVariables();
		if (typeof self.broadcastTime === 'function') {
			self.broadcastTime();
		}
		self.checkFeedbacks();

		if (typeof self.targetTime === 'number' && !isNaN(self.targetTime)) {
			const targetTime = new Date(self.targetTime + delta);
			self.targetTime = targetTime.getTime();
			self.setVariableValues({
				target12_hms: targetTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }),
				target24_hms: targetTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
			});
		}
	},

	subtractWatch: function (hours, minutes, seconds) {
		let self = this;

		const delta = (hours * 3600000) + (minutes * 60000) + (seconds * 1000);

		self.watch = Math.max(self.watch - delta, 0); // prevent negative timer
		self.checkVariables();
		if (typeof self.broadcastTime === 'function') {
			self.broadcastTime();
		}
		self.checkFeedbacks();

		if (typeof self.targetTime === 'number' && !isNaN(self.targetTime)) {
			const targetTime = new Date(self.targetTime - delta);
			self.targetTime = targetTime.getTime();
			self.setVariableValues({
				target12_hms: targetTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }),
				target24_hms: targetTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
			});
		}
	},

	clearTimer: function () {
		let self = this;

		if (self.timer) {
			clearInterval(self.timer);
			delete self.timer;
		}

		if (self.targetTime) {
			delete self.targetTime;
		}

		self.setVariableValues({
			target12_hms: '--:--:--',
			target24_hms: '--:--:--',
			isReverse: false,
		});

		self.checkFeedbacks();
	},
}