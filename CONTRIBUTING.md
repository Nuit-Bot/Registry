# Add your own module to the Nuit registry

## Prerequisites

- Must be in a Github repo under an account or organization AND published to npm
- Must use the [GNU Affero General Public License (AGPL)](https://www.gnu.org/licenses/agpl-3.0.en.html) or have no license specified
- Must have at least one commit
- Must be available for free

## How to add

1. Make a PR that edits [`registry.json`](./registry.json)

2. Use the [`template.json`](./template.json) to add your module's details to the file

- The `package` field should be the npm package's name
- The `description` field should be a short description of the module
- The `tags` field should be an array of tags for the module
- The `commit` field should be the full SHASUM from the Git head
- The `author` field should be the author name (doesn't need to match repo creator)
- The `version` field should be the latest version. MAKE SURE THE COMMIT SHASUM IS THIS VERSION'S
- Do not include the `verified` field. It is managed by the Nuit team.

3. Wait for a review

> [!NOTE]
> The review process may take a few hours to a few days depending on the complexity of the module and current maintainer availability
