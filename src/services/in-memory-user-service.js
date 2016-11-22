let latency = 200;

let _analyzeUserResponses = [
    {
        "sessionId": "__session",
        "userId": "lowrisk",
        "deviceData": "__devicedata",
        "actionCode": "VERIFIED",
        "credentialTypes": ["RSA", "Email", "Password", "Questions", "Pin", "SMS"],
        "success": true
    }
];

export class InMemoryUserService {
    isRequesting = false;

    analyzeUser(userId) {
        this.isRequesting = true;
        return new Promise(resolve => {
            setTimeout(() => {
                let found = _analyzeUserResponses.filter(u => u.userId === userId);
                if (found && found.length) {
                    resolve(JSON.parse(JSON.stringify(found[0])));
                } else {
                    resolve(JSON.parse(JSON.stringify(
                        {
                            "sessionId": "__session",
                            "userId": userId,
                            "deviceData": "__devicedata",
                            "actionCode": "VERIFIED",
                            "credentialTypes": ["Password"],
                            "success": true
                        })));
                }
                this.isRequesting = false;
            }, latency);
        });
    }

    authenticateUser(userId, credentials) {
        this.isRequesting = true;
        return new Promise(resolve => {
            setTimeout(() => {
                let found = _analyzeUserResponses.filter(u => u.userId === userId);
                if (found && found.length) {
                    resolve(JSON.parse(JSON.stringify(found[0])));
                } else {
                    resolve(JSON.parse(JSON.stringify(
                        {
                            "sessionId": "__session",
                            "userId": userId,
                            "deviceData": "__devicedata",
                            "actionCode": "DENY",
                            "success": true
                        })));
                }
                this.isRequesting = false;
            }, latency);
        });
    }


    getUser(userId) {
        this.isRequesting = true;
        return new Promise(resolve => {
            setTimeout(() => {
                let found = _analyzeUserResponses.filter(u => u.userId === userId);
                if (found && found.length) {
                    resolve(JSON.parse(JSON.stringify(found[0])));
                } else {
                    resolve(JSON.parse(JSON.stringify(
                        {
                            "sessionId": "__session",
                            "userId": userId,
                            "deviceData": "__devicedata",
                            "actionCode": "DENY",
                            "success": true
                        })));
                }
                this.isRequesting = false;
            }, latency);
        });
    }
}
