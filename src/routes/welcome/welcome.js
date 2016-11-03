import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Router, EventAggregator)
export class Welcome {
    user;

    constructor(router, eventAggregator) {
        console.log('constructor');
        this.router = router;
        this.eventAggregator = eventAggregator;
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
