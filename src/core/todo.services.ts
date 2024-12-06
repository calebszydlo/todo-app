import { TodoProps } from "types/schema"

// Split todos by isComplete true/false
export const todosByStatus = (todos: TodoProps[]) => {
	return todos.reduce(
		(acc, item) => {
			acc[item.isComplete ? "done" : "undone"].push(item)
			return acc
		},
		{ done: [] as TodoProps[], undone: [] as TodoProps[] }
	)
}

// Order by date, if no date goes to the end
export const orderByDate = (data: TodoProps[]) => {
	return data.sort((a, b) => {
		if (!a.dueDate && !b.dueDate) return 0
		if (!a.dueDate) return 1
		if (!b.dueDate) return -1
		return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
	})
}

// Order by date AND status
export const orderByDateStatus = (todos: TodoProps[]): TodoProps[] => {
  const sortedTodos = orderByDate(todos),
        splitTodos = todosByStatus(sortedTodos)

  return splitTodos ? [...splitTodos.undone, ...splitTodos.done] : []
}