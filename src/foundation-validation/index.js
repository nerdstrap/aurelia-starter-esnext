import {FoundationValidationRenderer} from './foundation-validation-renderer';

export function configure(config) {
    config.container.registerHandler(
        'foundation-form',
        container => container.get(FoundationValidationRenderer));
}
