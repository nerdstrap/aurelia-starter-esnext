import {AuthorizeStep} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class RouterConfig {

    constructor(router) {
        this.router = router;
    }

    configure() {
        var routerConfig = function (config) {
            config.title = 'Aurelia';
            config.addAuthorizeStep(AuthorizeStep);
            config.map([

                {
                    route: ['', 'welcome'],
                    name: 'welcome',
                    moduleId: 'routes/welcome/welcome',
                    nav: true,
                    title: 'Welcome',
                    settings: {
                        i18n: 'welcome_route',
                        roles: []
                    }
                },
                {
                    route: 'login',
                    name: 'login',
                    moduleId: 'routes/login/login',
                    nav: true,
                    title: 'Login',
                    settings: {
                        i18n: 'login_route',
                        roles: []
                    }
                },
                {
                    route: 'self-service',
                    name: 'self-service',
                    moduleId: 'routes/self-service/self-service',
                    nav: true,
                    title: 'Self Service',
                    settings: {
                        i18n: 'self-service_route',
                        roles: []
                    }
                }
            ]);
        };

        this.router.configure(routerConfig);
    };
}
