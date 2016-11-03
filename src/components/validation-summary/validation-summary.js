import {bindable} from 'aurelia-framework';
import {inject} from 'aurelia-framework';

export class ValidationSummary {
    @bindable errors = null;
    @bindable autofocus = null;
}
