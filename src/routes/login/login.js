import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {AnalyzeUserDone, AuthenticateUserDone} from './../../resources/messages/user-messages';

@inject(Router, EventAggregator)
export class Login {
    loginViewModel = './analyze-user';

    constructor(router, eventAggregator) {
        this.router = router;
        this.eventAggregator = eventAggregator;
        this.eventAggregator.subscribe(AnalyzeUserDone, response => this.handleAnalyzeUserDone(response));
        this.eventAggregator.subscribe(AuthenticateUserDone, response => this.handleAuthenticateUserDone(response));
    }

    handleAnalyzeUserDone(response) {
        // TODO: pass response to the changed view
        this.loginViewModel = './authenticate-user-with-credentials';
    }

    handleAuthenticateUserDone(response) {
    }
}
