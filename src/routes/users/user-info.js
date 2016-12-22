import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {InMemoryUserService} from './../../services/in-memory-user-service';

@inject(Router, EventAggregator, InMemoryUserService)
export class UserInfo {
    userId;

    constructor(router, eventAggregator, api) {
        this.router = router;
        this.eventAggregator = eventAggregator;
        this.api = api;
    }

    activate(params, routeConfig) {
        this.routeConfig = routeConfig;

        let sessionId = "__sessionId";
        let transactionId = "__transactionId";
        let deviceTokenCookie = "__deviceTokenCookie";
        let userId = params.id;
        return this.api.getUser(sessionId, transactionId, deviceTokenCookie, userId).then(response => {
            this.user = response;
        });
    }
}
