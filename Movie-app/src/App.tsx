import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper d-flex flex-column min-vh-100">

        <Navbar />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movie/:id" element={<Details />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;