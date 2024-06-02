# Polymesh Developer Portal

## Servers & live website
`mainnet`, `testnet`, and `staging` branches are deployed automatically
* testnet: [https://testnet-developers.polymesh.live/](https://testnet-developers.polymesh.live/) (testnet website)
* testnet: [https://developers.polymesh.live/](https://developers.polymesh.live/) (testnet website; secondary url)
* mainnet: [https://mainnet-developers.polymesh.network/](https://mainnet-developers.polymesh.network/) (mainnet website)
* mainnet: [https://developers.polymesh.network/](https://developers.polymesh.network/) (mainnet website; secondary url)

## Project Setup

### Requirements
To run and build, this project requires [npm](https://www.npmjs.com/get-npm)

### Setup
Run `npm install` to install.

### Local development server
Start the local server with `npm run develop` - live reload is enabled

The local server will then be reachable on [http://localhost:8000/](http://localhost:8000/) and the graphql explorer on [http://localhost:8000/___graphql](http://localhost:8000/___graphql)

For debugging, use `npm run develop --verbose`

### Build
To build the deployable website, run `npm run build`. This will create the output package in the `/public` folder.

### Known issues
* Gatsby is now using an advanced caching mechanism on local development (which is great!). Sometimes, you might need to clear the cache manually if you don't see assets (images), config updates or some included resources (like the menu) updating. To clean, run: `npm run clean`.
* Production builds on an empty cache may fail with a message "error [BABEL] Note: The code generator has deoptimised the styling of [...]". This is actually just a warning, but reporting (and returning) as error. The fix is to re-run the build process again.

### Notes
* When updating the gatsby configuration, you need to restart the server. There is now a message that will appear in the Browser, notifying you about this.
* Run and build tested on osx, unix and WSL
* You can skip the automatic deployment of a commit by adding [CI Skip] to the commit message

## Information for content creators
You can find a markdown file in `features/feature_test.mdx` which demonstrates the use of all Markdown features and additional components. (This file will is not linked in the menu).

## Update workflow & Review process
We use feature branches, named as `xx-feature-description`, where `xx` are the name initials. Once the change on the feature branch has been completed, a **PR towards `develop` should be opened.** From develop, the repository maintainers will open a PR towards staging and make sure all changes have been reviewed. (If a change has already been approved on the initial PR into develop, no repeated review for this change is necessary).

**All content updates must be approved by the Polymath team (adamdossa) before being pushed to staging, testnet, and mainnet.**
