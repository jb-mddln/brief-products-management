import "./assets/App.css";
import Navbar from "./components/Navbar";
import PageContent from "./components/PageContent";
import ProductDetail from "./components/ProductDetail";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PageContent />} />
        <Route path="/list/:type" element={<PageContent />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}


export default App;
