module.exports = {
    "list": [
        "index.html",
        "system.config.js",
        "favicon.ico",
        "LICENSE",
        "jspm_packages/system.js",
        "jspm_packages/system-polyfills.js",
        "jspm_packages/system-csp-production.js",
        "styles/app.css"
    ],
    // this section lists any jspm packages that have
    // unbundled resources that need to be exported.
    // these files are in versioned folders and thus
    // must be 'normalized' by jspm to get the proper
    // path.
    'normalize': [
        [],
        [
            'bluebird', [
            '/js/browser/bluebird.min.js'
        ]
        ]
    ]
};
