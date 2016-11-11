import {inject} from 'aurelia-dependency-injection';
import {ValidationControllerFactory, ValidationController, ValidationRules} from 'aurelia-validation';
import {FoundationFormRenderer} from './foundation-form-renderer';

@inject(ValidationControllerFactory)
export class BasicLoginForm {
	username = '';
	password = '';
	controller = null;
  
	constructor(controllerFactory) {
		this.controller = controllerFactory.createForCurrentScope();
		this.controller.addRenderer(new FoundationFormRenderer());
	}
  
	login() {
		this.controller.validate();
	}
}

ValidationRules
  .ensure(a => a.username).required()
  .ensure(a => a.password).required()
  .on(BasicLoginForm);
