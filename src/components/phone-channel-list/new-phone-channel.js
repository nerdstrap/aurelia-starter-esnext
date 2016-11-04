﻿import {inject, bindable} from 'aurelia-framework';
import {ValidationControllerFactory, ValidationController, ValidationRules} from 'aurelia-validation';

@inject(ValidationControllerFactory)
export class NewPhoneChannel {
    phone = '';
    formattedPhone = '';
    verificationCode = '';
    controller = null;

    constructor(controllerFactory) {
        this.controller = controllerFactory.createForCurrentScope();
    }

    activate() {
        let errors = this.controller.validate();
    }

    continue() {
        let errors = this.controller.validate();
    }
}

ValidationRules
    .ensure(a => a.phone).required()
    .on(NewPhoneChannel);
