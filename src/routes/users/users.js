import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {User} from './../../models/user';
import {InMemoryUserService} from './../../services/in-memory-user-service';

@inject(Router, EventAggregator, InMemoryUserService)
export class Users {
    user;

    constructor(router, eventAggregator, api) {
        this.router = router;
        this.eventAggregator = eventAggregator;
        this.api = api;
    }

    activate(params, routeConfig) {
        console.log('activate');
        this.routeConfig = routeConfig;
    }

    created(owningView, myView) {
        console.log('created');
    }

    bind(bindingContext, overrideContext) {
        console.log('bind');
    }

    attached() {
        console.log('attached');
    }

    detached() {
        console.log('detached');
    }

    unbind() {
        console.log('unbind');
    }
}
