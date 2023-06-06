# replace-in-repo

Performs a search and replace operation using JS regex expressions (or plain text)
in files matching a certain glob pattern within current git working copy and commits and pushes changes, if any.

- Use https://regex101.com/ to test your regex expressions (ensure to select JS mode).
- Use https://globster.xyz/ to test your glob patterns.

# Inputs

- `glob`: Optional glob pattern to determine which files to perform the search and replace against (defaults to all files).
- `search`: Regex expression to search for (or set `regex` to "false" to search for plain text instead).
- `replace`: Text to replace with. Use `$1` and so on to reintroduce capture groups.
- `regex`: Whether to enable regex ("true", the default) or not ("false").
- `reset`: Whether to reset all uncommitted local changes before replacement ('true') or not ('false', the default).
- `message`: Commit message.

# Outputs

- `changes`: Number of files changed (as opposed to number of actual string replacements).

# Example

```yaml
jobs:
  job:
    name: Build image
    runs-on: ubuntu-latest
    steps:

      - name: Check out
        uses: actions/checkout@v3

      - name: Translate greeting
        uses: silphid/actions/replace-in-repo@v1
        with:
          glob: "**/*.yaml"
          search: "Hello (\w+)!"
          replace: "Bonjour $1!"
          message: "Translated greetings in all yaml files"
```
