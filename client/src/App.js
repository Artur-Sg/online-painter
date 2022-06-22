import "./styles/app.scss";
import MainLayout from "./components/MainLayout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const getId = () => {
    return (+new Date()).toString(16);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/:id" element={<MainLayout />}></Route>
          <Route path="*" element={<Navigate to={getId()} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
