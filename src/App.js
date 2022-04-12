import logo from "./logo.svg";
import "./App.css";
import Button from "@material-ui/core/Button";
import { useEffect, useState } from "react";
import TableView from "./pages/TableView";

function App() {
  const [counter, setCounter] = useState(0);
  const handleIncrement = () => {
    setCounter((counter) => counter + 1);
  };
  useEffect(() => {
    const interval = window.setInterval(handleIncrement, 5000);

    return () => window.clearInterval(interval);
  }, [counter]);
  return (
    <div className="App">
      <TableView />
    </div>
  );
}

export default App;
