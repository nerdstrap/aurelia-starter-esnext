import {inject, NewInstance} from 'aurelia-framework';
import {ValidationRules, ValidationController} from "aurelia-validation";

@inject(NewInstance.of(ValidationController))
export class email {
    type = '';
    contactInfo = '';
    verified = '';
    hasActiveToken = '';
    constructor(controller, channelInfoEmail) {
        this.type = channelInfoEmail.type;
        this.contactInfo = channelInfoEmail.contactInfo;
        this.verified = channelInfoEmail.verified;
        this.hasActiveToken = channelInfoEmail.hasActiveToken;
        this.controller = controller;
        ValidationRules
          .ensure('contactInfo').displayName("Your new email")
            .email().withMessage('\${$displayName} must be a valid email address.')
            .required()
          .on(this);
    }
    validateMe() {
        this.controller
          .validate()
    }
    addError() {
        this.controller.addError("You have already entered this email, you cannot register the same email twice.",this,"contactInfo");
    }
}
