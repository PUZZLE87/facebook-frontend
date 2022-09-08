import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import PersistLogin from "./components/auth/PersistLogin";
import Home from "./pages/home";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PersistLogin />} >
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
