import {App} from '../../src/app/app';

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

class FetchConfigStub {
    configure(handler) {
        handler(this);
    }
}

class RouterConfigStub {
    configure(handler) {
        handler(this);
    }
}

describe('the App module', () => {
    var sut;
    var mockedRouter;
    var mockedFetchConfig;
    var mockedRouterConfig;

    beforeEach(() => {
        mockedRouter = new RouterStub();
        mockedFetchConfig = new FetchConfigStub();
        mockedRouterConfig = new RouterConfigStub();
        sut = new App(mockedRouter, mockedFetchConfig, mockedRouterConfig);
    });

    it('contains a router property', () => {
        expect(sut.router).toBeDefined();
    });

    it('contains a fetchConfig property', () => {
        expect(sut.fetchConfig).toBeDefined();
    });

    it('contains a routerConfig property', () => {
        expect(sut.routerConfig).toBeDefined();
    });
});
