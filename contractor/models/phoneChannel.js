import {inject, NewInstance} from 'aurelia-framework';
import {ValidationRules, ValidationController} from "aurelia-validation";

@inject(NewInstance.of(ValidationController))
export class phone {
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
          .ensure('contactInfo').displayName("Your new phone number")
            .matches(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/).withMessage(`\${$value} is not a valid phone number.`)
            .required()
          .on(this);
    }
    validateMe() {
        this.controller
          .validate()
    }
    addError() {
        this.controller.addError("You have already entered this number, you cannot register the same number twice.",this,"contactInfo");
    }
}
