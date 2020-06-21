# Frontend-FG Expense Tracker
# Git Work flow
Here is the proposed gitflow:

For every feature, bug or chore you must create a new branch.

Example of a feature?

Landing page: your naming must follow this convention: feat/landing-page (lowercase and separated by dashes)

Example of a bug?

Home page typo: Your branch naming: bug/homepage-typo

Example of chore

Update Read Me: Your branch naming: chore/update-readme

Once you are assigned a task, create a branch on your local git and only push to that branch. If you push to any other branch you will be heavily penalized.

A typical way to do so:

run: git pull origin develop - You must pull from develop before or after checkout.

git checkout -b feat/user-login - You are in the feat/user-login branch now

To push to github;

git add .

git commit -m "feat: implemented user login

git push origin feat/user-login - note how it ends with a branch.

# On github, you must make a PR to the develop branch, any PR to the master branch must be closed immediately.

Your commit message should follow a consistent pattern:

For a feature: git commit -m "feat: implemented landing page"

For a bug: git commit -m "bug: corrected typo"

For a chore: git commit -m "chore: updated readme"

# To prevent merge conflict always pull from develop branch before making a PR.
# When creating a new PR please add screenshots of your implemented work showing its responsiveness to the description of the PR.
THANKS
