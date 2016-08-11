// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'ng2-page-scroll': 'vendor/ng2-page-scroll/ng2-page-scroll.js',
  'moment': 'vendor/moment/moment.js',
  'angular2-moment': 'vendor/angular2-moment/index.js',
  'ng2-bootstrap': 'vendor/ng2-bootstrap/ng2-bootstrap.js',
  'bootstrap': 'vendor/bootstrap/dist',
  'ng2-select': 'vendor/ng2-select/ng2-select.js',
  'angular2-google-maps': 'vendor/angular2-google-maps',
  'ng2-pagination': 'vendor/ng2-pagination/index.js',
  'ng2-slim-loading-bar': 'vendor/ng2-slim-loading-bar'
};

/** User packages configuration. */
const packages: any = {
  'vendor/ng2-page-scroll': {
    defaultExtension: 'js'
  },
  'vendor/angular2-moment': {
    defaultExtension: 'js'
  },
  'vendor/ng2-bootstrap': {
    defaultExtension: 'js'
  },
  'angular2-google-maps/core':  {
    main: 'index.js',
    defaultExtension: 'js'
  },
   'vendor/ng2-pagination': {
    defaultExtension: 'js'
  },
  'vendor/ng2-select': {
    defaultExtension: 'js'
  },
  'ng2-slim-loading-bar':  {
    main: 'index.js',
    defaultExtension: 'js'
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
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
  'app/shared/components/new-event',
  'app/front/components/pagination',
  'app/shared/components/sign-in-up',
  'app/shared/components/auth-container',
  'app/shared/components/input',
  'app/shared/components/form',
  'app/shared/components/form-element',
  'app/shared/components/datepicker',
  'app/shared/components/textbox',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

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
System.config({ map, packages });
