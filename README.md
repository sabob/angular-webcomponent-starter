# Angular WebComponent Project

## Description

This project is a starter for building Angular apps and either standalone or web components.

## Installation

To install the necessary dependencies, run:

```sh
npm install
```

## Angular vs. Web Component (WC)

Whether an app runs as an Angular app or WC, is determined by the
index.html and environment.ts. The `package.json` file has scripts to
start the app in either mode. This is done by copying the correct
`index.html` or `environment.ts` file associated with the required mode.

### Angular Application

A full-fledged Angular application typically includes routing, services, and multiple components.

An Angular application changes the url based on the selected route.

### Web Component (WC)

A Web Component (WC) is a reusable custom element that can be embedded in any
HTML page. It is built using Angular's `@angular/elements` package, which 
allows Angular components to be packaged as web components. 
This makes it possible to use Angular components outside of an 
Angular application.

A WC does not have control over the url and hence won't change the url
when navigating between routes.

The behaviour is controlled through the variable `skipLocationChange` on
the class, `Properties.ts`
`skipLocationChange` is set to true/false depending on the mode, `normal`
or `wc`.

when using the `routerLink` attribute to navigate routes, set
the option `skipLocationChange` eg:
`<a [routerLink]="['/page1']" [skipLocationChange]="properties.skipLocationChange"> Page1</a>`

or programmatically with:

`this.router.navigate(['/some-path'], { skipLocationChange: properties.skipLocationChange });`


Because the url don't change, the browser forward and back buttons
and F5 won't work as expected.

## Running Angular vs. WC Usage

### Running Angular Application

```sh
npm run start
```

This command starts the Angular development server and serves the application at http://localhost:4200/.

### Running Web Component (WC) Application

```sh
npm run wc:start
```

This command builds the web component, serves it using http-server, and opens the browser to http://localhost:7080/.

## Project Layout and Package Structure

The project follows the Angular [Angular Style Guide](https://angular.dev/style-guide)
for package structure, organizing the code into core, feature, and shared modules.

### Key Files and Their Roles

- src/index/index.html: The main HTML file for the Angular application. It includes an Angular tag <my-ng>
- src/index/wc-index.html: The WC HTML file. It includes the WC component tag, <my-wc>
- src/main.ts: The main entry point for the Angular application. It includes logic to bootstrap the application either as a standard Angular app or as a web component.
- src/app/page2.component.ts: A standalone Angular component with its own template and styles.

## package.json Overview

The package.json file defines the project's dependencies, devDependencies, and various npm scripts.

The package.json file contains several scripts for managing the Angular project and building it as a web component (WC). Here is a breakdown of the scripts and their purposes:

## Angular Scripts

### Setup Scripts

- **copy-index**: Copies `ng-index.html` from `src/index` to the `src/index.html` location.
- **copy-env-dev**: Copies the development environment configuration (`environment-dev.ts`) to `src/environments/environment.ts`.
- **copy-env-prod**: Copies the production environment configuration (`environment.prod.ts`) to `src/environments/environment.ts`.
- **setup-files**: Prepares the necessary files by running `copy-index` and `copy-env-dev` concurrently.

### Build and Serve Scripts

- **ng**: Runs Angular CLI commands.
- **start**: Sets up the necessary files and starts the development server, opening the app in the browser.
- **build**: Builds the project for production, setting up the necessary files and outputting to the `dist/ng` directory.
- **watch**: Builds the project in watch mode for development. Automatically rebuilds the app on source code changes.
- **serve**: Starts the Angular development server and opens the app in the browser with the development configuration.
- **test**: Runs the unit tests using Jasmine and Karma.

### Distribution Scripts

- **dist:serve**: Serves the built Angular app from the `dist/ng/browser` directory using `http-server`, with proxying configured to `http://localhost:7080/?`.
- **dist:start**: Runs the build, serve, and open commands for the production build of the Angular app concurrently. Builds the app, serves it, and opens it in the browser.
- **dist:open**: Opens the production build of the app in the browser at `http://localhost:7080/`.

## Web Component (WC) Scripts

### Setup Scripts

- **wc:copy-index**: Copies the `wc-index.html` file to the `src/index.html` location for the web component.
- **wc:copy-env-dev**: Copies the web component development environment configuration (`environment.wc-dev.ts`) to `src/environments/environment.ts`.
- **wc:copy-env-prod**: Copies the web component production environment configuration (`environment.wc-prod.ts`) to `src/environments/environment.ts`.
- **wc:setup-files**: Prepares the necessary files for the web component by running `wc:copy-index` and `wc:copy-env-dev` concurrently.

### Build and Serve Scripts

- **wc:build**: Builds the web component for production, setting up necessary files and outputting to the `dist/wc` directory.
- **wc:start**: Runs the web component setup, build, and serve commands concurrently, starting the development environment for the web component.

### Distribution Scripts

- **wc:dist:serve**: Serves the built web component from the `dist/wc/browser` directory using `http-server`, with proxying configured to `http://localhost:7085/?`.
- **wc:dist:start**: Runs the build, serve, and open commands for the web component concurrently. Builds the web component, serves it, and opens it in the browser.
- **wc:dist:open**: Opens the web component in the browser at `http://localhost:7085/`.

### main.ts Overview

The main.ts file contains logic to bootstrap the Angular application. It checks if the application should run as a web component and configures the application accordingly. If running as a web component, it creates a custom element from the AppComponent and defines it as my-wc. If not, it bootstraps the application normally.

### app.config.ts Overview

The app.config.ts file (referred to as appConfig in main.ts) contains the configuration for the Angular application, including providers and routes. It is extended in main.ts to include additional router configurations when not running as a web component.

### Routes

The application provides routes with guard and resolver configurations.

