import {AuthorizeStep} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class RouterConfig {

constructor(router) {
	this.router = router;
}

configure() {

	var appRouterConfig = function(config) {

		config.title = 'AEP.EAF.UI';

		config.addAuthorizeStep(AuthorizeStep);

		config.map([
		  {
		  	route: ['', 'login'],
		  	name: 'login',
		  	moduleId: 'login/index',
		  	nav: true,
		  	title: 'Login',
		  	settings: {
		  		t: 'login_route',
		  		roles: []
		  	}
		  },
		  {
		  	route: 'login-without-aa',
		  	name: 'login-without-aa',
		  	moduleId: 'login-without-aa/index',
		  	nav: true,
		  	title: 'Login Without AA',
		  	settings: {
		  		t: 'login-without-aa_route',
		  		roles: ['authrequired']
		  	}
		  },
		  {
		  	route: 'self-service',
		  	name: 'self-service',
		  	moduleId: 'self-service/index',
		  	nav: true,
		  	title: 'Self Service Password Reset',
		  	settings: {
		  		t: 'self-service_route',
		  		roles: ['authrequired']
		  	}
		  },
		  {
		  	route: 'manage-sms',
		  	name: 'manage-sms',
		  	moduleId: 'manage-sms/index',
		  	nav: true,
		  	title: 'Manage SMS',
		  	settings: {
		  		t: 'manage-sms_route',
		  		roles: ['authrequired']
		  	}
		  }
		]);
	};

	this.router.configure(appRouterConfig);

};

}
