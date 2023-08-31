# Memory app

> App based on the popular game called Memory or Concentration. Pick one, and try not to forget.

| Preview                       |
|-------------------------------|
| https://memory-app.pages.dev/ |


## How to run

```sh
# install dependencies
pnpm install

# start dev server
pnpm start
```

## About Deployment

Deployment was possible with the CI/CD pipeline built on GitHub actions and Nx commands. It uses Cloudflare pages for hosting, which offer a preview of your changes and production-like deployments for your products.

On the other hand, the CI/CD pipeline is breaking into two jobs:
Test (CI) and Publish (CD)

For the Test job, the GitHub job downloads our repository, checkout or branch, setup node, and pnpm (as package manager), calculates sha commit for running affected commands (useful to run only changes based on target branch), then run lint, test and build command, finally upload app bundle as a job artifact.

For the published job, the GitHub job downloads our app bundle (uploaded in the previous job), retrieves our current branch name, and uses official Cloudflare action to deploy a new preview (in case of PR) or new production deployment.