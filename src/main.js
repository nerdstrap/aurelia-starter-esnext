import {LogManager} from 'aurelia-framework';
import {NewInstance} from 'aurelia-dependency-injection';
import {EventAggregator} from 'aurelia-event-aggregator';
import {I18N} from 'aurelia-i18n';
import Backend from 'i18next-xhr-backend';
import {ValidationMessageProvider} from 'aurelia-validation';
import 'fetch';
import environment from './environment';
import _ from 'lodash';
const logger = LogManager.getLogger('aurelia-starter-esnext');

if (window.location.href.indexOf('debug=true') >= 0) {
    LogManager.setLevel(LogManager.logLevel.debug);
}

Promise.config({
    warnings: {
        wForgottenReturn: false
    }
});

function getLanguage() {
    return new Promise((resolve, reject) => {
        let lng = 'en';
        resolve(lng);
    });
}

function setRoot(aurelia) {
    logger.info('bootstrapped:' + aurelia.setupAureliaDone + ", localization:" + aurelia.setupI18NDone);
    if (aurelia.setupAureliaDone && aurelia.setupI18NDone) {
        aurelia.setRoot('app/app');
    }
}

export function configure(aurelia) {
    getLanguage().then(lang => {
        initialize(aurelia, lang);
    }).catch(e => {
        console.log('WARNING: Failure to obtain a language to use for aurelia-starter-esnext. Language has been set to "en".');
        initialize(aurelia, 'en');
    });
}

function initialize(aurelia, lng) {
    aurelia.setupAureliaDone = false;
    aurelia.setupI18NDone = false;
    aurelia.use
        .standardConfiguration()
        .feature('resources')
        // .plugin('aurelia-dialog', config => {
        //     config.useDefaults();
        //     config.settings.lock = true;
        //     config.settings.centerHorizontalOnly = false;
        //     config.settings.startingZIndex = 1000;
        // })
        .plugin('aurelia-validation')
        .feature('foundation-validation')
        .plugin('aurelia-i18n', (instance) => {
            instance.i18next.use(Backend);
            instance.setup({
                backend: {
                    loadPath: './locales/{{lng}}/{{ns}}.json'
                },
                lng: lng,
                attributes: ['t', 'i18n'],
                fallbackLng: 'en',
                ns: ['aurelia-starter-esnext'],
                fallbackNS: ['aurelia-starter-esnext'],
                defaultNS: 'aurelia-starter-esnext',
                debug: true
            }).then(() => {
                aurelia.setupI18NDone = true;
                setRoot(aurelia);
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

    if (environment.debug) {
        aurelia.use.developmentLogging();
    }

    if (environment.testing) {
        aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(() => {
        aurelia.setupAureliaDone = true;
        setRoot(aurelia);
    });
}
