import {inject, computedFrom} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {ValidationControllerFactory, ValidationController, ValidationRules} from 'aurelia-validation';
import {EventAggregator} from 'aurelia-event-aggregator';
import {InMemoryUserService} from './../../services/in-memory-user-service'
import {AnalyzeUserDone} from './../../resources/messages/user-messages';

@inject(Router, ValidationControllerFactory, EventAggregator, InMemoryUserService)
export class AnalyzeUser {
    userId;
    userIdHasFocus = true;
    controller = null;
    api = null;

    constructor(router, controllerFactory, eventAggregator, api) {
        this.router = router;
        this.controller = controllerFactory.createForCurrentScope();
        this.eventAggregator = eventAggregator;
        this.api = api;
    }

    @computedFrom('userId')
    get isAnalyzeUserEnabled() {
        let userId = this.userId;
        return userId;
    }

    analyzeUser() {
        let errors = this.controller.validate();
        this.api.analyzeUser(this.userId)
            .then(response => {
                this.eventAggregator.publish(new AnalyzeUserDone(response));
            })
            .catch(error => {
                this.eventAggregator.publish(new AnalyzeUserDone({
                    "sessionId": "__session",
                    "userId": this.userId,
                    "deviceData": "__devicedata",
                    "actionCode": "VERIFIED",
                    "credentialTypes": ["Password"],
                    "success": true
                }));
            });
    }
}

ValidationRules
    .ensure(a => a.userId).required()
    .on(AnalyzeUser);
