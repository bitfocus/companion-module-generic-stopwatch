const { Regex } = require('@companion-module/base')

module.exports = {
	getConfigFields() {
		return [
			{
				type: 'static-text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module controls a virtual stopwatch.',
			},
			{
				type: 'textinput',
				id: 'precision',
				label: 'Precision',
				width: 4,
				default: 500
			},
			{
				type: 'static-text',
				id: 'precision-info',
				width: 8,
				label: '',
				value: 'The precision of the stopwatch in milliseconds.'
			},
			{
				type: 'checkbox',
				id: 'production-timer',
				label: 'Production Timer Mode (See Help)',
				width: 12,
				default: false,
			},
		]
	},
}