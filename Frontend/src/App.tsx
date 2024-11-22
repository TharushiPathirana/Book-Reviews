import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookView from "./pages/BookView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/view" element={<BookView />} />
      </Routes>
    </Router>
  );
}

export default App;
