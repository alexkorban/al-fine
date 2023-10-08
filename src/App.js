import logo from "./logo192.jpg"
import "./App.css"
import List from "./List"  

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="w-20" alt="logo" />
        <p className="text-md font-bold underline">Al fine</p>
      </header>
      <main>
        <List />
      </main>
    </div>
  );
}

export default App;
