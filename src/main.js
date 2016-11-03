import {I18N} from 'aurelia-i18n';
import Backend from 'i18next-xhr-backend';
import {ValidationMessageProvider} from 'aurelia-validation';
import 'fetch';
import environment from './environment';

export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .feature('resources')
        .feature('components')
        .plugin('aurelia-validation')
        .feature('foundation-validation');

    if (environment.debug) {
        aurelia.use.developmentLogging();
    }

    if (environment.testing) {
        aurelia.use.plugin('aurelia-testing');
    }

    aurelia.use.plugin('aurelia-i18n', (instance) => {
        instance.i18next.use(Backend);

        instance.setup({
            backend: {
                loadPath: './locales/{{lng}}/{{ns}}.json'
            },

            lng: 'en',
            attributes: ['t', 'i18n'],
            fallbackLng: 'en',
            debug: true
        });
    });

    // const i18n = aurelia.container.get(I18N);
    // ValidationMessageProvider.prototype.getMessage = function (key) {
    //     const translation = i18n.tr(`errorMessages.${key}`);
    //     return this.parser.parseMessage(translation);
    // };
    //
    // ValidationMessageProvider.prototype.getDisplayName = function (propertyName) {
    //     return i18n.tr(propertyName);
    // };


    aurelia.start().then(() => aurelia.setRoot('app/app'));
}
