import { formatDate, isDateOverdue,  } from "../helpers"

describe("formatDate", () => {
  it("formats a Date object correctly", () => {
    const date = new Date("2023-10-26") // Oct 26, 2023
    expect(formatDate(date)).toBe("10/26/2023")
  })
  
  it("formats an ISO string correctly", () => {
    const dateString = "2024-05-20T00:00:00.000Z" // May 20, 2024
    expect(formatDate(dateString)).toBe("05/20/2024")
  })

  it("handles the first day of the year correctly", () => {
    const firstDay = new Date(2025, 0, 1) // Jan 1, 2025
    expect(formatDate(firstDay)).toBe("01/01/2025")
  })

  it("handles an invalid string correctly", () => {
    const invalidString = "invalid-date"
    expect(formatDate(invalidString)).toBe(null)
  })
})

describe("isDateOverdue", () => {
  test("should return true for past dates", () => {
    const pastDate = new Date("1995-08-11")
    expect(isDateOverdue(pastDate)).toBe(true)
  })

  test("should return true for past date strings", () => {
    const pastString = "1885-02-07"
    expect(isDateOverdue(pastString)).toBe(true)
  })

  test("should return true for future date", () => {
    const futureDate = new Date(2025, 2, 27)
    expect(isDateOverdue(futureDate)).toBe(false)
  })

  test("should handle invalid date strings", () => {
    const invalidDate = "invalid-date"
    expect(isDateOverdue(invalidDate)).toBe(false)
  })
})