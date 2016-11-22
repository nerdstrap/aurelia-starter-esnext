import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {ValidationControllerFactory, ValidationController, ValidationRules} from 'aurelia-validation';
import {InMemoryUserService} from './../../services/in-memory-user-service'

@inject(Router, ValidationControllerFactory, InMemoryUserService)
export class AuthenticateUserWithPin {
    userId = '';
    userIdHasFocus = true;
    pin = '';
    pinHasFocus = false;
    controller = null;
    api = null;

    constructor(router, controllerFactory, api) {
        this.router = router;
        this.controller = controllerFactory.createForCurrentScope();
        this.api = api;
    }

    authenticateUser() {
        let errors = this.controller.validate();
        this.api.login(this.userId, this.pin)
            .then(user => {
                let url = this.router.generate('details', {id: movie.id});
                this.router.navigate(url);
            });
    }
}

ValidationRules
    .ensure(a => a.userId).required()
    .ensure(a => a.pin).required()
    .on(AuthenticateUserWithPin);
