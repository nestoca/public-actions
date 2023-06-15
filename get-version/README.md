# get-version

Determines metadata for a given build (version, git tag, docker tag).
Uses https://github.com/codacy/git-version/tree/2.7.1 under the hood.

# Inputs

- `git-tag-prefix`: Optional prefix for git tags used to version project. In a typical project, that would be simply "v" (the default), eg: "v0.0.1". In a monorepo, that should include the path to sub-project, eg: "path/to/my-project/v".

# Outputs

- `version`: Version being built in semver format (eg: "0.0.1").
- `git-tag`: Git tag to mark current build in git (eg: "v0.0.1" or "path/to/my-project/v0.0.1").
- `docker-tag`: Tag for docker image being built (eg: "0.0.1").

# Example

```yaml
jobs:
  job:
    name: Build
    runs-on: ubuntu-latest

    steps:
      - name: Check out
        uses: actions/checkout@v3

      - name: Get version
        id: version
        uses: silphid/actions/get-version@v1

      - name: Build something with that info
        run: |-
          echo Version: ${{ steps.version.outputs.version }}
          echo Git tag: ${{ steps.version.outputs.git-tag }}
          echo Docker tag: ${{ steps.version.outputs.docker-tag }}
```
