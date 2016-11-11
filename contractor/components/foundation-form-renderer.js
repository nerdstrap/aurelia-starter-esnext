import {ValidationRenderer, RenderInstruction, ValidationError} from 'aurelia-validation';

export class FoundationFormRenderer {
	render(instruction) {
		for (let { error, elements } of instruction.unrender) {
			for (let element of elements) {
				this.remove(element, error);
			}
		}

	for (let { error, elements } of instruction.render) {
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

	// add the is-invalid-input class to the element
	element.classList.add('is-invalid-input');

	// add the is-invalid-label class to the label
	const label = element.closest('label');
	if (label) {
		label.classList.add('is-invalid-label');
	}

	// add form-error
	const message = document.createElement('span');
	message.className = 'form-error is-visible';
	message.textContent = error.message;
	message.id = 'validation-message-${error.id}';
	formRow.appendChild(message);
}

remove(element, error) {
	const formRow = element.closest('.form-row');
	if (!formRow) {
		return;
	}

	// remove form-error
	const message = formRow.querySelector('#validation-message-${error.id}');
	if (message) {
		formRow.removeChild(message);
	}

	// remove the is-invalid-input class to the element
	element.classList.remove('is-invalid-input');

	// remove the is-invalid-label class to the label
	const label = element.closest('label');
	if (label) {
		label.classList.remove('is-invalid-label');
	}
}
}
