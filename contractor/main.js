import {I18N} from 'aurelia-i18n';
import Backend from 'i18next-xhr-backend';
import 'fetch';
import environment from './environment';

export function configure(aurelia) {
	aurelia.use
        .standardConfiguration()
        .feature('resources')
        .plugin('aurelia-validation');
    
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
				loadPath: './locales/{{lng}}/{{ns}}.json',
			},

			lng: 'en',
			attributes: ['t', 'i18n'],
			fallbackLng: 'en',
			debug: true
		});
	});

    aurelia.start()
        .then(() => aurelia.setRoot('shell/shell'))	
 	    .then(a=> {	
 	        $(document).foundation();	
 	    });	

}
