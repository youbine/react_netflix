import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import Header from "./Components/Header";
import Series from "./Routes/Series";
import Search from "./Routes/Search";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/series" element={<Series />}>
          <Route path="?id=:seriesId" element={<Series />} />
        </Route>
        <Route path="/search" element={<Search />}>
          <Route path="?keyword=:keyword" element={<Search />}>
            <Route path="&type=:type&id=:searchId" element={<Search />} />
          </Route>
        </Route>
        <Route path="/*" element={<Home />}>
          <Route path="?id=:movieId" element={<Home />} />
          <Route path="?id=:seriesId" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
