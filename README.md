# Shared Project

AEM source for the GoAEM Shared project.

## Pre-requisites

* Java 8 (JDK 1.8)
* Maven (3.3+)

## Modules

The main parts of this Maven build are:

* goaem-bundle: Java bundle containing all core functionality like Sightly classes, OSGi services, listeners or schedulers, as well as component-related Java code such as servlets or request filters.
* goaem-view: contains the /apps (and /etc) parts of the project, ie JS&CSS clientlibs, components, templates
* goaem-config: contains runmode specific configs

## How to build

To build all the modules and deploy into AEM run this in the project root directory:

    mvn clean install -Plocal-author

Or to deploy it to a publish instance, run

    mvn clean install -Plocal-publish

## Available Build Profiles

    local-author
    local-publish

Profiles for building and installing only the bundle are the same as the ones listed above except with "-bundle" appended.

Example:

    local-author-bundle

## Configuring the Service User

The Project approval process implementation requires the creation of a service user to certain workflow steps. Much of the build will not work as intended if this user is not created.
1. Go to http://{hostname}/crx/explorer/index.jsp (System Explorer)

2. Click on User Administration

3. Click on Create System User

    1. UserID = syservice

    2. Intermediate Path should be left blank.

4. Go to http://{hostname}/useradmin

5. Search for the “syservice” user and add them to the “administrators” group.

## Front end build guide

### Code construction process

When creating new components, to have JS included into the client library automatically,
create a **folder** (just a directory, not a client library)
beneath the component called 'clientlib' and include a styles.scss file and script.js.
The first line in your script.js should be `require('./styles.scss');` to include your styles.

### Build Process

Front end code builds automatically via Maven when running any of the above profiles.

To manually build the code or run a watch go to `goaem/goaem-view/src/main/content/front-end-build` and run one of the following commands:

* **npm run build** - Builds all the JS and any required scss files and minifies them (production ready).
* **npm run dev** - Builds all the JS and any required scss files without minification.
* **npm run watch** - Runs both webpack watch and aem-front watch to monitor for changes and build when changes are made.
* **npm run watch-webpack** - Runs just the webpack watch to build files.
* **npm run watch-aem** - Runs the aem-front watch to transfer files to AEM.

### Relevant Files

All files below are located in the `front-end-build` folder in the `goaem-vew` module.

* `webpack.config.js`
 * Houses the configuration for webpack, including paths to the 'entries', which is where the new site-specific folders will live.
* `package.json`
 * Defines all the various scripts to run, dependencies, and node/npm versions.
* `shared-common-components.js`
 * Defines the path to look for all the `script.js` files. This should be used as the template for new additions to the goaem family.
