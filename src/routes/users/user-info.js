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

        return this.api.getUser(params.userId).then(response => {
            this.userId = response.userId;
        });
    }
}
