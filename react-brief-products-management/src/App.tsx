import "./assets/App.css";
import Navbar from "./components/Navbar";
import PageContent from "./components/PageContent";
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
      </Routes>
    </Router>
  );
}


export default App;
