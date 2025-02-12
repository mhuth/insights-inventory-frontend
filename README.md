[![Build Status](https://app.travis-ci.com/RedHatInsights/insights-inventory-frontend.svg?branch=master)](https://app.travis-ci.com/RedHatInsights/insights-inventory-frontend) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![GitHub release](https://img.shields.io/github/release/RedHatInsights/insights-inventory-frontend.svg)](https://github.com/RedHatInsights/insights-inventory-frontend/releases/latest) [![codecov](https://codecov.io/gh/RedHatInsights/insights-inventory-frontend/branch/master/graph/badge.svg?token=XC4AD7NQFW)](https://codecov.io/gh/RedHatInsights/insights-inventory-frontend)

# Insights Inventory Frontend

This is the frontend application for [Insights Inventory](https://github.com/RedHatInsights/insights-inventory). It is based on the [insights-frontend-starter-app](git@github.com:RedHatInsights/insights-frontend-starter-app.git).

## First time setup

### Quick start

1. Make sure you have [`Node.js`](https://nodejs.org/en/) (current LTS) and [`npm`](https://www.npmjs.com/) installed.
2. Run [script to patch your `/etc/hosts`](https://github.com/RedHatInsights/insights-proxy/blob/master/scripts/patch-etc-hosts.sh).
3. Make sure you are using [Red Hat proxy](http://hdn.corp.redhat.com/proxy.pac).

## Running locally

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Run development server with `npm run start:proxy:beta`. See `dev.webpack.config.js` and `package.json` (npm scripts) for more options and parameters available.
4. Local version of the app will be available at `https://stage.foo.redhat.com:1337/preview/insights/inventory/`. If you run with slightly different setup (for example, using production environment), you should still see the generated URL in your terminal, the webpack script output.

## Testing your changes

We use Jest with React Testing Library to write unit tests. For larger pieces of code or components, we utilize Cypress. For testing commands shortcuts (like `npm run test`, `npm run test:ct`, etc.), take a look at the package.json file which lists available scripts.

Before opening a pull request, you can run `npm run verify:local` to make sure your changes pass automated tests (Jest and Cypress) and linter (both JS and CSS linters). We also execute [husky](https://typicode.github.io/husky/) hooks with every commit to make sure the changes pass basic lint checks.

## Commit conventions

In order to keep our commits style consistent and the commits history easy to read, we utilize [semantic-release](https://github.com/semantic-release/semantic-release) which follows [Angular Commit Message Conventions](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#-commit-message-format). Also, there is a commitlint check run on master, master-stable, prod-beta and prod-stable branches which ensures that all the commits meet the expected format (`<type>(<scope>): <short summary>`). Following this standard and specifying at least the type and summary for each commit helps to automatically generate a changelog of changes.

## Running with another app

Applications on console.redhat.com are webpack federated modules, and you are able to deploy some of them locally. This helps to see if new changes work well in terms of integration.

If you want to see local changes to any of the Inventory components, and see how it behaves with other applications (like, for example, Inventory table is imported in Advisor), you will have to run both Inventory and desired application. 

### Example

We'll take for example [insights-advisor-frontend](https://github.com/RedHatInsights/insights-advisor-frontend) application as app that uses system detail.

Open new terminal and navigate to desired application (for instance insights-advisor-frontend) and run it (make sure to run it on a different port):
```
npm run start:proxy -- --port=8003
```

Run the Inventory application with proxy enabled and list of additional applications:
```
LOCAL_API=advisor:8003~https npm run start:proxy
```

Or, if you want to run Advisor and, for instance, Vulnerability, then just add a new entry to LOCAL_API:
```
LOCAL_API=advisor:8003~https,vulnerability:8004
```

## Mocking Inventory API

This is one of the advanced methods to test frontend locally without waiting for API to have desired endpoints available. 

Inventory frontend has support for https://github.com/stoplightio/prism CLI. The CLI reads the OpenAPI schema, spins up a localhost server and serves dynamically generated responses for Inventory API endpoints (/hosts, /groups, etc.).

1. Verify package.json `config` section for the correct URL to OpenAPI schema (contains remote URL by default).
2. Verify dev.webpack.config.js `customProxy` settings. There you can specify which endpoints to proxy and modify request/response headers.
3. Run `npm run mock-server` to start the mock server. The fist output must list the endpoints that are generated by the localhost server.
4. In another terminal, run `npm run start:mock` or `npm run start:mock:beta` to start the webpack server either in stage-stable or stabe-beta environment. The scripts set the MOCK variable to true and the customProxy is enabled.

## Inventory table and detail

We are serving inventory through federated modules, this means both inventory table and inventory detail is served to you in runtime. No need to install and rebuild when something changes in inventory.

### Applications using InventoryTable

These applications import `InventoryTable` component through federated modules:

- [vulnerability-ui](https://github.com/RedHatInsights/vulnerability-ui)
- [insights-remediations-frontend](https://github.com/RedHatInsights/insights-remediations-frontend)
- [sed-frontend](https://github.com/RedHatInsights/sed-frontend)
- [tasks-frontend](https://github.com/RedHatInsights/tasks-frontend)
- [compliance-frontend](https://github.com/RedHatInsights/compliance-frontend)
- [patchman-ui](https://github.com/RedHatInsights/patchman-ui)
- [malware-detection-frontend](https://github.com/RedHatInsights/malware-detection-frontend)
- [drift-frontend](https://github.com/RedHatInsights/drift-frontend)
- [ros-frontend](https://github.com/RedHatInsights/ros-frontend)
- [insights-advisor-frontend](https://github.com/RedHatInsights/insights-advisor-frontend)
- [edge-frontend](https://github.com/RedHatInsights/edge-frontend)

## Documentation Links

* Components
  * [inventory](https://github.com/RedHatInsights/insights-inventory-frontend/blob/master/doc/inventory.md)
    * [props table](https://github.com/RedHatInsights/insights-inventory-frontend/blob/master/doc/props_table.md)
    * [props detail](https://github.com/RedHatInsights/insights-inventory-frontend/blob/master/doc/props_detail.md)
    * [custom fetch function](https://github.com/RedHatInsights/insights-inventory-frontend/blob/master/doc/custom_fetch.md)
    * [hide filters](https://github.com/RedHatInsights/insights-inventory-frontend/blob/master/doc/hide_filters.md)
    * [general info tab](https://github.com/RedHatInsights/insights-inventory-frontend/blob/master/doc/general_info.md)
  * [inventory_header](https://github.com/RedHatInsights/insights-inventory-frontend/blob/master/doc/inventory_header.md)
