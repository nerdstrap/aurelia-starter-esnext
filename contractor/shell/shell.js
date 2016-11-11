import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {FetchConfig} from 'aurelia-auth';
import {RouterConfig} from './router-config';
import $ from 'jquery';
import foundation from 'foundation-sites';

@inject(Router, FetchConfig, RouterConfig)

export class Shell {

	constructor(router, fetchConfig, routerConfig) {
		this.router = router;
		this.fetchConfig = fetchConfig;
		this.routerConfig = routerConfig;
	};

	activate() {
		this.fetchConfig.configure();
		this.routerConfig.configure();
	};

	attached() {
		$(document).foundation();
	};
}
