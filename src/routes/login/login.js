import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {AnalyzeUserDone, AuthenticateUserDone} from './../../resources/messages/user-messages';

@inject(Router, EventAggregator)
export class Login {
    loginModel = {
        userId: '',
        credentials: ''
    };
    loginViewModel = './analyze-user';

    constructor(router, eventAggregator) {
        this.router = router;
        this.eventAggregator = eventAggregator;
        this.eventAggregator.subscribe(AnalyzeUserDone, message => this.handleAnalyzeUserDone(message));
        this.eventAggregator.subscribe(AuthenticateUserDone, message => this.handleAuthenticateUserDone(message));
    }

    handleAnalyzeUserDone(message) {
        let userId = message.data.userId;
        this.loginModel.userId = userId;
        this.loginViewModel = './authenticate-user-with-credentials';
    }

    handleAuthenticateUserDone(message) {
        let userId = message.data.userId;
        let url = this.router.generate('user-info', {id: userId});
        this.router.navigate(url);
    }
}
