import { useEffect, useState } from "react"
import TodoList from "components/TodoList/TodoList"
import Loader from "components/Loader/Loader"

import { getData } from "utils/api"
import { useDispatchers } from "core/todo.dispatches"
import { useTodos } from "providers/TodoContext"

import styles from './Todos.module.css'
import ConfettiExplosion from "react-confetti-explosion"

const Todos = () => {
  const { todos } = useTodos(),
        { loadTodos } = useDispatchers(),
        [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getData(loadTodos, () => {
      setLoading(false)
    })
  }, [])

  const todoTodos = todos.filter((todo) => !todo.isComplete)

  return (
    <section className={styles.todos}>
      <h1>Your Todo List</h1>


      {loading ? (
        <>
          <p>We're gathering your todos.</p>
          <Loader />
        </>
      ) : (
        <>
          {todoTodos.length > 0 ? (
            <p><em>{`You have ${todoTodos.length} todo${todoTodos.length > 1 ? 's' : ''} left to complete.`}</em></p>
          ) : (
            <>
              <p><em><strong>Congrats!</strong> You have completed all your todos!</em></p>
              <div className="flex justify-center"><ConfettiExplosion /></div>
            </>
          )}
          <TodoList />
        </>
      )}
    </section>
  )
}

export default Todos