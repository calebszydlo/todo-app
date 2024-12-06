import { TodoProps } from "../types/schema"


// Format a string or date to MM/DD/YYYY
export const formatDate = (isoString: Date | string) => {
	const date = isoString instanceof Date ? isoString : new Date(isoString)
	if(isNaN(date.getTime())) {
		return null
	}
	// Central Time Zone
	const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
	return `${(utcDate.getMonth() + 1).toString().padStart(2, "0")}/${utcDate.getDate().toString().padStart(2, "0")}/${utcDate.getFullYear()}`
}

// Checks to see if a date is in the past
export const isDateOverdue = (date: Date | string): boolean => {
	return (date instanceof Date ? date : new Date(date)) <= new Date()
};

/****/
// Handling Data as it comes from the API
/****/

// This function will split an array of objects into 2 arrays by a specified key, in this case 'isComplete'
export const dataByStatus = (data: TodoProps[]) => {
	return data.reduce<{
		done: TodoProps[]
		undone: TodoProps[]
	}>(
		(acc, item) => {
			acc[item.isComplete ? "done" : "undone"].push(item)
			return acc
		},
		{ done: [], undone: [] }
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
