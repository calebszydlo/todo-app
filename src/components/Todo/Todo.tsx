import { useState } from "react"
import { TodoProps } from "../../types/schema"
import { formatDate, isDateOverdue } from "../../utils/helpers"
import Chip from "components/Chip/Chip"
import { MiniLoader } from "components/Loader/Loader"
import { useTodos } from "providers/TodoContext"
import { useDispatchers } from "core/todo.dispatches"
import styles from "./Todo.module.css"
import { patchData } from "utils/api"

const Todo = (todo: TodoProps) => {

  const { todos } = useTodos(),
        { toggleTodos } = useDispatchers(),
        [isLocked, setIsLocked] = useState(false),
        isOverdue = todo.dueDate ? isDateOverdue(todo.dueDate) : false

  const handleChange = (id: number | string) => {
    setIsLocked(true)
    const todo = todos.find((todo) => todo.id === id)
    if (!todo) return
    patchData(todo, toggleTodos, () => {
      setIsLocked(false)
    })
  }

  return (
    <div className={`${styles.todo} ${isLocked && 'opacity-50 pointer-events-none'}`}>
      {isLocked && <MiniLoader />}

      <input 
        className={styles.todo__input}
        name={`todo${todo.id}`} 
        id={`todo${todo.id}`} 
        type="checkbox" 
        checked={todo.isComplete}
        onChange={() => handleChange(todo.id)} 
        readOnly={isLocked}
      />
      <label 
        htmlFor={`todo${todo.id}`} 
        className={styles.todo__label} 
        data-status={todo.isComplete ? 'complete' : isOverdue ? 'overdue' : 'todo'}
      >
        <span>
          {todo.description}
        </span>

        {todo.dueDate && (
          <Chip>
            {formatDate(todo.dueDate)}
          </Chip>
        )}
      </label>
    </div>
  )
}

export default Todo
