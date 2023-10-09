import { useState } from "react"
import * as DateBuffer from "./dateBuffer"
import dayjs from "dayjs"
import * as R from "ramda"

function List() {
  const buttonClasses =
    "inline-block rounded border border-primary-800 px-2 py-1 text-sm font-medium text-primary-800 transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:text-primary-500"

  const checkButtonClasses = (isChecked) =>
    `inline-block rounded-full border-2 mr-4 p-4 ${
      isChecked
        ? "bg-primary-600 border-primary-600 hover:bg-primary-500"
        : "bg-white border-grey-600 hover:bg-primary-200"
    } hover:text-white focus:outline-none focus:ring active:bg-primary-500`

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

  const handleKeyDown = (index) => (e) => {
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

  const togglePractice = (practice, practiceIndex, itemIndex) => {
    const newItems = [...items]
    newItems[itemIndex].trackRecord.practices[practiceIndex] = !practice
    saveItems(newItems)
  }

  return (
    <div>
      <div className="mb-4 mt-4">
        <button className={buttonClasses} onClick={addItem}>
          ADD PIECE
        </button>
      </div>
      {items.map((item, index) =>
        editingIndex === index ? (
          <div
            key={index}
            className="mb-2"
            tabIndex="1"
            onBlur={() => setEditingIndex(-1)}
          >
            <input
              placeholder="Tocatta"
              className="mt-1 px-2 w-[19vw] rounded-md border-solid border-2 border-gray-200 shadow-sm font-bold"
              defaultValue={item.name}
              onKeyDown={handleKeyDown(index)}
              onBlur={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
              autoFocus
            />
            <button
              className="inline-block rounded bg-error ml-2 px-2 py-1 text-sm font-medium text-white transition hover:-rotate-2 hover:scale-110 focus:outline-none focus:ring active:bg-error"
              onClick={() => deleteItem(index)}
            >
              DELETE
            </button>
          </div>
        ) : (
          <div key={index}>
            <div className="flex items-center mb-2">
              <span className="inline-block w-[20vw] font-bold">
                {item.name}
              </span>
              <button
                className={buttonClasses}
                onClick={() => setEditingIndex(index)}
              >
                EDIT
              </button>

              <div className="flex items-center ml-4">
                {item.trackRecord.practices.map((practice, practiceIndex) => (
                  <button
                    key={practiceIndex}
                    className={checkButtonClasses(practice)}
                    onClick={() =>
                      togglePractice(practice, practiceIndex, index)
                    }
                  >
                    <span className="sr-only">Check</span>
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
