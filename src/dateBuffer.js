// circular buffer that stores values associated with a date for a given number of days
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import * as R from "ramda"

dayjs.extend(utc)

const bufferSize = 7

function blank(date, blankValue) {
  return {
    date,
    practices: [true, false, true, false, false, false, true], //R.map(R.always(blankValue), R.range(0, 7)),
  }
}

function update(buffer, blankValue) {
  const diff = dayjs().diff(buffer.date, "day")

  return R.evolve(
    {
      practices: (practices) =>
        R.concat(
          R.map(R.always(blankValue), R.range(0, R.min(bufferSize, diff))),
          R.slice(0, R.max(0, bufferSize - diff), practices)
        ),
    },
    buffer
  )
}

export { blank, update }
