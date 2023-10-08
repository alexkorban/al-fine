import { useState } from "react"
import * as DateBuffer from "./dateBuffer"
import dayjs from "dayjs"
import * as R from "ramda"

function List() {
  const buttonClasses =
    "inline-block rounded border border-current px-2 py-1 text-sm font-medium text-indigo-600 transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:text-indigo-500"

  const checkButtonClasses = (isChecked) =>
    `inline-block rounded-full border border-indigo-600 mr-4 p-4 ${
      isChecked
        ? "bg-indigo-600 hover:bg-indigo-500"
        : "bg-white hover:bg-indigo-200"
    } hover:text-white focus:outline-none focus:ring active:bg-indigo-500`

  const now = dayjs()

  const savedItems = JSON.parse(localStorage.getItem("list")) || []

  const updatedItems = R.map(
    (item) => R.evolve({ practices: (p) => DateBuffer.update(p, false) }, item),
    savedItems
  )

  const [items, setItems] = useState(updatedItems)
  const [editingIndex, setEditingIndex] = useState(-1)

  const saveItems = (items) => {
    localStorage.setItem("list", JSON.stringify(items))
    setItems(items)
  }

  const addItem = () => {
    const newItems = [
      { name: "", trackRecord: DateBuffer.blank(now, false) },
      ...items,
    ]
    saveItems(newItems)
    setEditingIndex(0)
  }

  const deleteItem = (index) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    saveItems(newItems)
    setEditingIndex(-1)
  }

  const onKeyDown = (index) => (e) => {
    if (e.key === "Enter") {
      const newItems = [...items]
      newItems[index].name = e.target.value
      saveItems(newItems)
      setEditingIndex(-1)
    } else if (e.key === "Escape") {
      setEditingIndex(-1)
    } else {
      return true
    }
  }

  return (
    <div>
      <button className={buttonClasses} onClick={addItem}>
        Add piece
      </button>
      {items.map((item, index) =>
        editingIndex === index ? (
          <div key={index} tabIndex="1" onBlur={() => setEditingIndex(-1)}>
            <input
              placeholder="Tocatta"
              className="mt-1 p-2 w-[20vw] rounded-md border-solid border-2 border-gray-200 shadow-sm sm:text-sm"
              defaultValue={item.name}
              onKeyDown={onKeyDown(index)}
              onBlur={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
              autoFocus
            />
            <button
              className="inline-block rounded bg-red-600 ml-2 px-2 py-1 text-sm font-medium text-white transition hover:-rotate-2 hover:scale-110 focus:outline-none focus:ring active:bg-red-500"
              onClick={() => deleteItem(index)}
            >
              Delete
            </button>
          </div>
        ) : (
          <div key={index}>
            <div className="flex items-center">
              <span className="inline-block ml-2 p-2 w-[20vw]">
                {item.name}
              </span>
              <button
                className={buttonClasses}
                onClick={() => setEditingIndex(index)}
              >
                edit
              </button>

              <div className="ml-4">
                {item.trackRecord.practices.map((practice, practiceIndex) => (
                  <button
                    key={practiceIndex}
                    className={checkButtonClasses(practice)}
                  >
                    <span class="sr-only">Check</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default List
