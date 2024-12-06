import { TodoAction, TodoProps } from "types/schema"
import { orderByDateStatus } from "./todo.services"

export const loadTodos = (todos: TodoProps[], action: TodoAction): TodoProps[] => {
  if (action.event !== "LOAD_TODOS") {
    return todos
  }
  return orderByDateStatus(action.payload)
}

export const toggleTodo = (todos: TodoProps[], action: TodoAction): TodoProps[] => {
  if(action.event !== "TOGGLE_TODO") {
    return todos
  }
  const updatedTodos = todos.map((todo) => (todo.id === action.payload.id ? {...todo, isComplete: !todo.isComplete} : todo))
  return orderByDateStatus(updatedTodos)
}

export const addTodo = (todos: TodoProps[], action: TodoAction): TodoProps[] => {
  if(action.event !== "ADD_TODO") {
    return todos
  }
  const newTodos = [...todos, action.payload]
  return orderByDateStatus(newTodos)
}


export const todoReducers: Record<string, (todos: TodoProps[], action: TodoAction) => TodoProps[]> = {
  LOAD_TODOS: loadTodos,
  TOGGLE_TODO: toggleTodo,
  ADD_TODO: addTodo
}

export default todoReducers