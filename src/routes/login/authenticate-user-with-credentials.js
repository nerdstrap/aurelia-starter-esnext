import {inject, computedFrom} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ValidationControllerFactory, ValidationController, ValidationRules} from 'aurelia-validation';
import {InMemoryUserService} from './../../services/in-memory-user-service'
import {AuthenticateUserDone} from './../../resources/messages/user-messages';

@inject(Router, EventAggregator, ValidationControllerFactory, InMemoryUserService)
export class AuthenticateUserWithCredentials {
    userId = '';
    credentials = '';
    credentialsHasFocus = true;
    controller = null;
    api = null;

    constructor(router, eventAggregator, controllerFactory, api) {
        this.router = router;
        this.eventAggregator = eventAggregator;
        this.controller = controllerFactory.createForCurrentScope();
        this.api = api;
    }

    activate(model) {
        this.userId = model.userId;
        this.credentials = model.credentials;
    }

    @computedFrom('userId', 'credentials')
    get isAuthenticateUserEnabled() {
        let userId = this.userId;
        let credentials = this.credentials;
        return userId && credentials;
    }

    authenticateUser() {
        let errors = this.controller.validate();
        let sessionId = '__sessionId';
        let transactionId = '__transactionId';
        let deviceTokenCookie = '__deviceTokenCookie';
        let userId = this.userId;
        let credentials = this.credentials;
        this.api.authenticateUser(sessionId, transactionId, deviceTokenCookie, userId, credentials)
            .then(response => {
                this.eventAggregator.publish(new AuthenticateUserDone(response));
            });
    }
}

ValidationRules
    .ensure(a => a.userId).required()
    .ensure(a => a.credentials).required()
    .on(AuthenticateUserWithCredentials);
