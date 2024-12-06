// Todo Types

export type TodoProps = {
  id: number | string
  isComplete: boolean
  description: string
  dueDate?: Date | string | null
}

export type TodoAction = 
  | { event: "LOAD_TODOS"; payload: TodoProps[] }
  | { event: "TOGGLE_TODO"; payload: { id: Number | string } }
  | { event: "ADD_TODO"; payload: TodoProps }

// Notification Types
// Not currently implemented but could be later

export enum Status {
  Pending = 1,
  Success = 2,
  Error = 3
}

export type NotificationProps = {
  status: Status
  title: string
  description?: string
}