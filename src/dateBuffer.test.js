import * as DateBuffer from "./dateBuffer"
import * as R from "ramda"
import dayjs from "dayjs"

test("generates a blank buffer", () => {
  const buffer = DateBuffer.blank(dayjs(), true)
  expect(buffer).toEqual({
    date: expect.any(dayjs),
    practices: R.map(R.always(true), R.range(0, 7)),
  })
})

test("updates a buffer to the current date", () => {
  const buffer = DateBuffer.blank(dayjs().subtract(1, "day"), false)
  const updatedBuffer = DateBuffer.update(buffer, true)
  expect(dayjs().diff(updatedBuffer.date, "day")).toEqual(1)

  expect(updatedBuffer.practices).toEqual([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
  ])
})

test("updates an obsolete buffer to the current date", () => {
  const buffer = DateBuffer.blank(dayjs().subtract(10, "day"), false)
  const updatedBuffer = DateBuffer.update(buffer, true)
  console.log(updatedBuffer)
  expect(dayjs().diff(updatedBuffer.date, "day")).toEqual(10)

  expect(updatedBuffer.practices).toEqual(R.map(R.always(true), R.range(0, 7)))
})
