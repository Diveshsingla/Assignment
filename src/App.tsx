import "./styles.css";
import AddJoinees from "./Components/AddJoinees.tsx";
import JoineTable from "./Components/JoineTable.tsx";

export default function App() {
  return (
    <div className="App">
      <div className="child">
        <AddJoinees />
      </div>
      <div className="child">
        <JoineTable />
      </div>
    </div>
  );
}
