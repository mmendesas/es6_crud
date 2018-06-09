exports.config = {

    //Change to 'true' if you need to run in a non-angular-website
    onPrepare: function () {
        browser.ignoreSynchronization = true;
    },

    //wait for angular
    allScriptsTimeout: 99999,

    //wait for page load
    getPageTimeout: 60000,

    // The address of a running selenium server.
    // use the webdriver-manager with params: update and start
    // or execute a dockerized selenium and pass the correct address here
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        browserName: 'chrome'
    },

    framework: 'custom',  // set to "custom" instead of cucumber.

    frameworkPath: require.resolve('protractor-cucumber-framework'),  // path relative to the current config file

    // Spec patterns are relative to the current working directly when protractor is called.
    specs: [
        'test/**/*.feature'
    ],

    // Options to be passed to Cucumber.
    cucumberOpts: {
        // Require files before executing the features.
        require: [
            //use this to define your own custom steps
            'test/step-defs/**/*.js',
            'test/support/**/*.js',

            // walnutjs            
            'node_modules/walnutjs/src/step_defs/**/*.js',
            'node_modules/walnutjs/src/support/**/*.js'
        ],
        // Only execute the features or scenarios with tags matching @dev.
        // This may be an array of strings to specify multiple tags to include.
        tags: '@simple_web',

        // How to format features (progress, summary, pretty, json)
        format: 'pretty',
    },

    resultJsonOutputFile: './test/results.json',

    walnutjsOpts: {
        projectName: 'es6-crud',               //default is qaaut-test
        enableDebugLog: false,                 //default is disabled
        waitElementTimeout: 20000,             //default is 10000
        locatorsPath: './test/locators'
    }
};