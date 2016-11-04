import {inject, NewInstance} from 'aurelia-framework';
import {ValidationRules, ValidationController} from "aurelia-validation";

@inject(NewInstance.of(ValidationController))
export class User {
    id = 0;
    username = '';
    password = '';
    session = '';

    constructor(controller) {
        this.controller = controller;

        ValidationRules
            .ensure(m => m.id).required()
            .ensure(m => m.username).required()
            .ensure(m => m.password).required()
            .ensure(m => m.session).required()
            .on(this);
    }
}
