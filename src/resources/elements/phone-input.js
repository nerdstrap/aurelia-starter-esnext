import {bindable, bindingMode} from 'aurelia-framework';

const inputmask = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;

export class PhoneInput {
    @bindable value;
    displayValue;
    isInvalid;
    @bindable hasFocus;

    attached() {
        this.applyMask();
    }

    valueChanged() {
        this.validate();
        this.applyMask();
    }

    hasFocusChanged() {
        if (this.hasFocus)
            this.displayValue = this.value;
        else {
            this.value = this.displayValue;
            this.valueChanged();
        }
    }

    applyMask() {
        this.displayValue = inputmask.test(this.value) ? this.value.replace(inputmask, "($1) $2-$3") : this.value;
    }

    validate() {
        this.isInvalid = this.value && !inputmask.test(this.value);
    }
}
