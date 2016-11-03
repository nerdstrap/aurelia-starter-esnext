let latency = 200;

let id = 0;
function getId() {
	'use strict';
	return ++id;
}

let deviceData = '__unsupported';
function getDeviceData() {
	'use strict';
	return deviceData;
}

let verified = false;
function getVerified() {
	'use strict';
	return verified;
}

let users = [
	{
		id: getId(),
		userName: 'lowrisk',
		deviceData: getDeviceData(),
		verified: getVerified()
	},
	{
		id: getId(),
		userName: 'lowrisk',
		deviceData: getDeviceData(),
		verified: getVerified()
	},
	{
		id: getId(),
		userName: 'highrisk',
		deviceData: getDeviceData(),
		verified: getVerified()
	}
];

export class InMemoryUserService {
	isRequesting: false;

	analyze(userName) {
		this.isRequesting = true;
		return new Promise(resolve => {
			setTimeout(() => {
				let found = users.filter(u => u.userName === userName)[0];
				resolve(JSON.parse(JSON.stringify(found)));
				this.isRequesting = false;
			}, latency);
		});
	}

	authorize(userName) {
		this.isRequesting = true;
		return new Promise(resolve => {
			setTimeout(() => {
				let found = users.filter(u => u.userName === userName)[0];
				resolve(JSON.parse(JSON.stringify(found)));
				this.isRequesting = false;
			}, latency);
		});
	}
}
