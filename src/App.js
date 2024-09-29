import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./style/style.scss";
import Header from "./components/Header/Header";
import MainPage from "./views/MainPage";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="" element={<MainPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
