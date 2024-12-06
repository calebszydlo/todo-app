import { TodoProps } from "types/schema"

const API_URL = process.env.REACT_APP_API_ENDPOINT,
      API_KEY = process.env.REACT_APP_API_KEY || ''

// Make API request funciton
const makeRequest = async (url: string, options: RequestInit) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      "X-Api-Key": API_KEY,
      ...options.headers,
    },
  })
  return response
}


// Get Data API function
// This function performs a GET request to a specific endpoint and optionally executes a callback functions for success and completion scenarios.
export const getData = async (
  onSuccess?: Function,
  onFinish?: Function
) => {
  // Define the API endpoint URL
  const url = `${API_URL}/get`

  try {
    // Make the API Request
    const response = await makeRequest(url, {
      method: "GET"
    })

    // Check if resopnse is not OK (status code outside of 200-299)
    if(!response.ok) {
      throw new Error(`Response status: ${response.status}`) // Return error code
    }
    
    const result = await response.json()
    onSuccess?.(result)
    return result
  } catch (error: any) {
    // Log any errors encountered
    console.error('fetch error:', error.message)
    return false
  } finally {
    // Execute the onFinish callback if provided
    onFinish?.()
  }
}

// Patch Data API function
// This function performs a PATCH request to the above endpoint with a specific todo ID and optionally executes a callback functions for success and completion scenarios. Requires an ID of the task to update
export const patchData = async (
  todo: TodoProps,
  onSuccess?: Function,
  onFinish?: Function
) => {
  const url = `${API_URL}/patch/${todo.id}`

  try {
    // Make the API Request
    const response = await makeRequest(url, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ iscomplete: todo.isComplete })
    })

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
    

    const result = await response.json()
    
    if(result.status === 'success') {
      // if present, execute the success function
      onSuccess?.(todo)
      return result
    } else {
      throw new Error(`Result: ${result}`) // If failed, throw new error
    }
  } catch (error: any) {
    console.error('patch error:', error.message)
    return error
  } finally {
    onFinish?.()
  }
}