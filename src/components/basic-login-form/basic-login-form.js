import {inject} from 'aurelia-framework';
import {ValidationControllerFactory, ValidationController, ValidationRules} from 'aurelia-validation';
import {InMemoryUserService} from './../../services/in-memory-user-service'

@inject(ValidationControllerFactory, InMemoryUserService)
export class BasicLoginForm {
    username = '';
    password = '';
    controller = null;
    userService = null;

    constructor(controllerFactory, api) {
        this.controller = controllerFactory.createForCurrentScope();
        this.api = api;
    }

    login() {
        let errors = this.controller.validate();
        this.api.login(this.username, this.password)
            .then(user => {
                let url = this.router.generate('details', {id: movie.id});
                this.router.navigate(url);
            });
    }
}

ValidationRules
    .ensure(a => a.username).required()
    .ensure(a => a.password).required()
    .on(BasicLoginForm);
