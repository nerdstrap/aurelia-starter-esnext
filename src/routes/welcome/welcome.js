import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Router, EventAggregator)
export class Welcome {
    telephone;

    constructor(router, eventAggregator) {
        this.router = router;
        this.eventAggregator = eventAggregator;
    }

    activate(params, routeConfig) {
        this.routeConfig = routeConfig;
    }
}
