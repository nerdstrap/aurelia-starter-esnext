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

let session = '__session';
function getSession() {
    'use strict';
    return session;
}

let verified = false;
function getVerified() {
    'use strict';
    return verified;
}

let users = [
    {
        id: getId(),
        username: 'lowrisk',
        session: getSession(),
        deviceData: getDeviceData(),
        verified: getVerified(),
        contactInfos: [{
            method: 'phone',
            contact: '+16145551212',
            verified: true
        }]
    },
    {
        id: getId(),
        username: 'mediumrisk',
        session: getSession(),
        deviceData: getDeviceData(),
        verified: getVerified(),
        contactInfos: [{
            method: 'phone',
            contact: '+16145551212',
            verified: true
        }]
    },
    {
        id: getId(),
        username: 'highrisk',
        session: getSession(),
        deviceData: getDeviceData(),
        verified: getVerified(),
        contactInfos: [{
            method: 'phone',
            contact: '+16145551212',
            verified: true
        }]
    }
];

export class InMemoryUserService {
    isRequesting: false;

    analyze(username) {
        this.isRequesting = true;
        return new Promise(resolve => {
            setTimeout(() => {
                let found = users.filter(u => u.username === username)[0];
                resolve(JSON.parse(JSON.stringify(found)));
                this.isRequesting = false;
            }, latency);
        });
    }

    authorize(username) {
        this.isRequesting = true;
        return new Promise(resolve => {
            setTimeout(() => {
                let found = users.filter(u => u.username === username)[0];
                resolve(JSON.parse(JSON.stringify(found)));
                this.isRequesting = false;
            }, latency);
        });
    }

    login(username, password) {
        this.isRequesting = true;
        return new Promise(resolve => {
            setTimeout(() => {
                let found = users.filter(u => u.username === username)[0];
                resolve(JSON.parse(JSON.stringify(found)));
                this.isRequesting = false;
            }, latency);
        });
    }

    getUserInfo(id) {
        this.isRequesting = true;
        return new Promise(resolve => {
            setTimeout(() => {
                let found = users.filter(u => u.id === parseInt(id, 10))[0];
                resolve(JSON.parse(JSON.stringify(found)));
                this.isRequesting = false;
            }, latency);
        });
    }

    addContactInfo(userId, contactInfo) {
        this.isRequesting = true;
        return new Promise(resolve => {
            setTimeout(() => {
                let found = users.filter(u => u.id === userId)[0];
                found.contactInfos.push(contactInfo);
                resolve(JSON.parse(JSON.stringify(found)));
                this.isRequesting = false;
            }, latency);
        });
    }
}
