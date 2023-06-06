# tag-commit

Adds given tag to git commit and pushes tag to remote.

# Inputs

- `commit`: Optional commit to be tagged, defaulting to value of `GITHUB_SHA`. Can be specified using any of the formats supported by `git tag`, such as:
  - Commit SHA (eg: `c4fe2b8f6a78d9f4d9f8184a20b68f8d6677d053`)
  - Short commit SHA (eg: `c4fe2b8`)
  - Branch reference (eg: `master`)
  - Tag reference (eg: `v0.0.1`)
  - etc.
- `tag`: Value of tag to add to given commit.

# Example

```yaml
jobs:
  job:
    name: Build image
    runs-on: ubuntu-latest
    steps:
      - name: Check out
        uses: actions/checkout@v3

      - name: Get build info
        id: info
        uses: nestoca/actions/get-build-info@v1

      # Build

      - name: Tag commit
        uses: silphid/actions/tag-commit@v1
        with:
          tag: ${{ steps.info.outputs.git-tag }}
```
