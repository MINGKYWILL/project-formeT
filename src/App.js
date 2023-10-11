import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Pick from "./routes/Pick";
import Search from "./routes/Search";
import "./App.css";

export default function App({ mediaType }) {
  return (
    <Router>
      <Routes>
        <Route
          path="/:mediaType/:mediaId"
          element={<Detail mediaType={mediaType} />}
        ></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/pick" element={<Pick />}></Route>
        <Route path="/search" element={<Search />}></Route>
      </Routes>
    </Router>
  );
}
