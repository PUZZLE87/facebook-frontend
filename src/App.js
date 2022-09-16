import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import PersistLogin from "./components/auth/PersistLogin";
import Home from "./pages/home";
import NotAuth from "./components/auth/NotAuth";

function App() {
  return (
    <Routes>
      <Route element={<NotAuth />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<PersistLogin />}>
        <Route path="/activate/:token" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
