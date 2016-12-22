import {inject, computedFrom} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ValidationControllerFactory, ValidationController, ValidationRules} from 'aurelia-validation';
import {InMemoryUserService} from './../../services/in-memory-user-service';
import {AnalyzeUserDone} from './../../resources/messages/user-messages';

@inject(Router, EventAggregator, ValidationControllerFactory, InMemoryUserService)
export class AnalyzeUser {
    userId;
    userIdHasFocus = true;
    controller = null;
    api = null;

    constructor(router, eventAggregator, controllerFactory, api) {
        this.router = router;
        this.eventAggregator = eventAggregator;
        this.controller = controllerFactory.createForCurrentScope();
        this.api = api;
    }

    activate(model) {
        this.userId = model.userId;
    }

    @computedFrom('userId')
    get isAnalyzeUserEnabled() {
        let userId = this.userId;
        return userId;
    }

    analyzeUser() {
        let errors = this.controller.validate();
        let sessionId = '__sessionId';
        let transactionId = '__transactionId';
        let deviceTokenCookie = '__deviceTokenCookie';
        let userId = this.userId;
        this.api.analyzeUser(sessionId, transactionId, deviceTokenCookie, userId)
            .then(response => {
                this.eventAggregator.publish(new AnalyzeUserDone(response));
            });
    }
}

ValidationRules
    .ensure(a => a.userId).required()
    .on(AnalyzeUser);
