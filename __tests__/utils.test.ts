import {getRequiredTasks, createTaskListText} from '../src/utils'

describe('getRequiredTasks', () => {
  it('finds required tasks', () => {
    const text = `## Issue Type
      ## Required
      <!-- required-tasks -->
      - [ ] Bug
      - [ ] Document
      - [x] Enhancement Feature
      <!-- /required-tasks -->

      ## Checklist
      - [x] I have read the [CONTRIBUTING.md]()
      - [x] I have made corresponding changes to the documentation
      - [x] My changes generate no lint errors
      - [x] I have added tests that prove my fix is effective or that my feature works
      - [x] New and existing unit tests pass locally with my changes`

    const result = getRequiredTasks(text)

    expect(result).toEqual(`- [ ] Bug
- [ ] Document
- [x] Enhancement Feature

`)})

  it('finds multiple required tasks groups in one description', () => {
    const text = `## Issue Type
      ## Required
      <!-- required-tasks -->
      * [ ] Bug
      - [ ] Document
      - [x] Enhancement Feature
      <!-- /required-tasks -->

      ## Checklist
      - [x] I have read the [CONTRIBUTING.md]()
      - [x] I have made corresponding changes to the documentation
      - [x] My changes generate no lint errors
      - [x] I have added tests that prove my fix is effective or that my feature works
      - [x] New and existing unit tests pass locally with my changes


      <!-- required-tasks -->
      - [ ] Bug
      - [ ] Document
      * [x] Enhancement Feature
      <!-- /required-tasks -->`

    const result = getRequiredTasks(text)

    expect(result).toEqual(`* [ ] Bug
- [ ] Document
- [x] Enhancement Feature

- [ ] Bug
- [ ] Document
* [x] Enhancement Feature

`)
  })
})

describe('createTaskListText', () => {
  it('creates a list of completed tasks', () => {
    const text = `* [x] Bug
    - [x] Document
    - [x] Enhancement Feature`

    const result = createTaskListText(text)

    expect(result).toEqual(`## :white_check_mark: Completed Tasks
* [x] Bug
- [x] Document
- [x] Enhancement Feature
`)
  })

  it('creates a list of completed tasks and uncompleted tasks', () => {
    const text = `
    * [x] I have read the [CONTRIBUTING.md]()
    - [ ] I have made corresponding changes to the documentation
    - [x] My changes generate no lint errors
    * [ ] I have added tests that prove my fix is effective or that my feature works
    - [x] New and existing unit tests pass locally with my changes`

    const result = createTaskListText(text)

    expect(result).toEqual(`## :white_check_mark: Completed Tasks
* [x] I have read the [CONTRIBUTING.md]()
- [x] My changes generate no lint errors
- [x] New and existing unit tests pass locally with my changes
## :x: Uncompleted Tasks
- [ ] I have made corresponding changes to the documentation
* [ ] I have added tests that prove my fix is effective or that my feature works
`)
  })
})
