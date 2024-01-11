import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import JoineeProvider from "./Components/JoineContext.tsx";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <JoineeProvider>
      <App />
    </JoineeProvider>
  </React.StrictMode>
);
