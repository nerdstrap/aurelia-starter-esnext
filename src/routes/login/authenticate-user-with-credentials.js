import {inject, computedFrom} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {ValidationControllerFactory, ValidationController, ValidationRules} from 'aurelia-validation';
import {InMemoryUserService} from './../../services/in-memory-user-service'

@inject(Router, ValidationControllerFactory, InMemoryUserService)
export class AuthenticateUserWithCredentials {
    userId = '';
    userIdHasFocus = true;
    credentials = '';
    credentialsHasFocus = false;
    controller = null;
    api = null;

    constructor(router, controllerFactory, api) {
        this.router = router;
        this.controller = controllerFactory.createForCurrentScope();
        this.api = api;
    }

    activate(analyzeUserResponse) {
        //this.userId = analyzeUserResponse.userId;
    }

    @computedFrom('userId', 'credentials')
    get isAuthenticateUserEnabled() {
        let userId = this.userId;
        let credentials = this.credentials;
        return userId && credentials;
    }

    authenticateUser() {
        let errors = this.controller.validate();
        this.api.authenticateUser(this.userId, this.credentials)
            .then(response => {
                let url = this.router.generate('user-info', {id: response.userId});
                this.router.navigate(url);
            });
    }
}

ValidationRules
    .ensure(a => a.userId).required()
    .ensure(a => a.credentials).required()
    .on(AuthenticateUserWithCredentials);
