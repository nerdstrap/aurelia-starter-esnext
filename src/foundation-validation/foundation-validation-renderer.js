import {ValidationRenderer, RenderInstruction, ValidationError} from 'aurelia-validation';

export class FoundationValidationRenderer {
    render(instruction) {
        for (let {error, elements} of instruction.unrender) {
            for (let element of elements) {
                this.remove(element, error);
            }
        }

        for (let {error, elements} of instruction.render) {
            for (let element of elements) {
                this.add(element, error);
            }
        }
    }

    add(element, error) {
        const formRow = element.closest('.form-row');
        if (!formRow) {
            return;
        }

        // add is-invalid-label class to the label
        const formLabel = formRow.getElementsByTagName('label')[0];
        if (formLabel) {
            formLabel.classList.add('is-invalid-label');
        }

        // add is-invalid-input and aria-invalid to the input
        const formInput = formRow.getElementsByTagName('input')[0];
        if (formInput) {
            formInput.classList.add('is-invalid-input');
            formInput.setAttribute('aria-invalid', 'true');
        }

        // add form-error
        const message = document.createElement('span');
        message.className = 'form-error is-visible';
        message.textContent = error.message;
        message.id = `validation-message-${error.id}`;
        formRow.appendChild(message);
    }

    remove(element, error) {
        const formRow = element.closest('.form-row');
        if (!formRow) {
            return;
        }

        // remove is-invalid-label class from the label
        const formLabel = formRow.getElementsByTagName('label')[0];
        if (formLabel) {
            formLabel.classList.remove('is-invalid-label');
        }

        // remove is-invalid-input and aria-invalid from the input
        const formInput = formRow.getElementsByTagName('input')[0];
        if (formInput) {
            formInput.classList.remove('is-invalid-input');
            formInput.setAttribute('aria-invalid', 'false');
        }

        // remove help-block
        const message = formRow.querySelector(`#validation-message-${error.id}`);
        if (message) {
            formRow.removeChild(message);
        }
    }
}
