import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {Config} from "../common/config";

// polyfill fetch client conditionally
const fetch = !self.fetch ? System.import("isomorphic-fetch") : Promise.resolve(self.fetch);

@inject(HttpClient, Config)
export class UserService {
    isRequesting = false;

    constructor(http, config) {
        this.config = config;
        http.configure(cfg => {
            cfg
                .useStandardConfiguration()
                .withBaseUrl(config.baseApiUrl + 'user/')
                .withDefaults({
                    headers: {
                        'content-type': 'application/json',
                        'Accept': 'application/json',
                        'X-Requested-With': 'Fetch'
                    }
                })
                .withInterceptor({
                    request(request) {
                        console.log('Intercepted request using method: ${request.method} with URL: ${request.url}');
                        return request;
                    },
                    response(response) {
                        console.log('Intercepted response ${response.status} using URL: ${response.url}');
                        return response;
                    }
                });
        });

        this.http = http;
    }

    analyze(user) {
        this.isRequesting = true;
        return this.http.fetch('analyze', {
            method: 'post',
            body: json(user)
        });
    }

    authorize(user) {
        return this.http.fetch('authorize', {
            method: 'post',
            body: json(user)
        })
    }
};
