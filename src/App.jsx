import Login from "./pages/login";
import Home from "./pages/home";
import { Routes, Route } from "react-router-dom";
import PersistLogin from "./components/auth/PersistLogin";
import NotAuth from "./components/auth/NotAuth";
import Reset from "./pages/reset";

function App() {
  return (
    <Routes>
      <Route element={<NotAuth />}>
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<Reset />} />
      </Route>
      <Route element={<PersistLogin />}>
        <Route path="/activate/:token" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
