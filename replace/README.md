# replace

Performs a search and replace operation using JS regex expressions (or plain text)
in files matching a certain glob pattern within current git working copy and returns
number of changed files.

- Use https://regex101.com/ to test your regex expressions (ensure to select JS mode).
- Use https://globster.xyz/ to test your glob patterns.

# Inputs

- `work-dir`: Optional location from where to perform operation. Defaults to workspace.
- `glob`: Optional glob pattern to determine which files to perform the search and replace against (defaults to all files).
- `search`: Regex expression to search for (or set `regex` to "false" to search for plain text instead).
- `replace`: Text to replace with. Use `$1` and so on to reintroduce capture groups.
- `regex`: Whether to enable regex ("true", the default) or not ("false").

# Outputs

- `changes`: List of changed files paths relative to current working directory.

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
        uses: silphid/actions/replace@v1
        with:
          glob: "**/*.yaml"
          search: "Hello (\w+)!"
          replace: "Bonjour $1!"
```
