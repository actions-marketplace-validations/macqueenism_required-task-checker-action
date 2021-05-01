# Task Completed Checker Action
A GitHub action that checks if tasks marked as required are completed on pull requests.

## Usage

### Create a workflow
```yml
name: 'PR Tasks Completed Check'
on:
  pull_request:
    types: [opened, edited]

jobs:
  task-check:
    runs-on: ubuntu-latest
    steps:
      - uses: macqueenism/required-task-checker-action@v0.2.1
        with:
          repo-token: "${{ secrets.GITHUB_TOKEN }}"
```

### Check whether required tasks are completed

In the description of a pull request:
```markdown
## Issue Type
The following tasks will be ignored
- [ ] Bug
- [ ] Document
- [ ] Enhancement

## Checklist
The following tasks will be required
<!-- required-tasks -->
- [x] I have read the [CONTRIBUTING.md]()
- [x] I have made corresponding changes to the documentation
- [x] My changes generate no lint errors
- [x] I have added tests that prove my fix is effective or that my feature works
- [x] New and existing unit tests pass locally with my changes
<!-- /required-tasks -->
```

## Licence
MIT
