const actions = require('../actions');
const utils = require('../utils');
const { InstanceBase } = require('@companion-module/base');

describe('stopwatch actions', () => {
	let instance;
	let definitions;
	let listeners;

	beforeEach(() => {
		jest.useFakeTimers();
		jest.setSystemTime(new Date('2026-11-04T12:00:00Z'));
		listeners = process.listeners('message');
		class TestInstance extends InstanceBase {
			log = () => {};
		}
		instance = Object.assign(new TestInstance({ id: 'test', _isInstanceBaseProps: true, upgradeScripts: [] }), {
			...utils,
			watch: 0,
			precision: 100,
			config: {},
			checkVariables: jest.fn(),
			checkFeedbacks: jest.fn(),
			setVariableValues: jest.fn(),
			setActionDefinitions: (value) => {
				definitions = value;
			},
		});
		actions.initActions.call(instance);
	});

	afterEach(() => {
		instance.clearTimer();
		for (const listener of process.listeners('message')) {
			if (!listeners.includes(listener)) process.removeListener('message', listener);
		}
		jest.useRealTimers();
	});

	it('sets, adds and subtracts already substituted time options', async () => {
		await definitions.set.callback({ options: { hours: '1', minutes: '2', seconds: '3' } });
		expect(instance.watch).toBe(3723000);
		await definitions.add.callback({ options: { hours: '0', minutes: '0', seconds: '2' } });
		expect(instance.watch).toBe(3725000);
		await definitions.subtract.callback({ options: { hours: '2', minutes: '0', seconds: '0' } });
		expect(instance.watch).toBe(0);
	});

	it('starts, stops, toggles and resets elapsed time', async () => {
		await definitions.start.callback({});
		jest.advanceTimersByTime(500);
		expect(instance.watch).toBe(500);
		await definitions.stop.callback({});
		jest.advanceTimersByTime(500);
		expect(instance.watch).toBe(500);
		await definitions.toggle.callback({});
		jest.advanceTimersByTime(500);
		expect(instance.watch).toBe(1000);
		await definitions.reset.callback({});
		expect(instance.watch).toBe(0);
		expect(jest.getTimerCount()).toBe(0);
	});

	it('counts down to zero and clears its timer', async () => {
		instance.watch = 1000;
		await definitions.startReverse.callback({});
		expect(instance.setVariableValues).toHaveBeenCalledWith(expect.objectContaining({ isReverse: true }));
		jest.advanceTimersByTime(1500);
		expect(instance.watch).toBe(0);
		expect(jest.getTimerCount()).toBe(0);
	});

	it('preserves production countdown rounding', async () => {
		instance.watch = 1500;
		instance.config['production-timer'] = true;
		await definitions.startReverse.callback({});
		expect(instance.watch).toBe(1999);
		jest.advanceTimersByTime(1000);
		expect(instance.watch).toBe(0);
		expect(jest.getTimerCount()).toBe(0);
	});
});
