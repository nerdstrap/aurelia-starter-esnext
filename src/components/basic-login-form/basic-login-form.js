import {inject} from 'aurelia-framework';
import {ValidationControllerFactory, ValidationController, ValidationRules} from 'aurelia-validation';
// import {FoundationValidationRenderer} from 'foundation-form';

@inject(ValidationControllerFactory)
export class BasicLoginForm {
    username = '';
    password = '';
    controller = null;

    constructor(controllerFactory) {
        this.controller = controllerFactory.createForCurrentScope();
        // this.controller.addRenderer(new FoundationValidationRenderer());
    }

    login() {
        let errors = this.controller.validate();
    }
}

ValidationRules
    .ensure(a => a.username).required()
    .ensure(a => a.password).required()
    .on(BasicLoginForm);
