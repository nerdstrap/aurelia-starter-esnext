import {inject, NewInstance} from 'aurelia-framework';
import {ValidationRules, ValidationController} from "aurelia-validation";




@inject(NewInstance.of(ValidationController))
export class User {
    userId = "";
    userName = "";
    sessionId = "";
    channelList = [];
    analyzeActionCode = "";
    authActionCode = "";
    newPasswordValue = "";
    selectedQuestionAnswer = "";
    rsaIsVisbile = false;
    emailIsVisbile = false;
    smsIsVisbile = false;
    questionsIsVisbile = false;
    passwordIsVisbile = false;
    pinIsVisbile = false;

    rsaInput = '';
    emailInput = '';
    smsInput = '';
    questionInputs = {"question1": '', "question2":'',"question3":''};
    passwordInput = '';
    pinInput = '';
    constructor(controller) {
        this.controller = controller;
        ValidationRules.customRule(
            'password',
            //^(?=^.{8,}$) at the beginning of all for passwords >= 8 characters.
			//^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+ //lowercase, uppercase, digit
			//^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()]).+ //lowercase, uppercase, symbol
			//^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()]).+ //uppercase, digit, symbol
			//^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).+ //lowercase, digit, symbol
            (value, obj) => value === null || value === undefined || /^(?=^.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+/.test(value) || /^(?=^.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()]).+/.test(value) || /^(?=^.{8,}$)(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()]).+/.test(value) || /^(?=^.{8,}$)(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).+/.test(value),
            `\${$displayName} must meet AEP password policy.`
            );
        ValidationRules.customRule(
            'mustBeUnique',
            (value, obj) => value === null || value === undefined || this.channelList.indexOf(value),
            `\${$displayName} must meet AEP password policy.`
            );
        ValidationRules
          .ensure(m => m.userId).displayName("Your AEP Network ID ")
                .required()
                .matches(/^[a-zA-Z0-9]*$/).withMessage(`\${$value} is invalid, please enter a valid ID.`)
          .ensure(m => m.selectedQuestionAnswer).displayName("Your answer").required()
          .ensure(m => m.newPasswordValue).displayName("New Password")
            .required().withMessage(`Your \${$displayName} cannot be blank.`)
            .satisfiesRule('password').withMessage(`Your \${$displayName} must meet AEP policy.`)
          .on(this);
    }
};
