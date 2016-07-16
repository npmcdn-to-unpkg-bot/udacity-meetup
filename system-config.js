// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md
/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
var map = {
    'ng2-page-scroll': 'vendor/ng2-page-scroll/ng2-page-scroll.js',
    'moment': 'vendor/moment/moment.js',
    'angular2-moment': 'vendor/angular2-moment/index.js',
    'ng2-bootstrap': 'vendor/ng2-bootstrap/ng2-bootstrap.js',
    'bootstrap': 'vendor/bootstrap/dist',
    'angular2-google-maps': 'vendor/angular2-google-maps',
    'ng2-pagination': 'vendor/ng2-pagination/index.js',
};
/** User packages configuration. */
var packages = {
    'vendor/ng2-page-scroll': {
        defaultExtension: 'js'
    },
    'vendor/angular2-moment': {
        defaultExtension: 'js'
    },
    'vendor/ng2-bootstrap': {
        defaultExtension: 'js'
    },
    'angular2-google-maps/core': {
        main: 'index.js',
        defaultExtension: 'js'
    },
    'vendor/ng2-pagination': {
        defaultExtension: 'js'
    },
};
////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
var barrels = [
    // Angular specific barrels.
    '@angular/core',
    '@angular/common',
    '@angular/compiler',
    '@angular/forms',
    '@angular/http',
    '@angular/router',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    // Thirdparty barrels.
    'rxjs',
    // App specific barrels.
    'app',
    'app/shared',
    'app/as-navbar',
    'app/navbar',
    'app/front/front',
    'app/front/home',
    'app/front/contact',
    'app/front/components/footer',
    'app/front/components/events',
    'app/front/event',
    'app/shared/new-event',
    'app/front/components/pagination',
];
var cliSystemConfigPackages = {};
barrels.forEach(function (barrelName) {
    cliSystemConfigPackages[barrelName] = { main: 'index' };
});
// Apply the CLI SystemJS configuration.
System.config({
    map: {
        '@angular': 'vendor/@angular',
        'rxjs': 'vendor/rxjs',
        'main': 'main.js'
    },
    packages: cliSystemConfigPackages
});
// Apply the user's configuration.
System.config({ map: map, packages: packages });
//# sourceMappingURL=tmp/broccoli_type_script_compiler-input_base_path-TcPSHFyS.tmp/0/src/system-config.js.map