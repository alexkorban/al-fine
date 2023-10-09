import logo from "./treble-clef.svg"
import "./App.css"
import List from "./List"

function App() {
  return (
    <div className="App">
      <header className="App-header mb-2">
        <p className="text-xl font-bold text-primary-600">
          <img src={logo} className="w-10 mr-2 inline" alt="logo" />
          AL FINE
        </p>
      </header>
      <main>
        <List />
      </main>
    </div>
  )
}

export default App
