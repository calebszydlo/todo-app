import { createContext, useContext, Dispatch, PropsWithChildren, useReducer } from "react"
import { TodoAction, TodoProps } from "types/schema"
import todoReducers from "core/todo.reducers"


const TodoContext = createContext<{ todos: TodoProps[] } | null>(null),
      TodoDispatchContext = createContext<Dispatch<TodoAction> | null>(null),
      defaultTodos = [] as TodoProps[]


const TodoReducer = (todos: TodoProps[], action: TodoAction) => {
  const reducer = todoReducers[action.event]

  if(!reducer) {
    throw Error (`Unknown event: ${action.event}`);
  }
  return reducer(todos, action)
}

export const TodoProvider = ({ children }: PropsWithChildren ) => {
  const [todos, dispatch] = useReducer(TodoReducer, defaultTodos)

  return (
    <TodoContext.Provider value={{ todos }}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoContext.Provider>
  )
}

export const useTodos = () => {
  const Todos = useContext(TodoContext)
  if(!Todos) {
    throw Error (`useTodos may only be used within TodoProvider.`)
  }
  return Todos;
}

export const useTodosDispatch = () => {
  const dispatch = useContext(TodoDispatchContext)
  if(!dispatch) {
    throw Error (`useTodosDispatch may only be used within TodoProvider.`)
  }
  return dispatch
}

export default TodoProvider