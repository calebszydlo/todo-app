import TodoProvider from "providers/TodoContext"
import Header from "./components/Header/Header"
import Todos from "components/Todos/Todos"

function App() {

  return (
    <div className="App">

      <Header />

      <TodoProvider>
        <main className="py-8">

          <Todos />

        </main>
      </TodoProvider>
      
    </div>
  )
}

export default App
