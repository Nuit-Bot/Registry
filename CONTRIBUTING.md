# Add your own module to the Nuit registry

## Prerequisites

- Must be in a Github repo under an account or organization
- Must use the [GNU Affero General Public License (AGPL)](https://www.gnu.org/licenses/agpl-3.0.en.html)
- Must have at least one commit
- Must be available for free

## How to add

1. Make a PR that edits [`registry.json`](./registry.json)

2. Use the [`template.json`](./template.json) to add your module's details to the file

- The `id` field should be a unique text ID that can be used to identify the module
- The `repo` field should contain the URL to the Github repo
- The `commit` field should contain a commit hash from the primary branch of the repo. Commit must be stable
- The `author` field should contain the author name (doesn't need to match repo creator)

3. Wait for a review

> [!NOTE]
> The review process may take a few hours to a few days depending on repo size
