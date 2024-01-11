import "./styles.css";
import AddJoinee from "./Components/AddJoinee.tsx";
import JoineeTable from "./Components/JoineeTable.tsx";

export default function App() {
  return (
    <div className="App">
      <div className="child">
        <AddJoinee />
      </div>
      <div className="child">
        <JoineeTable />
      </div>
    </div>
  );
}
