# Deployment Information

The `Shell` service is hosted on TEvo 1.0 EKS clusters.

- `staging`: TEvo 2 Dev Cluster
- `sandbox`: TEvo 2 Dev Cluster
- `prod`: TEvo 2 Prod Cluster

## Guidelines Production Deploy Timing

### Monday, Tuesday, Wednesday, Thursday

If it is one of these days you are free to deploy at any time as long as:

1. You are doing it during standard EST business hours.
1. There is at least one member of Devops team available that can assist
   should something go wrong outside of the code changes.
1. The app is at a stable level (meaning no spikes in traffic, database CPU
   levels are normal, etc...)

Hot fixes and other changes might warrant exceptions to the above points, at
your discretion. You should always ask yourself if the **business value** of
this change is worth the risk introduced by deploying the change.

### Friday

Fridays are typically our busiest days in terms of sales and traffic which
means the highest volume of traffic, so

> “unless it adds value to the business, and makes us more money, there's no
> need for a friday deploy.”
> <br />_—Management_

Get clearance from business, product, and leads before deploying a new version of
the `Shell` service to production.

### Saturday, Sunday

Don't unless absolutely necessary, and follow the rules of **Friday** if so by
getting approval from the appropriate people.

## CI, deploy pipeline and verification

CI lives in [semaphore](https://ticketevolution.semaphoreci.com/projects/shell), auth is your github tevo account.

For each build that runs after a merge to `main` branch there would be a link to semaphore pipeline in [#eng-cicd](https://tevo.slack.com/archives/C02M34LQU2C) channel. For all other build link to the pipeline could be found on the github PR.

Once the `Build Image` job of CI is finished (specifically the `bin/ci/tag_build` step), a deploy of the image could be achieved using the slack bot `@tebot` in the [#eng-cicd](https://tevo.slack.com/archives/C02M34LQU2C) channel. `@tebot help` for list of commands.

### General overview of the process

More specific commands are listed in the Environments section of this doc:

- `@tebot build <branch_name> for shell to staging` - to verify in `staging` environment, known hostnames are listed below.

- `@tebot release shell next version` - once you're ready to deploy main branch to `sandbox`. Will create new patch-release-candidate release branch and deploy it.

- `@tebot release shell version <major.minor.patch>` - for manual increment. Versioning is semantic, not synced with project.json, `@tebot history shell in sandbox` to find the last deployed version and go from there.

- `@tebot promote shell from sandbox to prod` - to do a `prod` release of the last `sandbox` container, there is no prod at the time of writing.

`@tebot` should respond with `Successfully copied...` and `...successfully deployed...` once done with the deploy.

### Deploy bot logs

You can verify what's going on with the deploy in the [datadog logs](https://app.datadoghq.com/logs?query=service%3Adeploybot) for the bot.

### Domains routing

This app is designed to open on different domains with percievable content differences. Domains for `staging` and `sandbox` are managed in kubernetes ingress. `Production` domains would be managed by clients, this mechanism is no present at the time of writing.

List of known domains for testing is listed in the Environments section of this doc.

## Environments

### Staging

As feature branches are worked on, they can be deployed to `staging` at any time.
Current agreement is to announce deploys in the [#shell](https://tevo.slack.com/archives/C017W2J5F26) slack channel.

Once the CI for a commit PR has finished the `tag_build` step, you can deploy using `@tebot`
in the [#eng-cicd](https://tevo.slack.com/archives/C02M34LQU2C) slack channel like so:

    `@tebot build <branch_name> for shell to staging`

This will deploy the branch to the `staging` environment, or tell you if there are errors.

#### Known staging domains

https://shell.staging.tevo.com/

#### Container Logs

Application logs for staging are in [DataDog](https://app.datadoghq.com/logs?query=service%3Ashell%20kube_namespace%3Astaging)

### Sandbox

Sandbox is a protected environment, thus direct deploys are not possible. To deploy to this environment,

1. Merge your approved and tested PR into the `main` branch
1. Wait for CI to finish the `tag_build` step
1. **Release** a new version following semantic versioning rules with `@tebot` like so:

   `@tebot release shell version <major.minor.patch>`
   or
   `@tebot release shell next version`

### Known sandbox domains

https://shell.sandbox.tevo.com/
https://tickets.sandbox.tevo.com/

#### Versioning

Versioning is semantic, not synced in to `package.json`, `@tebot history shell in sandbox` to find the last deployed version and go from there.

We should update `package.json` when possible to keep them aligned, though not a requirement.

#### Container Logs

Application logs for sandbox are in [DataDog](https://app.datadoghq.com/logs?query=service%3Ashell%20kube_namespace%3Asandbox)

### Production

Prod is a protected environment, thus direct deploys are not possible. To deploy to this environment,

1. Make a release in sandbox
1. Ensure the release is tested in sandbox
1. Announce a deploy in the [#eng-deploys](https://tevo.slack.com/archives/C12NWQE5T) slack channel
1. **Promote** a new version to prod with `@tebot` like so:

   `@tebot promote shell from sandbox to prod`

1. Notify [#eng-deploys](https://tevo.slack.com/archives/C12NWQE5T) slack channel once the deploy has completed

### Release Candidates

Release candidates builds are tested in the `sandbox` environment.

## Rollbacks Checklist

1. Notify [#eng-deploys](https://tevo.slack.com/archives/C12NWQE5T) slack channel about rollback
1. Get `revision` of the release you want to roll back to:

   `@tebot history shell in prod`

1. Rollback production to the previous revision

   `@tebot rollback shell in prod to <revision>`

1. Notify [#eng-deploys](https://tevo.slack.com/archives/C12NWQE5T) slack channel once the rollback has completed
