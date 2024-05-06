import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/login";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";
import EditPost from "./pages/EditPost";
import ReadPost from "./pages/ReadPost";
import { useAuthContext } from "./hooks/useAuthContext";
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);
function App() {
  const user = useAuthContext();
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/create" element={user.user?<EditPost />:<Navigate to='/login'/>} />

          <Route path="/post/:id" element={<ReadPost />} />

          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
