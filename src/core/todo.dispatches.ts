import { TodoProps } from "types/schema"
import { useTodosDispatch } from "providers/TodoContext"

export const useDispatchers = () => {
  const dispatch = useTodosDispatch()

  const loadTodos = (props: TodoProps[]) => {
    dispatch({
      event: 'LOAD_TODOS',
      payload: props
    })
  }

  const toggleTodos = (props: { id: number }) => {
    dispatch({
      event: 'TOGGLE_TODO',
      payload: props
    })
  }

  const addTodos = (props: TodoProps) => {
    dispatch({
      event: 'ADD_TODO',
      payload: props
    })
  }

  return {
    loadTodos,
    toggleTodos,
    addTodos
  }
}
