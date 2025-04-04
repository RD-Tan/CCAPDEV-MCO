import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Slide, ToastContainer } from "react-toastify";
// Components
import Header from "@components/header";

// Pages
import AuthLayout from "@pages/authlayout";
import CreatePost from "@pages/createpost";
import Login from "@pages/login";
import Main from "@pages/main";
import PostWindow from "@pages/postwindow";
import SearchPage from "@pages/searchpage";
import SignUp from "@pages/signup";

// Profile Pages
import Profile from "@pages/profile";
import RandoUser from "./pages/randouser";
import FourOFourPage from "./pages/error";
import ContextProviders from "./components/contextprovider";

function App() {
  return (
    <ContextProviders>
      <Router>
        <Header />
        <ToastContainer
          autoClose={3000}
          transition={Slide}
          theme={localStorage.getItem("theme") ?? "light"} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="user" element={<RandoUser />} />
          <Route path="user/:username/*" element={<Profile />} />
          <Route path="search" element={<SearchPage />} />

          <Route path="auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>

          <Route path="/post/:publicId" element={<PostWindow isEditable={true} />} />

          <Route path="/holler/:publicId?" element={<CreatePost />} />
          <Route path="*" element={<FourOFourPage />} />
        </Routes>
      </Router>
    </ContextProviders>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
