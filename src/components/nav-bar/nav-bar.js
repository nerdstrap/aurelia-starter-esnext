import {bindable} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {InMemoryUserService} from './../../services/in-memory-user-service';

export class NavBar {
    static inject() {
        return [InMemoryUserService];
    }

    @bindable router = null;

    constructor(api) {
        this.api = api;
    }

}
