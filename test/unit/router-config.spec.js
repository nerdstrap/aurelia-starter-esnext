import {RouterConfig} from '../../src/app/router-config';

class RouterStub {
    configure(handler) {
        handler(this);
    }

    map(routes) {
        this.routes = routes;
    }

    addAuthorizeStep(step) {
    }
}

describe('the RouterConfig module', () => {
    var sut;
    var mockedRouter;

    beforeEach(() => {
        mockedRouter = new RouterStub();
        sut = new RouterConfig(mockedRouter);
        sut.configure();
    });

    it('contains a router property', () => {
        expect(sut.router).toBeDefined();
    });

    it('configures the router title', () => {
        expect(sut.router.title).toEqual('Aurelia');
    });

    it('should have a welcome route', () => {
        expect(sut.router.routes).toContain({
            route: ['', 'welcome'],
            name: 'welcome',
            moduleId: 'welcome/index',
            nav: true,
            title: 'Welcome',
            settings: {
                t: 'welcome_route',
                roles: []
            }
        });
    });

    it('should have a login route', () => {
        expect(sut.router.routes).toContain({
            route: 'login',
            name: 'login',
            moduleId: 'login/index',
            nav: true,
            title: 'Login',
            settings: {
                t: 'login_route',
                roles: []
            }
        });
    });
});
