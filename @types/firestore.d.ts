declare interface Child {
  todo: string
}

declare type Task = {
  category: string
  person: string
  title: string
  detail: string
  child_task: Child
}