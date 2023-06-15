# test-chart

Performs chart tests using https://github.com/silphid/testchart, if any present in `tests` sub-dir of chart.

# Inputs

- `work-dir`: Location where to perform operation. Defaults to workspace.
- `namespace`: Optional name of namespace to use for rendering chart (default "my-namespace")
- `release`: Optional name of release to use for rendering chart (default "my-release")
- `path`: Optional path to tests directory relative to chart's root directory (default "tests").
- `ignore`: Optional regex specifying lines to ignore. Multiple ignore patterns can be passed as a multi-line value, with one pattern per line.

# Example

```yaml
on:
  push:

jobs:
  build:
    name: Build chart
    runs-on: ubuntu-latest

      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Test chart
        uses: silphid/actions/test-chart@v1

      # Build chart...
```
