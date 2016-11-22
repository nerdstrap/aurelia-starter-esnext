import {inject, NewInstance} from 'aurelia-framework';
import {ValidationRules, ValidationController} from "aurelia-validation";

@inject(NewInstance.of(ValidationController))
export class User {
    sessionId = '';
    deviceData = '';
    userId = '';
    credentialType = '';
    credentials = '';

    constructor(controller) {
        this.controller = controller;

        ValidationRules
            .ensure(m => m.sessionId).required()
            .ensure(m => m.deviceData).required()
            .ensure(m => m.userId).required()
            .ensure(m => m.credentialType).required()
            .ensure(m => m.credentials).required()
            .on(this);
    }
}
