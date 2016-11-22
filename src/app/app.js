import {LogManager} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {FetchConfig} from 'aurelia-auth';
import {RouterConfig} from './router-config';
import $ from 'jquery';
import foundation from 'foundation-sites';

const logger = LogManager.getLogger('aurelia-starter-esnext');

@inject(Router, FetchConfig, RouterConfig)

export class App {

    constructor(router, fetchConfig, routerConfig) {
        this.router = router;
        this.fetchConfig = fetchConfig;
        this.routerConfig = routerConfig;
    };

    activate() {
        this.fetchConfig.configure();
        this.routerConfig.configure();
        logger.info("app activated");
    };

    attached() {
        $(document).foundation();
    };
}
