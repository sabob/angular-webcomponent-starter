# Angular WebComponent Project

## Description

This project is a starter for building Angular apps and either standalone or web components.

## Installation

To install the necessary dependencies, run:

```sh
npm install
```

## Usage

The package.json file contains several scripts for managing the Angular project and building it as a web component (WC). Here is a breakdown of the scripts and their purposes:

## Angular Scripts

- **ng**: Runs Angular CLI commands.
- **start**: Starts the development server and opens the browser.
- **build**: Builds the project for production.
- **watch**: Builds the project in watch mode for development.
- **test**: Runs the tests.

## Web Component (WC) Scripts

- **wc:build**: Builds the project as a web component and watches for changes. It runs two commands concurrently: copying the `wc-index.html` file to the `dist` directory and building the Angular project with production configuration.
- **wc:copy-index**: Copies the `wc-index.html` file to the `dist` directory.
- **wc:serve**: Serves the built web component using `http-server`.
- **wc:start**: Runs the build, serve, and open commands for the web component concurrently.
- **wc:open**: Opens the browser to the web component URL.

## Angular vs. Web Component (WC)

### Angular Application

A full-fledged Angular application typically includes routing, services, and multiple components. It is bootstrapped using Angular's `platformBrowserDynamic` and runs as a single-page application (SPA).

### Web Component (WC)

A web component is a reusable custom element that can be embedded in any HTML page. It is built using Angular's `@angular/elements` package, which allows Angular components to be packaged as web components. This makes it possible to use Angular components outside of an Angular application.

### Example of Angular vs. WC Usage

#### Angular Application

```sh
ng serve
```

This command starts the Angular development server and serves the application at http://localhost:4200/.

#### Web Component (WC)

```sh
npm run wc:start
```

This command builds the web component, serves it using http-server, and opens the browser to http://localhost:7080/.

## Project Layout and Package Structure

The project follows the Angular style guide for package structure, organizing the code into core, feature, and shared modules.

### Key Files and Their Roles

- src/index.html: The main HTML file for the Angular application. It includes an Angular component <my-ng>
- src/main.ts: The main entry point for the Angular application. It includes logic to bootstrap the application either as a standard Angular app or as a web component.
- src/app/page2.component.ts: A standalone Angular component with its own template and styles.

### package.json Overview

The package.json file defines the project's dependencies, devDependencies, and various npm scripts.

### main.ts Overview

The main.ts file contains logic to bootstrap the Angular application. It checks if the application should run as a web component and configures the application accordingly. If running as a web component, it creates a custom element from the AppComponent and defines it as my-wc. If not, it bootstraps the application normally.

### app.config.ts Overview

The app.config.ts file (referred to as appConfig in main.ts) contains the configuration for the Angular application, including providers and routes. It is extended in main.ts to include additional router configurations when not running as a web component.

### Routes

The application provides routes with guard and resolver configurations.
