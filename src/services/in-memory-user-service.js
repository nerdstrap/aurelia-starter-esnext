let latency = 200;

let _analyzeUserResponses = [
    {
        "sessionId": "__sessionId",
        "transactionId": "__transactionId",
        "deviceRequest": {
            "deviceTokenCookie": "__deviceTokenCookie"
        },
        "userId": "1",
        "actionCode": "ALLOW",
        "success": "true"
    }
];

let _authenticateUserResponses = [
    {
        "sessionId": "__sessionId",
        "transactionId": "__transactionId",
        "deviceRequest": {
            "deviceTokenCookie": "__deviceTokenCookie"
        },
        "userId": "1",
        "authStatusCode": "Success",
        "success": "true"
    }
];

let _challengeUserResponses = [
    {
        "sessionId": "__sessionId",
        "transactionId": "__transactionId",
        "deviceRequest": {
            "deviceTokenCookie": "__deviceTokenCookie"
        },
        "userId": "1",
        "authStatusCode": "Success",
        "success": "true"
    }
];

let _getUserResponses = [
    {
        "sessionId": "__sessionId",
        "transactionId": "__transactionId",
        "deviceRequest": {
            "deviceTokenCookie": "__deviceTokenCookie"
        },
        "userId": "1",
        "userInfo": {
            "fullName": "First F. One",
            "emailAddress": "fmlast@company.com"
        },
        "phoneInfos": [
            {
                "phoneNumber": "16145551212",
                "label": "16145551212",
                "isDefault": "true",
                "verified": "true",
                "hasActiveToken": "false"
            }, {
                "phoneNumber": "13305551212",
                "label": "13305551212",
                "isDefault": "false",
                "verified": "true",
                "hasActiveToken": "false"
            }
        ],
        "emailInfos": [
            {
                "emailAddress": "fmlast@external.com",
                "label": "fmlast@external.com",
                "isDefault": "true",
                "verified": "true",
                "hasActiveToken": "false"
            }, {
                "emailAddress": "fmlast@internal.com",
                "label": "fmlast@internal.com",
                "isDefault": "false",
                "verified": "true",
                "hasActiveToken": "false"
            }
        ],
        "success": "true"
    }, {
        "sessionId": "__sessionId",
        "transactionId": "__transactionId",
        "deviceRequest": {
            "deviceTokenCookie": "__deviceTokenCookie"
        },
        "userId": "2",
        "userInfo": {
            "fullName": "Second S. Two",
            "emailAddress": "fmlast@company.com"
        },
        "phoneInfos": [],
        "emailInfos": [],
        "success": "true"
    }, {
        "sessionId": "__sessionId",
        "transactionId": "__transactionId",
        "deviceRequest": {
            "deviceTokenCookie": "__deviceTokenCookie"
        },
        "userId": "3",
        "userInfo": {
            "fullName": "Third T. Three",
            "emailAddress": "fmlast@company.com"
        },
        "phoneInfos": [],
        "emailInfos": [],
        "success": "true"
    }
];

export class InMemoryUserService {
    isRequesting = false;

    analyzeUser(sessionId, transactionId, deviceTokenCookie, userId) {
        this.isRequesting = true;
        return new Promise(resolve => {
            setTimeout(() => {
                let found = _analyzeUserResponses.filter(u => u.userId === userId);
                if (found && found.length) {
                    resolve(JSON.parse(JSON.stringify(found[0])));
                } else {
                    resolve(JSON.parse(JSON.stringify(
                        {
                            "sessionId": "__sessionId",
                            "transactionId": "__transactionId",
                            "deviceRequest": {
                                "deviceTokenCookie": "__deviceTokenCookie"
                            },
                            "userId": userId,
                            "actionCode": "ALLOW",
                            "success": true
                        })));
                }
                this.isRequesting = false;
            }, latency);
        });
    }

    challengeUser(sessionId, transactionId, deviceTokenCookie, userId, credentialType, contactInfo, label) {
        this.isRequesting = true;
        return new Promise(resolve => {
            setTimeout(() => {
                let found = _challengeUserResponses.filter(u => u.userId === userId);
                if (found && found.length) {
                    resolve(JSON.parse(JSON.stringify(found[0])));
                } else {
                    resolve(JSON.parse(JSON.stringify(
                        {
                            "sessionId": "__sessionId",
                            "transactionId": "__transactionId",
                            "deviceRequest": {
                                "deviceTokenCookie": "__deviceTokenCookie"
                            },
                            "userId": userId,
                            "authStatusCode": "Success",
                            "success": true
                        })));
                }
                this.isRequesting = false;
            }, latency);
        });
    }

    authenticateUser(sessionId, transactionId, deviceTokenCookie, userId, credentialType, credentials) {
        this.isRequesting = true;
        return new Promise(resolve => {
            setTimeout(() => {
                let found = _authenticateUserResponses.filter(u => u.userId === userId);
                if (found && found.length) {
                    resolve(JSON.parse(JSON.stringify(found[0])));
                } else {
                    resolve(JSON.parse(JSON.stringify(
                        {
                            "sessionId": "__sessionId",
                            "transactionId": "__transactionId",
                            "deviceRequest": {
                                "deviceTokenCookie": "__deviceTokenCookie"
                            },
                            "userId": userId,
                            "authStatusCode": "Success",
                            "success": true
                        })));
                }
                this.isRequesting = false;
            }, latency);
        });
    }

    getUser(sessionId, transactionId, deviceTokenCookie, userId) {
        this.isRequesting = true;
        return new Promise(resolve => {
            setTimeout(() => {
                let found = _getUserResponses.filter(u => u.userId === userId);
                if (found && found.length) {
                    resolve(JSON.parse(JSON.stringify(found[0])));
                } else {
                    resolve(JSON.parse(JSON.stringify(
                        {
                            "sessionId": "__sessionId",
                            "transactionId": "__transactionId",
                            "deviceRequest": {
                                "deviceTokenCookie": "__deviceTokenCookie"
                            },
                            "userId": userId,
                            "userInfo": {
                                "fullName": "First M. Last",
                                "emailAddress": "fmlast@company.com"
                            },
                            "success": true
                        })));
                }
                this.isRequesting = false;
            }, latency);
        });
    }
}
