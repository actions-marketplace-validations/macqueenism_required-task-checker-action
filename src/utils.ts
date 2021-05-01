export function getRequiredTasks(text: string): string {
  const matches = text.match(
    /<!-- required-tasks -->[\s| ]*([-|*] \[[x| ]\] .+[\s| ]*)+<!-- \/required-tasks -->/g
  )
  if (!matches?.length) {
    return ''
  }

  let tasks = ''

  for (const match of matches) {
    match
      .replace('<!-- required-tasks -->\n', '')
      .replace('<!-- /required-tasks -->\n', '')
      .replace('<!-- /required-tasks -->', '')
      .split('\n')
      .map(line => {
        tasks += line.trim()
        tasks += '\n'
      })
  }
  return tasks
}

export function createTaskListText(body: string): string {
  const completedTasks = body.match(/([-|*] \[[x]\].+)/g)
  const uncompletedTasks = body.match(/([-|*] \[[ ]\].+)/g)

  let text = ''

  if (completedTasks !== null) {
    for (let index = 0; index < completedTasks.length; index++) {
      if (index === 0) {
        text += '## :white_check_mark: Completed Tasks\n'
      }
      text += `${completedTasks[index]}\n`
    }
  }

  if (uncompletedTasks !== null) {
    for (let index = 0; index < uncompletedTasks.length; index++) {
      if (index === 0) {
        text += '## :x: Uncompleted Tasks\n'
      }
      text += `${uncompletedTasks[index]}\n`
    }
  }

  return text
}
