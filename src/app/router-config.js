import {AuthorizeStep} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class RouterConfig {

    constructor(router) {
        this.router = router;
    }

    configure() {
        let routerConfig = function (config) {
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
                }, {
                    route: 'login',
                    name: 'login',
                    moduleId: 'routes/login/login',
                    nav: true,
                    title: 'Login',
                    settings: {
                        i18n: 'login_route',
                        roles: []
                    }
                }, {
                    route: 'users/:id/user-info',
                    name: 'user-info',
                    moduleId: 'routes/users/user-info',
                    title: 'User Info',
                    settings: {
                        i18n: 'user-info_route',
                        roles: []
                    }
                }
            ]);
        };

        this.router.configure(routerConfig);
    };
}
