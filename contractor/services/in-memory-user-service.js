var latency = 200;

var id = 0;
function getId() {
	'use strict';
	return ++id;
}

var deviceData = '__unsupported';
function getDeviceData() {
	'use strict';
	return deviceData;
}

var verified = false;
function getVerified() {
	'use strict';
	return verified;
}

var users = [
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
}
