module.exports = function() {

    var client = './client/';
    var clientApp = client + 'app/';
    var temp = './tmp/';
    var dev = './output/dev/';
    var prod = './output/prod/';
    var paths = ['!./output/prod/node_modules', '!./output/prod/bower_components'];
    var tsPaths = ['app/', 'typings/globals', "typings/modules"];

    var config = {
        temp: temp,
        env: {
            dev: dev,
            prod: {
                root: prod,
                client: prod + 'client/',
            },
            exclude: paths,
            ts: tsPaths
        },
        cssprod: [prod.client + 'assets/css/main.css'],
        nodeDep: {
            client: ['./node_modules/express/**/*.*'],
            production: prod + 'node_modules/express'
        },
        jsprod: [prod.client + 'js/app.js', prod.client + 'js/templates.js', prod.clien + 'js/vendor.js'],
        alljs: [
            './client/**/*.js',
            './*.js'
        ],
        client: client,
        css: [client + 'assets/css/main.css'],
        index: client + 'index.html',
        _index: client + '_index.html',
        devIndex: dev + 'index.html',
        fonts: client + 'assets/fonts/**/*.*',
        i18n: client + 'assets/i18n/**/*.*',
        htmltemplates: [client + './**/*.html',
            '!index.html',
            '!bower_components/**/*.html',
            '!node_modules/**/*.html'
        ],
        images: client + 'assets/images/**/*.*',
        scripts: client + 'assets/scripts/**/*.js',
        js: [
            clientApp + '**/app.js',
            clientApp + '**/bootstrapper.js',
            clientApp + '**/*common*.module.js',
            clientApp + '**/*.module.js',
            clientApp + '**/scripts/*.js',
            clientApp + '**/models/**/*.js',
            clientApp + '**/constants/**/*.js',
            clientApp + '**/factories/**/localize-factory.js',
            clientApp + '**/services/**/data-service.js',
            clientApp + '**/services/**/*data-service.js',
            clientApp + '**/services/**/*.js',
            clientApp + '**/factories/**/*.js',
            clientApp + '**/controllers/**/*base-controller.js',
            clientApp + '**/controllers/**/details-controller.js',
            clientApp + '**/controllers/**/*list-controller.js',
            clientApp + '**/directives/**/*.js',
            clientApp + '**/controllers/**/*.js',
            clientApp + '**/*.js'
        ],
        output: {
            js: 'all.js'
        },
        sass: [client + 'assets/css/main.scss'],
        bower: {
            json: require('./bower.json'),
            directory: './client/bower_components/',
            ignorePath: '../..'
        },
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'AgenceApp',
                standalone: false,
                root: ''
            }
        },
        mainBowerFiles: ["pace.min.js"],
        modules: [
            './node_modules/**'
        ],
        otherDependencies: [],
        server: [
            client + '/favicon.ico',
            client + '/iisnode.yml',
            './web.config',
            './routes.js',
            './server.js',
            './package.json',
        ]
    };

    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };

        return options;
    };

    return config;
};