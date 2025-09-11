const { InstanceBase, InstanceStatus, runEntrypoint } = require('@companion-module/base');
const UpgradeScripts = require('./src/upgrades');

const config = require('./src/config');
const actions = require('./src/actions');
const feedbacks = require('./src/feedbacks');
const variables = require('./src/variables');
const presets = require('./src/presets');

const utils = require('./src/utils');

const WebSocket = require('ws');

class stopwatchInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		// Assign the methods from the listed files to this class
		Object.assign(this, {
			...config,
			...actions,
			...feedbacks,
			...variables,
			...presets,
			...utils,
		})

		this.timer = null;
		this.watch = 0;
		this.precision = 500; //milliseconds
	}

	async destroy() {
		this.clearTimer();
	}

	async init(config) {
		this.configUpdated(config);
		this.startWebServer();
	}

	async configUpdated(config) {
		const newPort = parseInt(config.port) || 3001;
		const newFontSize = config.fontSize || '6';
		const currentPort = this.httpServer?.address?.().port;

		const shouldRestart =
			this.httpServer &&
			(currentPort !== newPort || this.config?.fontSize !== newFontSize);

		this.config = config;
		
		this.initActions();
		this.initFeedbacks();
		this.initVariables();
		this.initPresets();

		this.updateStatus(InstanceStatus.Ok);

		if (this.config.precision) {
			this.precision = parseInt(this.config.precision);
		}

				if (shouldRestart) {
					try {
						this.httpServer.close(() => {
							this.log('info', 'Restarting web server due to config change...');
							this.startWebServer();
						});
					} catch (e) {
						this.log('error', 'Web server restart error: ' + e.message);
					}
				}
			}
		
			startWebServer() {
				const http = require('http');
				const url = require('url');
		
				this.httpServer = http.createServer((req, res) => {
					const parsedUrl = url.parse(req.url, true);
					const pathname = parsedUrl.pathname;
		
					if (pathname === '/') {
						res.writeHead(200, { 'Content-Type': 'text/html' });
						res.end(`
							<!DOCTYPE html>
							<html>
							<head>
								<title>Stopwatch Display</title>
								<style>
									body {
										background-color: black;
										color: white;
										font-family: sans-serif;
										display: flex;
										justify-content: center;
										align-items: center;
										height: 100vh;
										margin: 0;
									}
		
									#timer {
										font-size: calc(min(20vw, 40vh));
										white-space: nowrap;
									}
								</style>
							</head>
							<body>
								<div id="timer">Loading...</div>
								<script>
									function createWebSocket() {
									  const ws = new WebSocket(\`ws://\${location.host}\`);
		
									  ws.onopen = () => {
										console.log('WebSocket connected');
									  };
		
									  ws.onmessage = (event) => {
										try {
										  const msg = JSON.parse(event.data);
										  if (msg.type === 'refresh') {
											window.location.reload();
											return;
										  }
										} catch {
										  // Not JSON, treat as normal time string:
										}
										document.getElementById('timer').textContent = event.data;
									  };
		
									  ws.onerror = () => {
										console.log('WebSocket error');
									  };
		
									  ws.onclose = () => {
										console.log('WebSocket closed, attempting reconnect in 2 seconds...');
										document.getElementById('timer').textContent = 'Offline';
										setTimeout(() => {
										  createWebSocket();
										}, 2000);
									  };
		
									  return ws;
									}
		
									createWebSocket();
								</script>
							</body>
							</html>
						`)
						return;
					}
		
					if (pathname === '/api/time') {
						res.writeHead(200, { 'Content-Type': 'text/plain' })
						res.end(this.getFormattedTime())
						return
					}
		
					res.writeHead(404);
					res.end();
				});
		
				const port = parseInt(this.config.port) || 3001;
				this.httpServer.listen(port, '0.0.0.0', () => {
					this.log('info', `Web server started on http://localhost:${port}`);
				});
		
				this.wss = new WebSocket.Server({ server: this.httpServer });
		
				this.wss.on('connection', (ws) => {
					this.log('debug', 'WebSocket client connected');
					ws.send(this.getFormattedTime());
				});
		
				this.broadcastTime = () => {
					const timeString = this.getFormattedTime();
					if (this.wss && this.wss.clients) {
						for (const client of this.wss.clients) {
							if (client.readyState === WebSocket.OPEN) {
								client.send(timeString);
							}
						}
					}
				};
			}
		
			getFormattedTime() {
		  const vars = this.variableValues || {};
		
		  const hh = vars.hours || '00';
		  const mm = vars.minutes || '00';
		  const ss = vars.seconds || '00';
		
		  // Make sure each is two digits
		  const hours = String(hh).padStart(2, '0');
		  const minutes = String(mm).padStart(2, '0');
		  const seconds = String(ss).padStart(2, '0');
		
		  return `${hours}:${minutes}:${seconds}`;
	}
}

runEntrypoint(stopwatchInstance, UpgradeScripts);