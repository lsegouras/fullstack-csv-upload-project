import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
// import FileViewer from "./pages/File_viewer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/view/:id" element={<FileViewer />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
