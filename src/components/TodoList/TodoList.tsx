import { useTodos } from "providers/TodoContext"
import { TodoProps } from "types/schema"
import Todo from "components/Todo/Todo"

import styles from "./TodoList.module.css"

const TodoList = () => {
  const { todos } = useTodos()

  return (
    <div className={styles.todoList}>

      {todos && todos.map((todo: TodoProps) => (
        <Todo 
          key={todo.id.toString()}
          {...todo}
        />
      ))}
    </div>
  )
}

export default TodoList